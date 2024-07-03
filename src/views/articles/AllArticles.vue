<script lang="ts" setup>
import {ref, onMounted} from "vue";
import type {Article, ArticleSearchParams} from "@/types";
import {ElMessageBox} from 'element-plus'
import {getArticles, getTags} from '@/api'
import {c} from "vite/dist/node/types.d-aGj9QkWt";


interface PageDataInfo {
  currentPage: number,
  pageSize: number,
  total: number,
  tableData: Article[]
}

let info = ref<PageDataInfo>({
  currentPage: 1,
  pageSize: 10,
  total: 10,
  tableData: []
})

let tableData = ref<Article[]>([])
const fetchArticles = async (page: number, pageSize: number) => {
  const params: ArticleSearchParams = {
    'offset': page,
    'limit': pageSize
  };
  if (filters.value.name != '') {
    params['author'] = filters.value.name
  }
  if (selectValue.value != undefined) {
    params['tag'] = selectValue.value
  }
  try {
    const res = await getArticles(params)
    info.value.tableData = res.data.articles
    info.value.total = res.data.articlesCount
    selectValue.value = ''
    filters.value.name = ''
  } catch (error) {
    await ElMessageBox.alert(error.message)
  }
}

const handleSizeChange = (val: number) => {
  info.value.pageSize = val
  fetchArticles((info.value.currentPage - 1) * val, val)
}

const handleCurrentChange = (val: number) => {
  info.value.currentPage = val
  fetchArticles(info.value.pageSize * (val - 1), info.value.pageSize)
}

const filters = ref({
  name: ''
})
const selectValue = ref<string | undefined>()
const tags = ref<string[]>([])
const doSearch = async () => {
  info.value.pageSize = 10
  info.value.currentPage = 1
  await fetchArticles(info.value.pageSize * (info.value.currentPage - 1), info.value.pageSize)
}

onMounted(async () => {
  try {
    const res = await getTags()
    tags.value = res.data.tags
  } catch (error) {

  }
})

// setup执行时机在所有的生命周期函数之前
fetchArticles(0, info.value.pageSize)


</script>
<template>
  <div class="toolBar">
    <el-form :inline="true" :model="filters">
      <el-form-item>
        <el-input v-model="filters.name" placeholder="请输入作者名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select placeholder="请选择标签" style="width: 240px;" v-model="selectValue">
          <el-option v-for="(option,index) in tags" :key="index" :label="option" :value="option"></el-option>
        </el-select>
      </el-form-item>
      <el-button icon="search" type="primary" @click="doSearch">搜索</el-button>
    </el-form>
  </div>
  <div class="mainContainer">
    <el-table :data="info.tableData" style="width: 100%;" border>
      <el-table-column prop="slug" label="ID" width="240" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="title" label="标题" width="240" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createdAt" label="发布时间" width="240" :show-overflow-tooltip="true">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="author.username" label="作者" width="140" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="tagList" label="标签" width="340" align="center">
        <template #default="scope">
          <el-tag class="a_tag" v-for="tag in scope.row.tagList" :key="tag.ID">
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="pagination"
        v-model:current-page="info.currentPage" :page-size="info.pageSize" :page-sizes="[5,10,15,20,25]"
        layout="total, sizes, prev, pager, next, jumper" :total="info.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>
<style lang="css" scoped>
.pagination {
  margin-left: 30%;
  margin-top: 40px;
}
</style>
