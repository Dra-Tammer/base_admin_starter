<script lang="ts" setup>
import {ref} from "vue";
import type {Article, ArticleSearchParams} from "@/types";
import {ElMessageBox} from 'element-plus'
import {getArticles} from '@/api'


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
  try {
    const res = await getArticles(params)
    info.value.tableData = res.data.articles
    info.value.total = res.data.articlesCount
  } catch (error) {
    await ElMessageBox.alert(error.message)
  }
}
// setup执行时机在所有的生命周期函数之前
fetchArticles(0, info.value.pageSize)

const handleSizeChange = (val: number) => {
  info.value.pageSize = val
  fetchArticles((info.value.currentPage - 1) * val, val)
}

const handleCurrentChange = (val: number) => {
  info.value.currentPage = val
  fetchArticles(info.value.pageSize * (val - 1), info.value.pageSize)
}

</script>
<template>
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
