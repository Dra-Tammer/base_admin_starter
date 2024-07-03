<script setup lang="ts">

</script>

<template>
  <router-view></router-view>
</template>

<!--对app的样式配置不用scoped，要不然无法生效，无法透传到子组件-->
<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  overflow: hidden;
}

</style>
