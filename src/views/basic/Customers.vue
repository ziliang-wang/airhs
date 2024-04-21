<template>
  <div class="customers-container" id="6" ref="customersPageRef" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="8">
        <span v-if="isEnableQuery">
          <el-input class="searchInput" type="text" placeholder="客戶名稱" v-model.trim="searchValue" @input="input" clearable @clear="reget">
            <template #append>
              <el-button class="searchBtn" @click="search">查詢</el-button>
            </template>
          </el-input>
        </span>
        <span v-else>
          <el-input disabled title="您沒有查詢權限" class="searchInput" type="text" placeholder="客戶名稱" v-model.trim="searchValue" @input="input" clearable @clear="reget">
            <template #append>
              <el-button disabled title="您沒有查詢權限" class="searchBtn" @click="search">查詢</el-button>
            </template>
          </el-input>
        </span>
      </el-col>
      <el-col :span="4">
        <span v-if="isEnableAdd">
          <el-button type="primary" @click="addDialogVisible = true">新增客户</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有新增權限" type="primary" @click="addDialogVisible = true">新增客户</el-button>
        </span>
      </el-col>
      <!-- <el-col :span="12">
        <el-input></el-input>
      </el-col> -->
    </el-row>
    <el-table :data="pageList" stripe>
        <!-- <el-table-column type="index" label="#"></el-table-column> -->
        <el-table-column label="客戶名稱" prop="客戶名稱"></el-table-column>
        <el-table-column label="客戶簡稱" prop="客戶簡稱"></el-table-column>
        <el-table-column label="連絡人" prop="連絡人"></el-table-column>
        <el-table-column label="電話" prop="電話"></el-table-column>
        <el-table-column label="信箱" prop="Email"></el-table-column>
        <el-table-column label="運輸公司" prop="運輸公司"></el-table-column>
        <el-table-column label="地址" prop="地址"></el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <!-- 修改按鈕 -->
            <span v-if="isEnableModify">
              <el-button type="primary" icon="el-icon-edit" class="operator" @click="showEditDialogVisible(scope.row.客戶代號)"></el-button>
            </span>
            <span v-else>
              <el-button disabled title="您沒有編輯權限" type="primary" icon="el-icon-edit" class="operator" @click="showEditDialogVisible(scope.row.客戶代號)"></el-button>
            </span>
            <!-- 刪除按鈕 -->
            <span v-if="isEnableRemove">
              <el-button type="danger" icon="el-icon-delete" class="operator" @click="removeCustomerById(scope.row.客戶代號)"></el-button>
            </span>
            <span v-else>
              <el-button disabled title="您沒有刪除權限" type="danger" icon="el-icon-delete" class="operator" @click="removeCustomerById(scope.row.客戶代號)"></el-button>
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
    <!-- 新增客户 -->
    <el-dialog
      title="新增客户"
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
        <el-form-item label="客戶名稱" prop="cus_name">
          <el-input v-model.trim="addForm.cus_name"></el-input>
        </el-form-item>
        <el-form-item label="客戶簡稱" prop="cus_alias_name">
          <el-input v-model.trim="addForm.cus_alias_name"></el-input>
        </el-form-item>
        <el-form-item label="連絡人" prop="contactor">
          <el-input v-model.trim="addForm.contactor"></el-input>
        </el-form-item>
        <el-form-item label="電話" prop="tel">
          <el-input v-model.trim="addForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="信箱" prop="mail">
          <el-input v-model.trim="addForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="運輸公司" prop="logistics_company">
          <el-input v-model.trim="addForm.logistics_company"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model.trim="addForm.address"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCustomer">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改客戶 -->
    <el-dialog
      title="修改客户"
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
        <el-form-item label="客戶名稱" prop="客戶名稱">
          <el-input v-model.trim="editForm.客戶名稱"></el-input>
        </el-form-item>
        <el-form-item label="客戶簡稱" prop="客戶簡稱">
          <el-input v-model.trim="editForm.客戶簡稱"></el-input>
        </el-form-item>
        <el-form-item label="連絡人" prop="連絡人">
          <el-input v-model.trim="editForm.連絡人"></el-input>
        </el-form-item>
        <el-form-item label="電話" prop="電話">
          <el-input v-model.trim="editForm.電話"></el-input>
        </el-form-item>
        <el-form-item label="信箱" prop="Email">
          <el-input v-model.trim="editForm.Email"></el-input>
        </el-form-item>
        <el-form-item label="運輸公司" prop="運輸公司">
          <el-input v-model.trim="editForm.運輸公司"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="地址">
          <el-input v-model.trim="editForm.地址"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="editCustomer">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ajax } from '@/utils/ajax'

