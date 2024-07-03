<script lang="ts" setup="">
import PageSideBar from "@/layout/components/PageSideBar.vue";
import PageHeader from "@/layout/components/PageHeader.vue";

</script>
<template>
  <div class="container">
    <header><PageHeader></PageHeader></header>
    <main>
      <div class="left">
        <PageSideBar></PageSideBar>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
<style lang='scss' scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  > header {
    height: 54px;
    background: #000;
    color: #fff;
  }

  > main {
    display: flex;
    flex: 1;
    overflow: auto;

    > .left {
      height: 100%;
      background-color: #000;
      color: #fff;
      width: 200px;
    }

    > .right {
      flex: 1;
      overflow: hidden;
      background-color: #f5f7f9;

      > .main-body {
        padding: 16px 16px 30px;
        overflow: auto;
        height: 100%;
        box-sizing: border-box;
      }
    }

  }
}
</style>
