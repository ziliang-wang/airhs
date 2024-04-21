<template>
  <div class="destination-container" id="10" ref="destPageRef" v-loading="loading">
    <el-row>
      <!-- <el-col :span="8">
        <el-input class="searchInput" type="text" placeholder="目的地名稱" v-model="searchValue" @input="input" clearable>
          <template #append>
            <el-button class="searchBtn">查詢</el-button>
          </template>
        </el-input>
      </el-col> -->
      <el-col :span="3" :offset="18" style="transform: translateX(-12px)">
        <span v-if="isEnableAdd">
          <el-button type="primary" @click="addDialogVisible = true">新增目的地</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有新增權限" type="primary" @click="addDialogVisible = true">新增目的地</el-button>
        </span>
      </el-col>
      <!-- <el-col :span="12">
        <el-input></el-input>
      </el-col> -->
    </el-row>
    <el-table :data="pageList" stripe>
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column label="代碼" prop="代碼"></el-table-column>
        <!-- <el-table-column label="板重" prop="loader_weight"></el-table-column>
        <el-table-column label="適用航空公司" prop="loader_airline"></el-table-column> -->
        <!-- <el-table-column label="電話" prop="tel"></el-table-column>
        <el-table-column label="信箱" prop="mail"></el-table-column>
        <el-table-column label="運輸公司" prop="logistics_company"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column> -->
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <!-- 修改按鈕 -->
            <span v-if="isEnableModify">
              <el-button type="primary" icon="el-icon-edit" class="operator" @click="showEditDialogVisible(scope.row)"></el-button>
            </span>
            <span v-else>
              <el-button disabled title="您沒有編輯權限" type="primary" icon="el-icon-edit" class="operator" @click="showEditDialogVisible(scope.row)"></el-button>
            </span>
            <!-- 刪除按鈕 -->
            <span v-if="isEnableRemove">
              <el-button type="danger" icon="el-icon-delete" class="operator" @click="removeDestById(scope.row.UID)"></el-button>
            </span>
            <span v-else>
              <el-button disabled title="您沒有刪除權限" type="danger" icon="el-icon-delete" class="operator" @click="removeDestById(scope.row.UID)"></el-button>
            </span>
          </template>
        </el-table-column>
    </el-table>
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
        @size-change="handleSizeChange"
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
    <!-- 新增目的地 -->
    <el-dialog
      title="新增目的地"
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
        <el-form-item label="代碼" prop="dest_code">
          <el-input v-model.trim="addForm.dest_code"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDest">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改目的地 -->
    <el-dialog
      title="修改目的地"
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
        <el-form-item label="代碼" prop="代碼">
          <el-input v-model.trim="editForm.代碼"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="editDest">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- <el-card class="card"> -->
      <!-- <el-table :data="userList" stripe>
        <el-table-column label="帳號" prop="account"></el-table-column>
        <el-table-column label="姓名" prop="fullName"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table> -->
    <!-- </el-card> -->
  </div>
</template>

<script>
// import { Edit, Delete, Search } from '@element-plus/icons'
// import { Edit, Delete, Search } from '@element-plus/icons-vue'
import { ajax } from '@/utils/ajax'

