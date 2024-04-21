<template>
  <div id="nav">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/style/reset.css';
// @import './assets/style/index.css';

body {
  font-family: '微軟雅黑', sans-serif;
}
</style>
