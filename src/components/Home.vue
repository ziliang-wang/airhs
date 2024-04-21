<template>
  <div class="basic-layout">
    <!-- 左側功能表 -->
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
        <span class="nav-side-title">RDS&nbsp;System</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu
        :default-active="activePath"
        class="nav-menu"
        background-color="rgb(36, 49, 55)"
        text-color="#f5f7f9"
        unique-opened
        :collapse="isCollapse"
        active-text-color="#ffd04b"
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>基本資料</span>
          </template>
          <!-- 使用者资料 -->
          <span v-if="isEnableUsersMenu">
            <el-menu-item index="/users" @click="saveNavState('/users')">使用者資料</el-menu-item>
          </span>
           <span v-else id="5" ref="usersMenuRef">
            <el-menu-item index="/users" @click="saveNavState('/users')" disabled title="您沒有使用者資料的權限">使用者資料</el-menu-item>
          </span>
          <!-- 客户资料 -->
          <span v-if="isEnableCustomersMenu">
            <el-menu-item index="/customers" @click="saveNavState('/customers')">客戶資料</el-menu-item>
          </span>
          <span v-else id="6" ref="customersMenuRef">
            <el-menu-item index="/customers" @click="saveNavState('/customers')" disabled title="您沒有客戶資料的權限">客戶資料</el-menu-item>
          </span>
          <!-- 载具资料 -->
          <span v-if="isEnableLoadersMenu">
            <el-menu-item index="/loaders" @click="saveNavState('/loaders')">載具資料</el-menu-item>
          </span>
          <span v-else id="7" ref="loadersMenuRef">
            <el-menu-item index="/loaders" @click="saveNavState('/loaders')" disabled title="您沒有載具資料的權限">載具資料</el-menu-item>
          </span>
          <!-- 主单号类型 -->
          <span v-if="isEnableSheetsMenu">
            <el-menu-item index="/sheets" @click="saveNavState('/sheets')">主單號類型</el-menu-item>
          </span>
          <span v-else id="8" ref="sheetsMenuRef">
            <el-menu-item index="/sheets" @click="saveNavState('/sheets')" disabled title="您沒有主單號類型的權限">主單號類型</el-menu-item>
          </span>
          <!-- 班机资料 -->
          <span v-if="isEnableFlightsMenu">
            <el-menu-item index="/flights" @click="saveNavState('/flights')">班機資料</el-menu-item>
          </span>
          <span v-else id="9" ref="flightsMenuRef">
            <el-menu-item index="/flights" @click="saveNavState('/flights')" disabled title="您沒有班機資料的權限">班機資料</el-menu-item>
          </span>
          <!-- 目的地 -->
          <span v-if="isEnableDestMenu">
            <el-menu-item index="/destination" @click="saveNavState('/destination')">目的地</el-menu-item>
          </span>
          <span v-else id="10" ref="destMenuRef">
            <el-menu-item index="/destination" @click="saveNavState('/destination')" disabled title="您沒有目的地的權限">目的地</el-menu-item>
          </span>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-operation"></i>
            <span>操作</span>
          </template>
          <el-submenu index="2-1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>訂倉</span>
            </template>
            <!-- 航空公司訂倉 -->
            <span v-if="isEnableAirorderMenu">
              <el-menu-item index="/airorder" @click="saveNavState('/airorder')">航空公司訂倉</el-menu-item>
            </span>
            <span v-else id="12" ref="airorderMenuRef">
              <el-menu-item index="/airorder" @click="saveNavState('/airorder')" disabled title="您沒有航空公司訂倉的權限">航空公司訂倉</el-menu-item>
            </span>
            <!-- 客戶訂倉 -->
            <span v-if="isEnableCustMenu">
              <el-menu-item index="/customerorder" @click="saveNavState('/customerorder')">客戶訂倉</el-menu-item>
            </span>
            <span v-else id="13" ref="custMenuRef">
              <el-menu-item index="/customerorder" @click="saveNavState('/customerorder')" disabled title="您沒有客戶訂倉的權限">客戶訂倉</el-menu-item>
            </span>
          </el-submenu>
          <!-- 倉位分配 -->
          <span v-if="isEnableAllocateMenu">
            <el-menu-item index="/allocate" @click="saveNavState('/allocate')">倉位分配</el-menu-item>
          </span>
          <span v-else id="14" ref="allocateMenuRef">
            <el-menu-item index="/allocate" @click="saveNavState('/allocate')" disabled title="您沒有倉位分配的權限">倉位分配</el-menu-item>
          </span>
          <!-- 現場操作 -->
          <span v-if="isEnableCurrMenu">
            <el-menu-item index="/currence" @click="saveNavState('/currence')">現場操作</el-menu-item>
          </span>
          <span v-else id="15" ref="currMenuRef">
            <el-menu-item index="/currence" @click="saveNavState('/currence')" disabled title="您沒有現場操作的權限">現場操作</el-menu-item>
          </span>
          <!-- 貨物追蹤 -->
          <span v-if="isEnableTracerMenu">
            <el-menu-item index="/tracer" @click="saveNavState('/tracer')">貨物追蹤</el-menu-item>
          </span>
          <span v-else id="16" ref="tracerMenuRef">
            <el-menu-item index="/tracer" @click="saveNavState('/tracer')" disabled title="您沒有貨物追蹤的權限">貨物追蹤</el-menu-item>
          </span>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-management"></i>
            <span>主單管理</span>
          </template>
          <!-- 新增主號 -->
          <span v-if="isEnableAddmainMenu">
            <el-menu-item index="/addmain" @click="saveNavState('/addmain')">新增主號</el-menu-item>
          </span>
          <span v-else id="17" ref="addmainMenuRef">
            <el-menu-item index="/addmain" @click="saveNavState('/addmain')" disabled title="您沒有新增主號的權限">新增主號</el-menu-item>
          </span>
          <!-- 主號庫存
          <span v-if="isEnableMainstoreMenu">
            <el-menu-item index="/mainstore" @click="saveNavState('/mainstore')">主號庫存</el-menu-item>
          </span>
          <span v-else id="18" ref="mainstoreMenuRef">
            <el-menu-item index="/mainstore" @click="saveNavState('/mainstore')" disabled title="您沒有主號庫存的權限">主號庫存</el-menu-item>
          </span> -->
          <!-- 使用紀錄 -->
          <span v-if="isEnableMainrecordMenu">
            <el-menu-item index="/mainrecord" @click="saveNavState('/mainrecord')">使用紀錄</el-menu-item>
          </span>
          <span v-else id="19" ref="mainrecordMenuRef">
            <el-menu-item index="/mainrecord" @click="saveNavState('/mainrecord')" disabled title="您沒有使用紀錄的權限">使用紀錄</el-menu-item>
          </span>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-pie-chart"></i>
            <span>報表</span>
          </template>
          <!-- EQ表 -->
          <span v-if="isEnableEqMenu">
            <el-menu-item index="/eq" @click="saveNavState('/eq')">EQ表</el-menu-item>
          </span>
          <span v-else id="20" ref="eqMenuRef">
            <el-menu-item index="/eq" @click="saveNavState('/eq')" disabled title="您沒有EQ表的權限">EQ表</el-menu-item>
          </span>
          <el-submenu index="4-2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>統計報表</span>
            </template>
            <!-- 货量统计 -->
            <span v-if="isEnableGoodsMenu">
              <el-menu-item index="/goodstatic" @click="saveNavState('/goodstatic')">貨量統計</el-menu-item>
            </span>
            <span v-else id="21" ref="goodsMenuRef">
              <el-menu-item index="/goodstatic" @click="saveNavState('/goodstatic')" disabled title="您沒有貨量統計的權限">貨量統計</el-menu-item>
            </span>
            <!-- 同期比较 -->
            <span v-if="isEnableCompareMenu">
              <el-menu-item index="/compare" @click="saveNavState('/compare')">同期比較</el-menu-item>
            </span>
            <span v-else id="22" ref="compareMenuRef">
              <el-menu-item index="/compare" @click="saveNavState('/compare')" disabled title="您沒有同期比較的權限">同期比較</el-menu-item>
            </span>
          </el-submenu>
          <!-- 日报表 -->
          <span v-if="isEnableDailyMenu">
            <el-menu-item index="/daliy" @click="saveNavState('/daliy')">日報表</el-menu-item>
          </span>
          <span v-else id="23" ref="dailyMenuRef">
            <el-menu-item index="/daliy" @click="saveNavState('/daliy')" disabled title="您沒有日報表的權限">日報表</el-menu-item>
          </span>
        </el-submenu>
      </el-menu>
      <!-- // 导航菜单 -->
    </div>
    <!-- // 左側功能表 -->
    <!-- 右侧内容 -->
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-folder" @click="toggle">
            <el-tooltip effect="dark" content="折疊/展開左側功能表" placement="bottom-start">
              <!-- 折疊 / 展開 -->
              <i v-if="isCollapse" class="el-icon-s-unfold"></i>
              <i v-else class="el-icon-s-fold"></i>
              <!-- // 折疊 / 展開 -->
            </el-tooltip>
          </div>
          <div class="bread">
            <bread-crumb></bread-crumb>
            <!-- <router-link :to="{ name: 'test' }">面包屑</router-link> -->
          </div>
        </div>
        <div class="user-info">
          <!-- 通知 -->
          <el-badge :is-dot="true" class="notice">
            <i class="el-icon-bell"></i>
          </el-badge>
          <!-- // 通知 -->
          <!-- 用戶下拉菜單 -->
          <div class="user">
            <el-dropdown @command="handleLogout">
              <span class="user-link">
                <span class="user-link-username">{{ username }}</span>
                <span class="arrow-down">
                  <i class="el-icon-arrow-down"></i>
                </span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="email">{{ name }}</el-dropdown-item>
                  <el-dropdown-item command="logout">登出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <!-- // 用戶下拉菜單 -->
        </div>
      </div>
      <div class="wrapper">
        <!-- <router-view></router-view> -->
        <!-- 主内容页 -->
        <div class="main-page">
          <!-- 子路由的出口 -->
          <router-view></router-view>
        </div>
        <!-- // 主内容页 -->
      </div>
    </div>
  </div>
