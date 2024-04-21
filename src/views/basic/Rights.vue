<template>
  <div>
    <span>使用者權限</span>
  </div>
</template>

<script>
export default {
  name: 'Rights',
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
