<template>
  <div>子良測試
    <el-button type="primary">test</el-button>
    <div v-for="_ in 3" :key="_">
      <input type="radio" name="ff">tt
    </div>
    <p>
      <!-- <span>{{ loader }}</span>&nbsp;&nbsp;<span>{{ rest }}</span> -->
      <input type="text" :class="[{red: isRed}]" v-model="loader" @input="change" :size="1" maxlength="1">
      <span style="background-color: orange">AKE</span>
      <input type="text" v-model="rest">
      <br>
    </p>
    <p>
      <button @click="send">test</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      loader: '5',
      rest: '5',
      isRed: false
    }
  },
  methods: {
    change () {
      this.rest = 5
      if (!isNaN(this.loader)) {
        if (this.loader < 0) this.loader = 1

        if (this.loader > this.rest) {
          this.isRed = true
          this.rest = 0
        } else {
          this.isRed = false
          this.rest -= this.loader
        }
      }
    },
    send () {
      this.loader = 0
      // 存到剩余数量的栏位
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin-top: 100px;

}

input {
  padding: 0;
  text-align: center;
}

.red {
    color: red;
}
</style>>