export default {
  name: 'Destination',
  methods: {
    // 变更页码
    currentChange (pageNum) {
      this.currentPage = pageNum
      console.log('current page: ', this.currentPage)
    },
    // 渲染权限
    renderPermission () {
      for (const item of this.currentUserPermission) {
        // console.log('item: ', item)
        if (item.MenuUID === parseInt(this.$refs.destPageRef.id)) {
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
    isAdmin () {
      if (this.nameid === 'supervisor') {
        this.isEnableAdd = true
        this.isEnableRemove = true
        this.isEnableModify = true
        this.isEnableQuery = true
      }
    },
    // 獲取目的地列表
    getDestList () {
      this.loading = true
      ajax.get('/api/BasicData/dest', {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(({ data }) => {
        this.destList = data.reverse()
        this.loading = false
        console.log('dest list: ', this.destList)
      }).catch(err => {
        console.log('dest err: ', err)
        this.loading = false
        this.$message.error('獲取目的地列表失敗，請刷新重試')
      })
    },
    // 删除目的地
    async removeDestById (id) {
      console.log(id)
      const confirmResult = await this.$confirm('此操作將永久删除該目的地, 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.success('已取消刪除')
      }
      this.loading = true
      // 刪除目的地請求
      ajax.delete('/api/BasicData/dest',
        {
          data: {
            UID: id
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + this.token
          }
        }).then(({ data }) => {
        // console.log(res)
        this.loading = false
        const res = data
        if (res.slice(0, 5) === 'Error') {
          return this.$message.error(res.slice(6))
        }
        if (res === 'OK') this.$message.success('刪除成功')
        setTimeout(() => {
          this.getDestList()
        }, 3000)
      }).catch(err => {
        console.log('loader err: ', err)
        this.loading = false
        this.addDialogVisible = false
        setTimeout(() => {
          this.$message.error('刪除失敗，請再重試一次')
        }, 3000)
      })
    },
    // 修改目的地对话框
    showEditDialogVisible (row) {
      this.editDialogVisible = true
      this.editForm = row
      this.destUid = row.UID
      this.getDestList()
    },
    editDialogClosed () {
      // eslint-disable-next-line dot-notation
      this.$refs['editFormRef'].resetFields()
    },
    // 修改目的地
    editDest () {
      // eslint-disable-next-line dot-notation
      this.$refs['editFormRef'].validate(valid => {
        if (!valid) return false
        this.editDialogVisible = false
        this.loading = true
        // 修改目的地請求
        ajax.put('/api/BasicData/dest',
          {
            UID: this.editForm.UID,
            dest: this.editForm.代碼
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }).then(({ data }) => {
          this.loading = false
          const res = data
          // console.log(res)
          if (res.slice(0, 5) === 'Error') {
            return this.$message.error(res.slice(6))
          }
          if (res === 'OK') this.$message.success('修改成功')
          setTimeout(() => {
            this.getDestList()
          }, 3000)
        }).catch(err => {
          console.log('dest err: ', err)
          this.loading = false
          this.editDialogVisible = false
          setTimeout(() => {
            this.$message.error('修改失敗，請再重試一次')
          }, 3000)
        })
      })
    },
    // 新增目的地
    addDest () {
      // eslint-disable-next-line dot-notation
      this.$refs['addFormRef'].validate(valid => {
        if (!valid) return false
        this.addDialogVisible = false
        this.loading = true
        ajax.post('/api/BasicData/dest',
          {
            dest: this.addForm.dest_code
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }).then(({ data }) => {
          // console.log(res)
          this.loading = false
          const res = data
          if (res.slice(0, 5) === 'Error') {
            return this.$message.error(res.slice(6))
          }
          if (res === 'OK') this.$message.success('新增成功')
          setTimeout(() => {
            this.getDestList()
          }, 3000)
        }).catch(err => {
          console.log('dest err: ', err)
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
    handleSizeChange () {}
  },
  computed: {
    // 分页total
    total () {
      return this.destList.length
    },
    // 分页列表
    pageList: {
      get () {
        return this.destList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    }
  },
  data () {
    return {
      // 当前页的页码
      currentPage: 1,
      // 每页的笔数
      pageSize: 10,
      destUid: 0,
      loading: false,
      // currentPage: 1,
      searchValue: '',
      // edit: Edit,
      // del: Delete,
      // search: Search,
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        dest_code: ''
      },
      addFormRules: {
        dest_code: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ]
      },
      editFormRules: {
        代碼: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ]
      },
      editForm: {},
      destList: [],
      currentUserPermission: [],
      isEnableAdd: 0,
      isEnableRemove: 0,
      isEnableModify: 0,
      isEnableQuery: 0
    }
  },
  mounted () {
    this.token = window.localStorage.getItem('token')
    this.nameid = window.localStorage.getItem('nameid')
    this.getDestList()
    this.isAdmin()
    this.getCurrentUserPermission()
  },
  watch: {
    $route () {
      // if (this.$route.fullPath !== '/user-manager/') this.show = false
    }
  }
}
</script>

<style lang="scss">

.destination-container {
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
