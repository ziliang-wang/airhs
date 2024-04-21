import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
// import Login from '../views/Login.vue'
// import Test from '../views/Test.vue'

// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    component: () => import('../views/Test.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首頁'
    },
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/Welcome.vue'),
        meta: {
          title: '歡迎頁'
        }
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/basic/Users.vue'),
        meta: {
          title: '基本資料 > 使用者資料'
        }
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('../views/basic/Rights.vue'),
        meta: {
          title: '基本資料 > 使用者權限'
        }
      },
      {
        path: '/customers',
        name: 'customers',
        component: () => import('../views/basic/Customers.vue'),
        meta: {
          title: '基本資料 > 客戶資料'
        }
      },
      {
        path: '/loaders',
        name: 'loaders',
        component: () => import('../views/basic/Loaders.vue'),
        meta: {
          title: '基本資料 > 載具資料'
        }
      },
      {
        path: '/sheets',
        name: 'sheets',
        component: () => import('../views/basic/Sheets.vue'),
        meta: {
          title: '基本資料 > 主單號類型'
        }
      },
      {
        path: '/flights',
        name: 'flights',
        component: () => import('../views/basic/Flights.vue'),
        meta: {
          title: '基本資料 > 班機資料'
        }
      },
      {
        path: '/destination',
        name: 'destination',
        component: () => import('../views/basic/Destination.vue'),
        meta: {
          title: '基本資料 > 目的地'
        }
      },
      {
        path: '/airorder',
        name: 'airorder',
        component: () => import('../views/operation/orders/AirOrder.vue'),
        meta: {
          title: '操作 > 訂倉 > 航空公司訂倉'
        }
      },
      {
        path: '/customerorder',
        name: 'customerorder',
        component: () => import('../views/operation/orders/CustomerOrder.vue'),
        meta: {
          title: '操作 > 訂倉 > 客户訂倉'
        }
      },
      {
        path: '/allocate',
        name: 'allocate',
        component: () => import('../views/operation/Allocate.vue'),
        meta: {
          title: '操作 > 倉位分配'
        }
      },
      {
        path: '/currence',
        name: 'currence',
        component: () => import('../views/operation/Currence.vue'),
        meta: {
          title: '操作 > 現場操作'
        }
      },
      {
        path: '/tracer',
        name: 'tracer',
        component: () => import('../views/operation/Tracer.vue'),
        meta: {
          title: '操作 > 貨物追蹤'
        }
      },
      {
        path: '/addmain',
        name: 'addmain',
        component: () => import('../views/mainsheet/AddMain.vue'),
        meta: {
          title: '主單管理 > 新增主號'
        }
      },
      {
        path: '/mainstore',
        name: 'mainstore',
        component: () => import('../views/mainsheet/MainStore.vue'),
        meta: {
          title: '主單管理 > 主號庫存'
        }
      },
      {
        path: '/mainrecord',
        name: 'mainrecord',
        component: () => import('../views/mainsheet/MainRecord.vue'),
        meta: {
          title: '主單管理 > 使用紀錄'
        }
      },
      {
        path: '/eq',
        name: 'eq',
        component: () => import('../views/reports/Eq.vue'),
        meta: {
          title: '報表 > EQ表'
        }
      },
      {
        path: '/goodstatic',
        name: 'goodstatic',
        component: () => import('../views/reports/statics/GoodStatic.vue'),
        meta: {
          title: '報表 > 統計報表 > 貨量統計'
        }
      },
      {
        path: '/compare',
        name: 'compare',
        component: () => import('../views/reports/statics/Compare.vue'),
        meta: {
          title: '報表 > 統計報表 > 同期比較'
        }
      },
      {
        path: '/daliy',
        name: 'daliy',
        component: () => import('../views/reports/Daliy.vue'),
        meta: {
          title: '報表 > 日報表'
        }
      }
    ]
  },
  {
    path: '/',
    name: 'checkLogin',
    component: () => import('../components/CheckLogin.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
