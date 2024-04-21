<template>
  <div class="login-wrapper" v-loading="loading">
    <div class="modal">
      <el-form ref="userForm" :model="user" status-icon :rules="rules">
        <div class="title">Reindeers Logistics & Supply Chain Co., Ltd</div>
        <el-form-item prop="userName">
          <el-input type="text" v-model.trim="user.userName" placeholder="帳號" prefix-icon="el-icon-user" @focus="user.userName=''" @input="updateInfo"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model.trim="user.password" placeholder="密碼" prefix-icon="el-icon-key" @focus="user.password=''" @input="updateInfo"/>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <div class="verify-area">
            <el-input v-model.trim="user.verifyCode" placeholder="驗證碼" prefix-icon="el-icon-key" @focus="user.verifyCode=''" @input="updateInfo"/>
            <span class="verify-code" @click="refreshVerifyCode" title="看不清？點擊再刷新一次">
              <SIdentify :identifyCode="identifyCode"></SIdentify>
            </span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="checkAccoount">登入</el-button>
        </el-form-item>
        <div v-show="isShowInfo" :class="[{'info-class': activeInfoClass}]">
          <span>{{ showInfo }}</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { useRouter } from 'vue-router'
// eslint-disable-next-line no-unused-vars
// import { User, Key } from '@element-plus/icons'

// const user = {
//   template: `
//     <div>
//       <el-icon size="20" color="blue">
//         <edit></edit>
//       </el-icon>
//     </div>
//   `
// }

import { ajax } from '@/utils/ajax'
import { bndEncrypt, fndSign } from '@/utils/encry'
import jwtDecode from 'jwt-decode'
import SIdentify from '../components/Identify'

// import axios from 'axios'

export default {
  name: 'Login',
  components: {
    SIdentify
  },
  computed: {
    userInfo () {
      return `${this.user.userName},${this.user.password}`
    }
  },
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入驗證碼'))
      } else if (value !== this.identifyCode) {
        callback(new Error('驗證碼錯誤'))
      } else {
        callback()
      }
    }
    return {
      identifyCode: '',
      identifyCodes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      loading: false,
      token: '',
      userData: {},
      user: {
        userName: '',
        password: '',
        loginData: '',
        signature: '',
        verifyCode: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: '請輸入帳號',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '請輸入密碼',
            trigger: 'blur'
          }
        ],
        verifyCode: [
          {
            required: true,
            message: '請輸入驗證碼',
            trigger: 'blur'
          },
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      // userIcon: User,
      // passwordIcon: Key,
      showInfo: '',
      activeInfoClass: false,
      isShowInfo: false
    }
  },
  mounted () {
    this.token = window.localStorage.getItem('token')
    this.makeCode(this.identifyCodes, 4)
    console.log('login:', this.token)
    // console.log('userData: ', this.userData)
  },
  methods: {
    // 刷新验证码
    refreshVerifyCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 驗證碼
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
      // console.log(this.identifyCode)
    },
    updateInfo () {
      this.isShowInfo = false
    },
    checkAccoount () {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.loginData = bndEncrypt(this.userInfo)
          this.signature = fndSign(this.userInfo)
          // console.log(this.loginData)
          // console.log(this.signature)
          ajax.post('/api/User/login', {
            Logindata: this.loginData,
            Signatrue: this.signature
          }).then(({ data }) => {
            if (data.slice(0, 5) === 'Error') {
              this.isShowInfo = true
              this.activeInfoClass = true
              this.showInfo = data.slice(6)
              this.loading = false
              return
            }
            this.token = data
            this.userData = jwtDecode(this.token)
            window.localStorage.setItem('token', this.token)
            window.localStorage.setItem('exp', this.userData.exp)
            window.localStorage.setItem('nameid', this.userData.nameid)
            window.localStorage.setItem('name', this.userData.name)
            // window.localStorage.setItem('UID', this.userData.uid)
            this.$store.dispatch('dispatchPayload', this.token, this.userData)
            // this.$store.commit('savePayload', this.token)
            this.$router.replace({ name: 'home' })
            this.loading = false
            // console.log('login: ', this.token)
            // console.log('userData: ', this.userData)
          }).catch(err => {
            console.log('my err: ', err)
            this.loading = false
            this.$message.error('網路或伺服器掛了，請聯絡工程師處理')
          })
          // if (this.user.userName === this.$store.state.user.username && this.user.password === this.$store.state.user.password) {
          //   this.$router.replace({ name: 'home' })
          //   // alert('ok')
          // } else {
          //   this.isShowInfo = true
          //   this.activeInfoClass = true
          //   this.showInfo = '帳號或密碼錯誤'
          // }
          // return false
        }
      })
      // if (this.userName.trim() === '' || this.password.trim() === '') {
      //   this.isShowInfo = true
      //   this.activeInfoClass = true
      //   this.showInfo = '帳號或密碼不得為空'
      //   return false
      // }
      // alert('ok')
    }
    // goHome () {
    //   this.$router.push({ name: 'welcome' })
    // }
  }
}

</script>

<style lang="scss">
.login-wrapper {
  .el-input {
    padding-left: 15px;
    margin-left: -15px;
    .el-input__icon {
      color: rgb(64, 158, 255);
      font-size: 25px;
      font-weight: bold;
      padding-left: 12px;
    }
  }
  .verify-area {
    display: flex;
    // align-items: flex-end;
    .verify-code {
      cursor: pointer;
      transform: translateY(2px);
    }
  }
}

</style>

<style lang="scss">
.login-wrapper {
  // padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: #eef0f3;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 400px;
    padding: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 3px #c7c9cb4d;
    .title {
      font-size: 30px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
      color: rgb(64, 158, 255);
    }
    .info-class {
      // display: inline;
      color: #ff0000;
      display: flex;
      justify-content: center;
      font-size: 20px;
      margin-bottom: -20px;
    }
    .btn-login {
      margin-top: 10px;
      width: 100%;
      letter-spacing: .8em;
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