</template>

<script>
// import { Document, Operation, Management, TrendCharts, Fold, Bell, ArrowDown, Menu } from '@element-plus/icons'
import BreadCrumb from './BreadCrumb.vue'
import { ajax } from '@/utils/ajax'

export default {
  name: 'Home',
  data () {
    return {
      token: '',
      userEmail: '550310889@qq.com',
      isCollapse: false,
      activePath: '/home',
      nameid: '',
      name: '',
      exp: 0,
      currentUserPermission: [],
      // 5 使用者資料
      isEnableUsersMenu: false,
      // 6 客戶資料
      isEnableCustomersMenu: false,
      // 7 载具资料
      isEnableLoadersMenu: false,
      // 8 主单号类型
      isEnableSheetsMenu: false,
      // 9 班機資料
      isEnableFlightsMenu: false,
      // 10 目的地
      isEnableDestMenu: false,
      // 12 航空公司訂倉
      isEnableAirorderMenu: false,
      // 13 客戶訂倉
      isEnableCustMenu: false,
      // 14 倉位分配
      isEnableAllocateMenu: false,
      // 15 現場操作
      isEnableCurrMenu: false,
      // 16 貨物追蹤
      isEnableTracerMenu: false,
      // 17 新增主号
      isEnableAddmainMenu: false,
      // 18 主号库存
      isEnableMainstoreMenu: false,
      // 19 使用纪录
      isEnableMainrecordMenu: false,
      // 20 EQ表
      isEnableEqMenu: false,
      // 21 货量统计
      isEnableGoodsMenu: false,
      // 22 同期比较
      isEnableCompareMenu: false,
      // 23 日报表
      isEnableDailyMenu: false
    }
  },
  mounted () {
    // console.log('home: ', this.$store.state.token)
    this.token = window.localStorage.getItem('token')
    this.exp = window.localStorage.getItem('exp')
    this.nameid = window.localStorage.getItem('nameid')
    this.name = window.localStorage.getItem('name')
    this.activePath = window.localStorage.getItem('activePath')
    // this.isAdmin()
    // if (!(this.$store.state.user.username !== 'admin' || this.$store.state.user.password !== 'adm23456')) {
    //   return this.$router.replace({ name: 'login' })
    // }
    // check有無過期
    const now = parseInt(Date.now() / 1000)
    // const now = 1645696700
    // 1645696634
    if (now > this.exp) {
      window.localStorage.clear()
      this.$store.dispatch('removeUserData')
      this.$message.success('您的Token已過期，請重新登入')
      return this.$router.replace({ name: 'login' })
    }

    if (!this.token) {
      return this.$router.replace({ name: 'login' })
    }
    this.$router.replace({ path: this.activePath || '/home' })
    // 獲取當前用戶的權限
    this.getCurrentUserPermission()
  },
  watch: {
    $route (to) {
      window.localStorage.setItem('activePath', to.path)
      this.activePath = to.path
    }
  },
  computed: {
    username () {
      return this.nameid.slice(0, 1).toUpperCase() + this.nameid.slice(1)
    }
  },
  methods: {
    // 渲染权限
    renderPermission () {
      // console.log('menu id: ', this.$refs.usersMenuRef.id)
      for (const item of this.currentUserPermission) {
        if (item.新增 === 1 || item.刪除 === 1 || item.編輯 === 1 || item.查詢 === 1 || item.匯出 === 1) {
          // 使用者資料
          if (item.MenuUID === parseInt(this.$refs.usersMenuRef.id)) {
            this.isEnableUsersMenu = true
          }
          // 客戶資料
          if (item.MenuUID === parseInt(this.$refs.customersMenuRef.id)) {
            this.isEnableCustomersMenu = true
          }
          // 载具资料
          if (item.MenuUID === parseInt(this.$refs.loadersMenuRef.id)) {
            this.isEnableLoadersMenu = true
          }
          // 主单号类型
          if (item.MenuUID === parseInt(this.$refs.sheetsMenuRef.id)) {
            this.isEnableSheetsMenu = true
          }
          // 班機資料
          if (item.MenuUID === parseInt(this.$refs.flightsMenuRef.id)) {
            this.isEnableFlightsMenu = true
          }
          // 目的地
          if (item.MenuUID === parseInt(this.$refs.destMenuRef.id)) {
            this.isEnableDestMenu = true
          }
          // 航空公司訂倉
          if (item.MenuUID === parseInt(this.$refs.airorderMenuRef.id)) {
            this.isEnableAirorderMenu = true
          }
          // 客戶訂倉
          if (item.MenuUID === parseInt(this.$refs.custMenuRef.id)) {
            this.isEnableCustMenu = true
          }
          // 倉位分配
          if (item.MenuUID === parseInt(this.$refs.allocateMenuRef.id)) {
            this.isEnableAllocateMenu = true
          }
          // 現場操作
          if (item.MenuUID === parseInt(this.$refs.currMenuRef.id)) {
            this.isEnableCurrMenu = true
          }
          // 貨物追蹤
          if (item.MenuUID === parseInt(this.$refs.tracerMenuRef.id)) {
            this.isEnableTracerMenu = true
          }
          // 新增主号
          if (item.MenuUID === parseInt(this.$refs.addmainMenuRef.id)) {
            this.isEnableAddmainMenu = true
          }
          // 主号库存
          // if (item.MenuUID === parseInt(this.$refs.mainstoreMenuRef.id)) {
          //   this.isEnableMainstoreMenu = true
          // }
          // 使用纪录
          if (item.MenuUID === parseInt(this.$refs.mainrecordMenuRef.id)) {
            this.isEnableMainrecordMenu = true
          }
          // EQ表
          if (item.MenuUID === parseInt(this.$refs.eqMenuRef.id)) {
            this.isEnableEqMenu = true
          }
          // 货量统计
          if (item.MenuUID === parseInt(this.$refs.goodsMenuRef.id)) {
            this.isEnableGoodsMenu = true
          }
          // 同期比较
          if (item.MenuUID === parseInt(this.$refs.compareMenuRef.id)) {
            this.isEnableCompareMenu = true
          }
          // 日报表
          if (item.MenuUID === parseInt(this.$refs.dailyMenuRef.id)) {
            this.isEnableDailyMenu = true
          }
        }
      }
    },
    // 获取当前用户权限
    getCurrentUserPermission () {
      // 當前用戶是否為supervisor
      if (this.isAdmin()) {
        this.isEnableUsersMenu = true
        this.isEnableCustomersMenu = true
        this.isEnableLoadersMenu = true
        this.isEnableSheetsMenu = true
        this.isEnableFlightsMenu = true
        this.isEnableDestMenu = true
        this.isEnableAirorderMenu = true
        this.isEnableCustMenu = true
        this.isEnableAllocateMenu = true
        this.isEnableCurrMenu = true
        this.isEnableTracerMenu = true
        this.isEnableAddmainMenu = true
        // this.isEnableMainstoreMenu = true
        this.isEnableMainrecordMenu = true
        this.isEnableEqMenu = true
        this.isEnableGoodsMenu = true
        this.isEnableCompareMenu = true
        this.isEnableDailyMenu = true
        return
      }
      ajax.get('/api/User/auth', {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(res => {
        this.currentUserPermission = res.data
        // console.log('home per: ', this.currentUserPermission)
        this.renderPermission()
      }).catch(err => {
        console.log(err)
      })
    },
    // 是否是supervisor
    isAdmin () {
      if (this.nameid === 'supervisor') {
        return true
      }
      return false
    },
    saveNavState (activePath) {
      window.localStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    toggle () {
      // alert('toggle')
      this.isCollapse = !this.isCollapse
    },
    async handleLogout (option) {
      if (option === 'email') return false
      const confirmResult = await this.$confirm('確定要登出嗎?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.success('已取消登出')
      }
      window.localStorage.clear()
      this.$store.dispatch('removeUserData')
      return this.$router.replace({ name: 'login' })
    }
  },
  components: {
    // Document
    // Fold,
    // Bell,
    // ArrowDown,
    BreadCrumb
    // Menu,
    // Operation,
    // Management,
    // TrendCharts
  }
}
</script>

<style lang="scss">
.basic-layout {
  position: relative;
  // overflow: hidden;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    // background-color: #001529;
    background-color: rgb(36, 49, 55);
    color: #f5f7f9;
    overflow-y: auto;
    transition: width .5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      // justify-content: center;
      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
      .nav-side-title {
        color: #f5f7f9;
      }
    }
    .nav-menu {
      border-right: none;
      height: calc(100vh - 50px);
      transform: translateX(-4px);
    }
    &.fold {
      width: 64px;
      overflow-x: hidden;
      overflow-y: hidden;
    }
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    // width: calc(100vw - 200px);
    position: relative;
    // padding: 20px;
    margin-left: 200px;
    // overflow: hidden;
    &.fold {
      margin-left: 64px;
    }
    &.unfold {
      margin-left: 200px;
    }
    // 固定定位
    .nav-top {
      background-color: #f5f7f9;
      z-index: 999;
      position: fixed;
      // overflow: hidden;
      width: calc(100vw - 240px);
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px 0 20px;
      .nav-left {
        display: flex;
        // flex: 3;
        align-items: center;
        overflow: hidden;
        .menu-folder {
          line-height: 10px;
          cursor: pointer;
        }
        .bread {
          margin-left: 5px;
          font-size: 20px;
        }
      }
      .user-info {
        // flex: 1;
        // text-align: right;
        display: flex;
        overflow: hidden;
        align-items: center;
        font-size: 20px;
        .notice {
          line-height: 10px;
          // margin-top: 15px;
          margin-right: 15px;
        }
        .user {
          line-height: 30px;
          // padding-right: 5px;
          .user-link {
            cursor: pointer;
            .user-link-username {
              color: #409eff;
              font-weight: bold;
              font-size: 20px;
              line-height: 30px;
              margin-right: 5px;
            }
            .arrow-down {
              color: black;
            }
          }
        }
      }
    }
    .wrapper {
      // margin-top: 50px;
      // background-color: #eef0f3;
      padding: 20px;
      // height: 100%;
      height: calc(100vh - 91px);
      // border-radius: 10px;
      .main-page {
        padding: 20px;
        margin-top: 50px;
        background-color: #fff;
        height: 100%;
        border-radius: 10px;
        box-sizing: border-box;
      }
    }
  }
  i.el-icon-document,
  i.el-icon-s-operation,
  i.el-icon-menu,
  i.el-icon-s-management,
  i.el-icon-pie-chart {
    font-size: 30px;
    margin-right: 15px;
    color: #f5f7f9;
  }
  i.el-icon-bell,
  i.el-icon-s-fold,
  i.el-icon-s-unfold {
    font-size: 32px;
  }
  .el-submenu__title:hover,
  .el-menu-item:hover {
    background-color: #000 !important;
  }
  .el-submenu__icon-arrow {
    color: #f5f7f9;
  }
  .el-menu-item.is-active {
    background-color: transparent !important;
  }
  .el-menu-item {
    background-color: transparent !important;
  }
}
</style>