export default {
  name: 'Customers',
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
        if (item.MenuUID === parseInt(this.$refs.customersPageRef.id)) {
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
    // 獲取客戶列表
    getCustomerList () {
      this.loading = true
      ajax.get('/api/BasicData/custom', {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(({ data }) => {
        this.customerList = data.reverse()
        this.loading = false
        console.log('customer list: ', this.customerList)
      }).catch(err => {
        console.log('customer err: ', err)
        this.loading = false
        this.$message.error('獲取客戶列表失敗，請刷新重試')
      })
    },
    // 搜索/查詢客戶
    search () {
      if (this.searchValue === '') return
      // 查詢get請求
      this.loading = true
      ajax.get('/api/BasicData/custom', {
        params: {
          customCode: this.searchValue
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(res => {
        this.loading = false
        console.log('search res: ', res)
        this.customerList = res.data
      }).catch(err => {
        this.loading = false
        console.log('search err: ', err)
      })
    },
    // 查詢搜索的clear
    reget () {
      this.getCustomerList()
    },
    // 刪除客戶
    async removeCustomerById (customCode) {
      // console.log(customCode)
      const confirmResult = await this.$confirm('此操作將永久删除該客户, 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.success('已取消刪除')
      }
      this.loading = true
      // todo 刪除客戶請求
      ajax.delete('/api/BasicData/custom',
        {
          data: {
            customCode: customCode
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
          this.getCustomerList()
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
    // 修改客戶對話框
    showEditDialogVisible (customCode) {
      // console.log(customCode)
      // this.editDialogVisible = true
      ajax.get('/api/BasicData/custom', {
        params: {
          customCode: customCode
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(res => {
        // console.log(res)
        console.log(res)
        this.editForm = res.data[0]
        // console.log(this.editForm.客戶名稱)
        // this.editForm.Password = ''
        // 禁止非supervisor修改supervisor
        // if (this.editForm.Account === 'supervisor' && this.nameid !== 'supervisor') {
        //   this.$message.warning('禁止修改supervisor')
        //   return
        // }
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
    // 修改客戶
    editCustomer () {
      // console.log(this.$refs.editFormRef)
      // eslint-disable-next-line dot-notation
      this.$refs['editFormRef'].validate(valid => {
        if (!valid) return false
        this.editDialogVisible = false
        this.loading = true
        // 修改客戶請求
        ajax.put('/api/BasicData/custom',
          {
            customCode: this.editForm.客戶代號,
            JSON: JSON.stringify(
              {
                客戶名稱: this.editForm.客戶名稱,
                客戶簡稱: this.editForm.客戶簡稱,
                連絡人: this.editForm.連絡人,
                電話: this.editForm.電話,
                Email: this.editForm.Email,
                運輸公司: this.editForm.運輸公司,
                地址: this.editForm.地址
              }
            )
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
            this.getCustomerList()
          }, 3000)
        }).catch(err => {
          console.log('customer err: ', err)
          this.loading = false
          this.editDialogVisible = false
          setTimeout(() => {
            this.$message.error('修改失敗，請再重試一次')
          }, 3000)
        })
      })
    },
    // 新增客戶
    addCustomer () {
      // eslint-disable-next-line dot-notation
      this.$refs['addFormRef'].validate(valid => {
        if (!valid) return
        this.addDialogVisible = false
        this.loading = true
        ajax.post('/api/BasicData/custom',
          {
            JSON: JSON.stringify(
              {
                客戶名稱: this.addForm.cus_name,
                客戶簡稱: this.addForm.cus_alias_name,
                連絡人: this.addForm.contactor,
                電話: this.addForm.tel,
                Email: this.addForm.mail,
                運輸公司: this.addForm.logistics_company,
                地址: this.addForm.address
              }
            )
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
          if (res === 'OK') this.$message.success('新增成功')
          setTimeout(() => {
            this.getCustomerList()
          }, 3000)
        }).catch(err => {
          console.log('customer err: ', err)
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
    handleSizeChange () {
    }
  },
  computed: {
    // fmtCustList () {
    //   return this.customerList
    // },
    // 分页total
    total () {
      return this.customerList.length
    },
    // 分页列表
    pageList: {
      get () {
        return this.customerList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    }
  },
  data () {
    return {
      // 当前页的页码
      currentPage: 1,
      // 每页的笔数
      pageSize: 10,
      newCustList: [],
      // currentPage: 1,
      searchValue: '',
      // edit: Edit,
      // del: Delete,
      // search: Search,
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        cus_name: '',
        cus_alias_name: '',
        contactor: '',
        tel: '',
        mail: '',
        logistics_company: '',
        address: ''
      },
      addFormRules: {
        cus_name: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        cus_alias_name: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        contactor: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        mail: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ],
        logistics_company: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ],
        address: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ]
      },
      editFormRules: {
        客戶名稱: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        客戶簡稱: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        連絡人: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        電話: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        Email: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ],
        運輸公司: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ],
        地址: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ]
      },
      editForm: {},
      customerList: [],
      loading: false,
      token: '',
      nameid: '',
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
    this.getCustomerList()
    this.isAdmin()
    this.getCurrentUserPermission()
    // if (this.$route.fullPath !== '/user-manager/') this.show = false
  },
  watch: {
    $route () {
      // if (this.$route.fullPath !== '/user-manager/') this.show = false
    }
  }
}
</script>

<style lang="scss">

.customers-container {
  // height: 200%;
  // padding: 10px;
  // background-color: orange;
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
    padding-bottom: 10px;
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
