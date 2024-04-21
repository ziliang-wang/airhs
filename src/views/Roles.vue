<template>
  <div>
    <span>角色管理</span>
  </div>
</template>

<script>
export default {
  name: 'Roles',
  data () {
    return {
      // show: true
    }
  },
  mounted () {
    // if (this.$route.fullPath !== '/user-manager/') this.show = false
  },
  watch: {
    $route () {
      // if (this.$route.fullPath !== '/user-manager/') this.show = false
    }
  }
}
</script>
