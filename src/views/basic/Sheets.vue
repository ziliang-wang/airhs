<template>
  <div class="sheets-container" id="8" ref="sheetsPageRef" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="8">
        <span v-if="isEnableQuery">
          <el-input class="searchInput" type="text" placeholder="主單號開頭" v-model.trim="searchValue" @input="input" clearable @clear="reget">
            <template #append>
              <el-button class="searchBtn" @click="search">查詢</el-button>
            </template>
          </el-input>
        </span>
        <span v-else>
          <el-input disabled title="您沒有查詢權限" class="searchInput" type="text" placeholder="主單號開頭" v-model.trim="searchValue" @input="input" clearable @clear="reget">
            <template #append>
              <el-button disabled title="您沒有查詢權限" class="searchBtn" @click="search">查詢</el-button>
            </template>
          </el-input>
        </span>
      </el-col>
      <el-col :span="4">
        <span v-if="isEnableAdd">
          <el-button type="primary" @click="addDialogVisible = true">新增主單號類型</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有新增權限" type="primary" @click="addDialogVisible = true">新增主單號</el-button>
        </span>
      </el-col>
      <!-- <el-col :span="12">
        <el-input></el-input>
      </el-col> -->
    </el-row>
    <el-table :data="pageList" stripe>
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column label="主單號開頭" prop="代碼"></el-table-column>
        <el-table-column label="航空公司" prop="名稱"></el-table-column>
        <el-table-column label="航班號碼開頭" prop="航班號碼開頭"></el-table-column>
        <el-table-column label="訂倉主號回收" prop="訂倉主號回收"></el-table-column>
        <!-- <el-table-column label="電話" prop="tel"></el-table-column>
        <el-table-column label="信箱" prop="mail"></el-table-column>
        <el-table-column label="運輸公司" prop="logistics_company"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column> -->
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <!-- 修改按鈕 -->
            <span v-if="isEnableModify">
              <el-button type="primary" icon="el-icon-edit" class="operator" @click="showEditDialogVisible(scope.row.代碼)"></el-button>
            </span>
            <span v-else>
              <el-button disabled title="您沒有編輯權限" type="primary" icon="el-icon-edit" class="operator" @click="showEditDialogVisible(scope.row.代碼)"></el-button>
            </span>
            <!-- 刪除按鈕 -->
            <span v-if="isEnableRemove">
              <el-button type="danger" icon="el-icon-delete" class="operator" @click="removeSheetById(scope.row.UID)"></el-button>
            </span>
            <span v-else>
              <el-button disabled title="您沒有刪除權限" type="danger" icon="el-icon-delete" class="operator" @click="removeSheetById(scope.row.UID)"></el-button>
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
    <!-- 新增主單號類型 -->
    <el-dialog
      title="新增主單號類型"
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
        <el-form-item label="主單號開頭" prop="main_num">
          <el-input v-model.trim="addForm.main_num"></el-input>
        </el-form-item>
        <el-form-item label="航空公司" prop="main_airline">
          <el-input v-model.trim="addForm.main_airline"></el-input>
        </el-form-item>
        <el-form-item label="航班號碼開頭" prop="main_flight">
          <el-input v-model.trim="addForm.main_flight"></el-input>
        </el-form-item>
        <el-form-item label="訂倉主號回收" prop="main_bkrc">
          <el-input v-model.trim.number="addForm.main_bkrc" placeholder="請輸入數字"></el-input>
        </el-form-item>
        <!-- <el-form-item label="電話" prop="tel">
          <el-input v-model.trim="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="信箱" prop="mail">
          <el-input v-model.trim="addForm.fullname"></el-input>
        </el-form-item>
        <el-form-item label="運輸公司" prop="logistics_company">
          <el-input v-model.trim="addForm.fullname"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model.trim="addForm.fullname"></el-input>
        </el-form-item> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSheet">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改主單號 -->
    <el-dialog
      title="修改主單號"
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
        <el-form-item label="主單號開頭" prop="代碼">
          <el-input v-model.trim="editForm.代碼"></el-input>
        </el-form-item>
        <el-form-item label="航空公司" prop="名稱">
          <el-input v-model.trim="editForm.名稱"></el-input>
        </el-form-item>
        <el-form-item label="航班號碼開頭" prop="航班號碼開頭">
          <el-input v-model.trim="editForm.航班號碼開頭"></el-input>
        </el-form-item>
        <el-form-item label="訂倉主號回收" prop="訂倉主號回收">
          <el-input v-model.trim="editForm.訂倉主號回收"></el-input>
        </el-form-item>
        <!-- <el-form-item label="電話" prop="tel">
          <el-input v-model.trim="editForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="信箱" prop="mail">
          <el-input v-model.trim="editForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="運輸公司" prop="logistics_company">
          <el-input v-model.trim="editForm.logistics_company"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model.trim="editForm.address"></el-input>
        </el-form-item> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="editSheet">确 定</el-button>
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
  // 主單號類型
  name: 'Sheets',
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
        if (item.MenuUID === parseInt(this.$refs.sheetsPageRef.id)) {
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
    // 搜索/查詢主單號
    search () {
      if (this.searchValue === '') return
      // 查詢get請求
      this.loading = true
      ajax.get('/api/BasicData/mwb', {
        params: {
          mwbCode: this.searchValue
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(res => {
        console.log('sheet res: ', res)
        this.loading = false
        this.sheetList = res.data
      }).catch(err => {
        console.log('sheet err: ', err)
        this.loading = false
      })
    },
    // 查詢搜索的clear
    reget () {
      this.getSheetList()
    },
    // 獲取主單號列表
    getSheetList () {
      this.loading = true
      ajax.get('/api/BasicData/mwb', {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(({ data }) => {
        this.sheetList = data.reverse()
        this.loading = false
        console.log('sheet list: ', this.sheetList)
      }).catch(err => {
        console.log('sheet err: ', err)
        this.loading = false
        this.$message.error('獲取主單號列表失敗，請刷新重試')
      })
    },
    // 刪除主單號
    async removeSheetById (id) {
      // console.log(id)
      const confirmResult = await this.$confirm('此操作將永久删除該主單號, 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.success('已取消刪除')
      }
      this.loading = true
      // todo 刪除主單號請求
      ajax.delete('/api/BasicData/mwb',
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
          this.getSheetList()
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
    // 修改主單號對話框
    showEditDialogVisible (code) {
      ajax.get('/api/BasicData/mwb', {
        params: {
          mwbCode: code
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(res => {
        console.log(res)
        this.editForm = res.data[0]
        this.editDialogVisible = true
      }).catch(err => {
        console.log('edit err: ', err)
      })
    },
    editDialogClosed () {
      // eslint-disable-next-line dot-notation
      this.$refs['editFormRef'].resetFields()
    },
    // 修改主單號
    editSheet () {
      // console.log(this.$refs.editFormRef)
      // eslint-disable-next-line dot-notation
      this.$refs['editFormRef'].validate(valid => {
        if (!valid) return false
        this.editDialogVisible = false
        this.loading = true
        // 修改主單號請求
        ajax.put('/api/BasicData/mwb',
          {
            UID: this.editForm.UID,
            mwbCode: this.editForm.代碼,
            name: this.editForm.名稱,
            filghtCode: this.editForm.航班號碼開頭,
            bkrc: this.editForm.訂倉主號回收
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
            this.getSheetList()
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
    // 新增主單號類型
    addSheet () {
      // eslint-disable-next-line dot-notation
      this.$refs['addFormRef'].validate(valid => {
        if (!valid) return false
        this.addDialogVisible = false
        this.loading = true
        ajax.post('/api/BasicData/mwb',
          {
            mwbCode: this.addForm.main_num,
            name: this.addForm.main_airline,
            filghtCode: this.addForm.main_flight,
            bkrc: this.addForm.main_bkrc
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
            this.getSheetList()
          }, 3000)
        }).catch(err => {
          console.log('sheet err: ', err)
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
    // fmt
    fmtSheetList () {
      const dataList = []
      for (const item of this.sheetList) {
        if (item.代碼 === 'All') {
          continue
        }
        const data = {
          UID: item.UID,
          代碼: item.代碼,
          名稱: item.名稱,
          航班號碼開頭: item.航班號碼開頭,
          訂倉主號回收: item.訂倉主號回收
        }
        dataList.push(data)
      }
      return dataList
    },
    // 分页total
    total () {
      return this.fmtSheetList.length
    },
    // 分页列表
    pageList: {
      get () {
        return this.fmtSheetList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    }
  },
  data () {
    // 自定義驗證
    const checkBkrc = (rule, value, callback) => {
      if (isNaN(value)) {
        callback(new Error('請輸入數字'))
      } else {
        callback()
      }
    }
    return {
      // 当前页的页码
      currentPage: 1,
      // 每页的笔数
      pageSize: 10,
      // currentPage: 1,
      searchValue: '',
      // edit: Edit,
      // del: Delete,
      // search: Search,
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        main_num: '',
        main_airline: '',
        main_flight: '',
        main_bkrc: ''
      },
      addFormRules: {
        main_num: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ],
        main_airline: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ],
        main_flight: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ],
        main_bkrc: [
          { required: false, message: '不得為空', trigger: 'blur' },
          { validator: checkBkrc, trigger: 'blur' }
        ]
      },
      editFormRules: {
        代碼: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        名稱: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        航班號碼開頭: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        訂倉主號回收: [
          { required: true, message: '不得為空', trigger: 'blur' },
          { validator: checkBkrc, trigger: 'blur' }
        ]
      },
      editForm: {},
      sheetList: [],
      loading: false,
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
    this.getSheetList()
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

.sheets-container {
  padding: 10px;
  .searchBtn {
    font-size: 16px;
    border-radius: 0 2px 2px 0;
  }
  .operator {
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
