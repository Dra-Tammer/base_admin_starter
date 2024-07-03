<script lang="ts" setup>
import {ref} from "vue";
import type {Article, ArticleSearchParams} from "@/types";
import {ElMessageBox} from 'element-plus'
import {getArticles} from '@/api'

let tableData = ref<Article[]>([])
const fetchArticles = async () => {
  const params: ArticleSearchParams = {
    'offset': 0,
    'limit': 10
  };
  try {
    const res = await getArticles(params)
    tableData.value = res.data.articles
  } catch (error) {
    await ElMessageBox.alert(error.message)
  }
}
// setup执行时机在所有的生命周期函数之前
fetchArticles()
</script>
<template>
  <div class="mainContainer">
    <el-table :data="tableData" style="width: 100%;" border>
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
            {{tag}}
          </el-tag>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<style lang="css" scoped>

</style>
