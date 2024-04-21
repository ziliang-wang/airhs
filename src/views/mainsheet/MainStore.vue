<template>
  <div>
    <span>主號庫存</span>
  </div>
</template>

<script>
export default {
  name: 'MainStore',
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
