<template>
  <div class="users-container" id="5" ref="usersPageRef" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="8">
        <span v-if="isEnableQuery">
          <el-input class="searchInput" type="text" placeholder="帳號/用戶名" v-model="searchValue" @input="input" clearable @clear="reget">
            <template #append>
              <span v-if="isEnableQuery">
                <el-button class="searchBtn" @click="search">查詢</el-button>
              </span>
              <span v-else>
                <el-button class="searchBtn" @click="search" disabled title="您沒有查詢權限">查詢</el-button>
              </span>
            </template>
          </el-input>
        </span>
        <span v-else>
          <el-input disabled title="您沒有查詢權限" class="searchInput" type="text" placeholder="帳號/用戶名" v-model="searchValue" @input="input" clearable @clear="reget">
            <template #append>
              <span v-if="isEnableQuery">
                <el-button class="searchBtn" @click="search">查詢</el-button>
              </span>
              <span v-else>
                <el-button class="searchBtn" @click="search" disabled title="您沒有查詢權限">查詢</el-button>
              </span>
            </template>
          </el-input>
        </span>
      </el-col>
      <el-col :span="4">
        <span v-if="isEnableAdd">
          <el-button type="primary" @click="addDialogVisible = true">新增帳號</el-button>
        </span>
        <span v-else>
          <el-button type="primary" @click="addDialogVisible = true" disabled title="您沒有新增權限">新增帳號</el-button>
        </span>
      </el-col>
    </el-row>
    <!-- 主表 -->
    <el-row>
      <el-col :span="24">
        <div ref="content">
          <!-- <el-table :data="fmtUsertList" :default-sort = "{prop: 'UID', order: 'descending'}" stripe> -->
          <el-table :data="pageList" stripe>
            <!-- <el-table-column label="ID" prop="UID" sortable></el-table-column> -->
            <el-table-column label="帳號" prop="Account"></el-table-column>
            <el-table-column label="姓名" prop="名稱"></el-table-column>
            <el-table-column label="創建時間" prop="建立時間"></el-table-column>
            <el-table-column label="操作" width="300">
              <template #default="scope">
                <!-- 修改用戶按鈕 -->
                <span v-if="isEnableModify">
                   <el-button type="primary" icon="el-icon-edit" class="operator" @click="showEditDialogVisible(scope.row.Account)"></el-button>
                </span>
                 <span v-else>
                   <el-button type="primary" icon="el-icon-edit" class="operator" @click="showEditDialogVisible(scope.row.Account)" disabled title="您沒有編輯權限"></el-button>
                </span>
                <!-- 刪除用戶按鈕 -->
                <span v-if="isEnableRemove">
                  <el-button type="danger" icon="el-icon-delete" class="operator" @click="removeUserById(scope.row.UID)"></el-button>
                </span>
                <span v-else>
                  <el-button type="danger" icon="el-icon-delete" class="operator" @click="removeUserById(scope.row.UID)" disabled title="您沒有刪除權限"></el-button>
                </span>
                <!-- 权限控管按鈕 -->
                <span v-show="isAdmin">
                  <el-button type="warning" class="permission" @click="showPermissionDialogVisible(scope.row.Account)">權限設置</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- // 主表 -->
    <!-- 分页区域 -->
    <div class="pagination">
      <el-pagination
        background
        :current-page="currentPage"
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="currentChange"
      >
      </el-pagination>
      <!-- <el-pagination
        @current-change="handleCurrentChange"
        :current-page=currentPage
        :page-sizes="[10]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      >
      </el-pagination> -->
    </div>
    <!-- // 分页区域 -->
    <!-- 新增用户 -->
    <el-dialog
      title="新增帳號"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="帳號" prop="username">
          <el-input v-model.trim="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input v-model.trim="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="fullname">
          <el-input v-model.trim="addForm.fullname"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改用戶 -->
    <el-dialog
      title="修改帳號"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="帳號" prop="Account">
          <el-input v-model.trim="editForm.Account"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="Password">
          <el-input v-model.trim="editForm.Password" placeholder="設置新密碼"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="名稱">
          <el-input v-model.trim="editForm.名稱"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="editUser">確 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 設置權限對話框 -->
    <el-dialog
      :visible.sync="permissionDialogVisible"
      width="80%"
    >
      <SetPermission
        @closePermissionWindow="permissionDialogVisible=false"
        @uploadPermission="sendPermission"
        :permissionAccount=permissionAccount
        :objectPermissionList=objectPermissionList
      />
      <!-- <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="帳號" prop="Account">
          <el-input v-model.trim="editForm.Account"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="Password">
          <el-input v-model.trim="editForm.Password" placeholder="設置新密碼"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="名稱">
          <el-input v-model.trim="editForm.名稱"></el-input>
        </el-form-item>
      </el-form> -->
      <!-- <template #footer>
        <span class="dialog-footer">
          <el-button @click="permissionDialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="setUserPermission">确 定</el-button>
        </span>
      </template> -->
    </el-dialog>
    <!-- <el-card class="card"> -->
      <!-- <el-table :data="userList" stripe>
        <el-table-column label="帳號" prop="account"></el-table-column>
        <el-table-column label="姓名" prop="fullName"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table> -->
    <!-- </el-card> -->
    <!-- 汇出pdf -->
    <!-- <button @click="toPdf">Export to Pdf</button> -->
    <!-- // 汇出pdf -->
  </div>
