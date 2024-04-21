<template>
  <div class="welcome">
    <div class="content">
      <!-- <div class="sub-title">歡迎使用</div> -->
      <div class="title">
        Reindeers Logistics & <br>
        Supply Chain Co., Ltd
      </div>
      <!-- <div class="desc">- Reindeers Logistics & Supply Chain Co., Ltd.</div> -->
      <!-- <router-view></router-view> -->
    </div>
    <div class="img"></div>
    <!-- <h1>Welcome</h1>
    <router-link :to="{ name: 'login' }">去登錄</router-link> -->
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style lang="scss">
.welcome {
  // background-color: #fff;
  height: 100%;
  // border-radius: 10px;
  // padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    position: relative;
    top: -60px;
    .sub-title {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }
    .title {
      font-size: 40px;
      line-height: 60px;
      color: #409eff;
    }
    .desc {
      text-align: right;
      font-size: 14px;
      color: #999;
    }
  }
  .img {
    background-image: url('../assets/images/welcome.png');
    width: 439px;
    height: 386px;
    border-radius: 30px;
    margin-left: 105px;
  }
}
</style>
