<template>
  <div></div>
</template>

<script>
export default {
  name: 'CheckLogin',
  data () {
    return {
      token: ''
    }
  },
  mounted () {
    this.token = window.localStorage.getItem('token')
    console.log('checklogin:', this.token)
    if (!this.token) {
      this.$router.replace({ name: 'login' })
    } else {
      this.$router.replace({ name: 'home' })
    }
  }
}
</script>