</template>

<script>
import timefmt from '../../utils/timefmt'
import { ajax } from '@/utils/ajax'
import SetPermission from '@/components/SetPermission'
// import axios from 'axios'
// import qs from 'qs'

export default {
  name: 'Users',
  components: {
    SetPermission
  },
  methods: {
    // 变更页码
    currentChange (pageNum) {
      this.currentPage = pageNum
      console.log('current page: ', this.currentPage)
    },
    // 設置權限
    sendPermission (account, userPermissionList) {
      console.log('set for: ', account)
      console.log('set for: ', userPermissionList)
      // this.objectPermissionList = userPermissionList
      this.loading = true
      ajax.post('/api/User/auth',
        {
          JSON: JSON.stringify(userPermissionList)
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        }
      ).then(res => {
        this.loading = false
        console.log('permission res: ', res)
        if (res.data === 'OK') {
          setTimeout(() => {
            this.$message.success('權限設置成功')
          }, 1000)
        } else {
          setTimeout(() => {
            this.$message.success('權限設置失敗，請稍後重試')
          }, 1000)
        }
      }).catch(err => {
        this.loading = false
        console.log('permission err: ', err)
        setTimeout(() => {
          this.$message.success('權限設置失敗，請稍後重試')
        }, 1000)
      })
    },
    // 渲染权限
    renderPermission () {
      // 當前帳號是否為supervisor
      if (this.nameid === 'supervisor') {
        this.isAdmin = true
        this.isEnableAdd = 1
        this.isEnableRemove = 1
        this.isEnableModify = 1
        this.isEnableQuery = 1
        return false
      }

      for (const item of this.currentUserPermission) {
        // console.log('item: ', item)
        if (item.MenuUID === parseInt(this.$refs.usersPageRef.id)) {
          this.isEnableAdd = item.新增
          this.isEnableRemove = item.刪除
          this.isEnableModify = item.編輯
          this.isEnableQuery = item.查詢
          return false
        }
        // this.$message.warning('没有匹配到權限')
      }
    },
    // 获取当前用户权限
    getCurrentUserPermission () {
      ajax.get('/api/User/auth', {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(res => {
        this.currentUserPermission = res.data
        console.log('user per: ', this.currentUserPermission)
        this.renderPermission()
      }).catch(err => {
        console.log(err)
      })
    },
    // 查詢搜索的clear
    reget () {
      this.getUserList()
    },
    // 查詢
    search () {
      if (this.searchValue === '') return
      // 查詢get請求
      this.loading = true
      ajax.get('/api/User', {
        params: {
          account: this.searchValue
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(res => {
        console.log('search res: ', res)
        this.loading = false
        this.userList = res.data
      }).catch(err => {
        this.loading = false
        console.log('search err: ', err)
      })
    },
    // 取得用戶列表
    getUserList () {
      this.loading = true
      ajax.get('/api/User', {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(({ data }) => {
        this.userList = data.reverse()
        this.loading = false
        console.log(this.userList)
      }).catch(err => {
        console.log('users err: ', err)
        this.loading = false
        this.$message.error('獲取用戶列表失敗，請刷新重試')
      })
    },
    setPermissionById (id) {
      alert(id)
    },
    toPdf () {
      const timeString = timefmt()
      // eslint-disable-next-line dot-notation
      this.$PDFSave(this.$refs['content'], timeString)
    },
    // 刪除用戶
    async removeUserById (id) {
      // 禁止刪除supervisor
      if (id === 40) {
        this.$message.warning('禁止刪除supervisor')
        return
      }

      console.log(id)
      // console.log(typeof id)
      const confirmResult = await this.$confirm('此操作將永久删除該帳號, 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.success('已取消刪除')
      }

      // todo 刪除用戶請求
      this.loading = true
      ajax.delete('api/User',
        {
          data: {
            UID: id
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + this.token
          }
        }).then(({ data }) => {
        this.loading = false
        const res = data
        if (res.slice(0, 5) === 'Error') {
          return this.$message.error(res.slice(6))
        }
        if (res === 'OK') this.$message.success('刪除成功')
        setTimeout(() => {
          this.getUserList()
        }, 3000)
      }).catch(err => {
        console.log('users err: ', err)
        this.loading = false
        this.addDialogVisible = false
        setTimeout(() => {
          this.$message.error('刪除失敗，請再重試一次')
        }, 3000)
      })
    },
    // 修改用戶對話框
    showEditDialogVisible (account) {
      // this.editForm = {}
      ajax.get('/api/User', {
        params: {
          account: account
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(res => {
        this.editForm = res.data[0]
        this.editForm.Password = ''
        // 禁止非supervisor修改supervisor
        if (this.editForm.Account === 'supervisor' && this.nameid !== 'supervisor') {
          this.$message.warning('禁止修改supervisor')
          return
        }
        this.editDialogVisible = true
        // console.log(this.editForm)
      }).catch(err => {
        console.log('edit err: ', err)
      })
    },
    editDialogClosed () {
      // eslint-disable-next-line dot-notation
      this.$refs['editFormRef'].resetFields()
    },
    // 修改用戶
    editUser () {
      console.log(this.editForm.UID)

      this.$refs.editFormRef.validate(valid => {
        if (!valid) return false
        this.editDialogVisible = false
        // 修改用戶請求
        this.loading = true
        ajax.put('/api/User',
          {
            UID: this.editForm.UID,
            account: this.editForm.Account,
            password: this.editForm.Password,
            name: this.editForm.名稱
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }).then(({ data }) => {
          this.loading = false
          const res = data
          console.log(res)
          if (res.slice(0, 5) === 'Error') {
            return this.$message.error(res.slice(6))
          }
          if (res === 'OK') this.$message.success('修改成功')
          setTimeout(() => {
            this.getUserList()
          }, 3000)
        }).catch(err => {
          console.log('users err: ', err)
          this.loading = false
          this.editDialogVisible = false
          setTimeout(() => {
            this.$message.error('修改失敗，請再重試一次')
          }, 3000)
        })
      })
    },
    // 新增用戶
    addUser () {
      // eslint-disable-next-line dot-notation
      this.$refs['addFormRef'].validate(valid => {
        if (!valid) return false
        this.addDialogVisible = false
        this.loading = true
        ajax.post('/api/User',
          {
            account: this.addForm.username,
            password: this.addForm.password,
            name: this.addForm.fullname
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }).then(({ data }) => {
          this.loading = false
          const res = data
          if (res.slice(0, 5) === 'Error') {
            return this.$message.error(res.slice(6))
          }
          if (res === 'OK') this.$message.success('新增成功')
          setTimeout(() => {
            this.getUserList()
          }, 3000)
        }).catch(err => {
          console.log('users err: ', err)
          this.loading = false
          this.addDialogVisible = false
          setTimeout(() => {
            this.$message.error('新增失敗，請再重試一次')
          }, 3000)
        })
      })
    },
    addDialogClosed () {
      // eslint-disable-next-line dot-notation
      this.$refs['addFormRef'].resetFields()
    },
    input () {
      this.$forceUpdate()
    },
    handleCurrentChange (currentPage) {
      console.log(currentPage)
      this.currentPage = currentPage
    },
    // 設置權限對話框
    showPermissionDialogVisible (account) {
      if (account === 'supervisor') {
        this.$message.warning('supervisor已是最高權限，無需設置')
        return
      }
      this.permissionDialogVisible = true
      this.permissionAccount = account
      console.log(this.permissionAccount)
      // 獲取權限對象的設置記錄
      ajax.get('/api/User/auth', {
        params: {
          Account: this.permissionAccount
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(res => {
        console.log('object permission list: ', res.data)
        // console.log(typeof res.data)
        this.objectPermissionList = res.data
        // console.log('user per: ', this.currentUserPermission)
        // this.renderPermission()
      }).catch(err => {
        console.log(err)
      })
      // console.log('haha: ', this.userPermissionList)
    },
    handleDate (time) {
      if (time === null) return false
      return time.slice(0, 10) + ' ' + time.slice(11, 19)
    }
  },
  computed: {
    // 格式化user列表
    fmtUsertList () {
      const fmtList = []
      for (const user of this.userList) {
        const data = {
          UID: user.UID,
          Account: user.Account,
          名稱: user.名稱,
          建立時間: this.handleDate(user.建立時間)
        }
        fmtList.push(data)
      }
      return fmtList
    },
    // 分页total
    total () {
      return this.fmtUsertList.length
    },
    // 分页列表
    pageList: {
      get () {
        return this.fmtUsertList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    }
  },
  data () {
    return {
      // 当前页的页码
      currentPage: 1,
      // 每页的笔数
      pageSize: 10,
      loading: false,
      token: '',
      isExport: false,
      searchValue: '',
      // edit: Edit,
      // del: Delete,
      // search: Search,
      addDialogVisible: false,
      editDialogVisible: false,
      permissionDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        fullname: ''
      },
      addFormRules: {
        username: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密碼不得為空', trigger: 'blur' }
        ],
        fullname: [
          { required: true, message: '姓名不得為空', trigger: 'blur' }
        ]
      },
      editFormRules: {
        Account: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        Password: [
          { required: true, message: '密碼不得為空', trigger: 'blur' }
        ],
        名稱: [
          { required: true, message: '姓名不得為空', trigger: 'blur' }
        ]
      },
      editForm: {},
      userList: [],
      currentUserPermission: [],
      isEnableAdd: 0,
      isEnableRemove: 0,
      isEnableModify: 0,
      isEnableQuery: 0,
      isAdmin: false,
      nameid: '',
      permissionAccount: '',
      objectPermissionList: []
    }
  },
  mounted () {
    this.token = window.localStorage.getItem('token')
    this.nameid = window.localStorage.getItem('nameid')
    this.getUserList()
    this.getCurrentUserPermission()
  },
  watch: {
    $route () {
      // console.log('kk users: ', this.token)
      // if (this.$route.fullPath !== '/user-manager/') this.show = false
    }
  }
}
</script>

<style lang="scss">

.users-container {
  padding: 10px;
  .searchBtn {
    font-size: 16px;
    border-radius: 0 2px 2px 0;
  }
  .operator {
    // padding: 10px 0 10px 10px;
    font-size: 16px;
    margin-right: 10px;
  }
  // .card {
  //   box-shadow: 0 1px 1px rgba(0, 0, 0, .15);
  //   .el-card__body {
  //     padding-top: 0;
  //   }
  // }
  .el-table {
    margin-top: 10px;
  }

  .pagination {
    text-align: center;
    .el-pagination {
      margin-top: 20px;
    }
  }

  .el-input-group__append button.el-button {
    color: #fff;
    background-color: #fc5000;
  }
  // .el-input__suffix {
  //   transform: translateX(-20px);
  //   color: green;
  // }

}
// .searchBtn {
//   background-color: yellow;
// }
</style>
