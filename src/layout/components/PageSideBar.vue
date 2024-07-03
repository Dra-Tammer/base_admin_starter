<script lang="ts" setup="">
import {useRouter, useRoute} from "vue-router";
import {computed, ref} from "vue";

const router = useRouter()
const route = useRoute()

// 做一层过滤，子页面都包含meta
const treeData = router.getRoutes().filter((v) => v.meta && v.meta.requiresAuth);
// 活跃的路由，route拿到的是当前的路由，computed传一个计算属性，默认的第一个标签页或者当前的页面
// 防止ts报错，treeData.value[0].path改成treeData.length > 0 ? treeData[0].path : ''
const defaultActive = computed(() => route.path || (treeData.length > 0 ? treeData[0].path : ''))

const isCollapse = ref(false)

</script>
<template>
  <div>
    <el-menu :default-active="defaultActive" router :collapse="isCollapse">
      <template v-for="(item,index) in treeData" :key="item.path">
        <!--        item 有子目录且不少于一个，渲染-->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
          <template #title>
            <el-icon v-if="item.meta.icon">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="(children, index) in item.children" :key="index">
            <el-menu-item :index="children.path">
              <el-icon>
                <!--                解决ts的报错，加上一个非空断言-->
                <component :is="children!.meta!.icon"></component>
              </el-icon>
              <span>{{ children.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>
<style lang="css" scoped>

</style>
