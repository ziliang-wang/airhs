<template>
  <div>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right"> -->
    <el-breadcrumb separator=">">
      <!-- <el-breadcrumb-item :to="{ name: 'home' }" v-for="item in breadList" :key="item.path">首頁</el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
        <router-link :to="{ name: 'welcome' }" v-if="index === 0">{{ item.meta.title }}</router-link>
        <span v-else>{{ item.meta.title }}</span>
        <!-- {{ item.meta.title }} -->
      </el-breadcrumb-item>
      <!-- <el-breadcrumb-item>系統管理</el-breadcrumb-item> -->
      <!-- <el-breadcrumb-item :to="{ name: 'test' }">用戶管理</el-breadcrumb-item> -->
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  computed: {
    breadList () {
      return this.$route.matched // [{}, {}, {}]
    }
  },
  mounted () {
    // console.log(this.$route)
  },
  watch: {
    $route () {
      // console.log(this.$route)
    }
  }
}
</script>

<style scoped>

</style>
