<template>
  <div class="addmain-container" id="17" ref="addmainPageRef" v-loading="loading">
    <el-row>
      <el-col :span="14">
        <el-tag>主單號剩餘數量</el-tag>
        <table width="100%">
          <tr class="rest-row">
            <th>主單號類型</th>
            <th>剩餘數量</th>
          </tr>
          <tr class="rest-row" v-for="(value, key, index) in restData" :key="index">
            <td>{{ key }}</td>
            <td>{{ value }}</td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <!-- 单笔新增 -->
    <el-row>
      <!-- 新增 -->
      <el-col :span="14">
        <el-tag>單筆新增</el-tag>
        <el-form :inline="true" :model="form1" :rules="addOneRules" ref="addOneRef">
          <el-form-item label="主單號" prop="singleValue">
            <el-input v-model.trim="form1.singleValue" placeholder="請輸入主單號"></el-input>
          </el-form-item>
          <el-form-item>
            <span v-if="isEnableAdd">
              <el-button type="primary" class="addBtn" @click="addOne">新增</el-button>
            </span>
            <span v-else>
              <el-button disabled title="您沒有新增權限" type="primary" class="addBtn" @click="addOne">新增</el-button>
            </span>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
      </el-col>
    </el-row>
     <!-- 批次新增一 -->
    <el-row>
      <el-col :span="14">
        <el-tag>批次新增一</el-tag>
        <el-form :inline="true" :model="form2" :rules="form2Rules" ref="form2Ref">
          <el-form-item label="起號" prop="batchValue1Start">
            <el-input v-model.trim="form2.batchValue1Start" placeholder="請輸入起號"></el-input>
          </el-form-item>
          <el-form-item label="迄號" prop="batchValue1End">
            <el-input v-model.trim="form2.batchValue1End" placeholder="請輸入迄號"></el-input>
          </el-form-item>
          <el-form-item>
            <span v-if="isEnableAdd">
              <el-button type="primary" class="addBtn" @click="batch1">新增</el-button>
            </span>
            <span v-else>
              <el-button disabled title="您沒有新增權限" type="primary" class="addBtn" @click="batch1">新增</el-button>
            </span>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
      </el-col>
    </el-row>
     <!-- 批次新增二 -->
    <el-row>
      <el-col :span="14">
        <el-tag>批次新增二</el-tag>
        <el-form :inline="true" :model="form3" :rules="form3Rules" ref="form3Ref">
          <el-form-item label="起號" prop="batchValue2Start">
            <el-input v-model.trim="form3.batchValue2Start" placeholder="請輸入起號"></el-input>
          </el-form-item>
          <el-form-item label="數量" prop="batchValue2Num">
            <el-input v-model.trim="form3.batchValue2Num" placeholder="請輸入數量"></el-input>
          </el-form-item>
          <el-form-item>
            <span v-if="isEnableAdd">
              <el-button type="primary" class="addBtn" @click="batch2">新增</el-button>
            </span>
            <span v-else>
              <el-button disabled title="您沒有新增權限" type="primary" class="addBtn" @click="batch2">新增</el-button>
            </span>
          </el-form-item>
        </el-form>
        <!-- <el-divider></el-divider> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ajax } from '@/utils/ajax'

export default {
  name: 'AddMain',
  computed: {
    // 主單號類型對應航空公司/航班號碼開頭
    airOptions () {
      const dataList = []
      for (const item of this.sheetList) {
        const data = {
          mawbKind: item.代碼,
          airline: item.名稱
          // startWithFlight: item.航班號碼開頭
        }
        dataList.push(data)
      }
      return dataList
    }
  },
  methods: {
    // 渲染权限
    renderPermission () {
      for (const item of this.currentUserPermission) {
        // console.log('item: ', item)
        if (item.MenuUID === parseInt(this.$refs.addmainPageRef.id)) {
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
    // 獲取主號剩餘
    getMainSheetRest () {
      this.loading = true
      ajax.get('/api/Mawb/lave', {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(res => {
        this.loading = false
        this.restData = res.data[0]
        console.log('rest data: ', this.restData)
      }).catch(err => {
        this.loading = false
        console.log('err: ', err)
      })
    },
    // 批次新增2
    batch2 () {
      this.$refs.form3Ref.validate(valid => {
        if (!valid) return false
        // 批次新增2請求
        this.loading = true
        ajax.post('/api/Mawb/addnew',
          {
            startNum: this.form3.batchValue2Start,
            // endNum: '',
            count: this.form3.batchValue2Num
            // mawbNo: ''
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }
        ).then(res => {
          this.loading = false
          console.log('batch2 res: ', res)
          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(`${res.data.slice(6)}`)
          }
          this.$message.success('新增成功')
        }).catch(err => {
          this.loading = false
          console.log('batch2 err: ', err)
        })
      })
    },
    // 批次新增1
    batch1 () {
      this.$refs.form2Ref.validate(valid => {
        if (!valid) return false
        // 批次新增1請求
        this.loading = true
        ajax.post('/api/Mawb/addnew',
          {
            startNum: this.form2.batchValue1Start,
            endNum: this.form2.batchValue1End
            // count: 0,
            // mawbNo: ''
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }
        ).then(res => {
          this.loading = false
          console.log('batch1 res: ', res)
          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(`${res.data.slice(6)}`)
          }
          console.log(res.data)
          this.$message.success('新增成功')
          this.getMainSheetRest()
        }).catch(err => {
          this.loading = false
          console.log('batch1 err: ', err)
        })
      })
    },
    // 單筆新增
    addOne () {
      this.$refs.addOneRef.validate(valid => {
        if (!valid) return false
        // 單筆新增請求
        this.loading = true
        ajax.post('/api/Mawb/addnew',
          {
            // startNum: null,
            // endNum: null,
            // count: null,
            mawbNo: this.form1.singleValue
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }
        ).then(res => {
          this.loading = false
          console.log('single res: ', res)
          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(`${res.data.slice(6)}`)
          }
          this.$message.success('新增成功')
          this.getMainSheetRest()
        }).catch(err => {
          this.loading = false
          console.log('single err: ', err)
        })
      })
    },
    // 獲取主單號類型/航空公司/航班號碼開頭
    getSheetList () {
      this.loading = true
      ajax.get('/api/BasicData/mwb', {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(({ data }) => {
        this.loading = false
        this.sheetList = data.reverse()
        console.log('sheet list: ', this.sheetList)
      }).catch(err => {
        this.loading = false
        console.log('sheet err: ', err)
        this.$message.error('獲取主單號列表失敗，請刷新重試')
      })
    }
  },
  data () {
    const chkNum = (rule, value, callback) => {
      if (value <= 0) {
        return callback(new Error('數量不得為0或空'))
      } else if (isNaN(value)) {
        return callback(new Error('請輸入數字'))
      }
      callback()
    }
    const chkSingleValue = (rule, value, callback) => {
      if (value.length === 12 && value.indexOf('-') > 0) {
        return callback()
      }
      callback(new Error('主單號格式錯誤'))
    }
    return {
      sheetList: [],
      // 批次新增2
      restData: {},
      form3Rules: {
        batchValue2Start: [
          { validator: chkSingleValue, trigger: 'blur' }
        ],
        batchValue2Num: [
          { validator: chkNum, trigger: 'blur' }
        ]
      },
      // 批次新增1
      form2Rules: {
        batchValue1Start: [
          { validator: chkSingleValue, trigger: 'blur' }
        ],
        batchValue1End: [
          { validator: chkSingleValue, trigger: 'blur' }
        ]
      },
      // 單筆新增
      addOneRules: {
        singleValue: [
          { validator: chkSingleValue, trigger: 'blur' }
        ]
      },
      form1: {
        singleValue: ''
      },
      form2: {
        batchValue1Start: '',
        batchValue1End: ''
      },
      form3: {
        batchValue2Start: '',
        batchValue2Num: ''
      },
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
    this.getMainSheetRest()
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
.addmain-container {
  padding-bottom: 20px;
  .el-row:first-of-type {
    margin-bottom: 20px;
  }
 .el-tag {
   font-size: 20px;
   margin-bottom: 10px;
 }
 .rest-row {
   font-size: 18px;
   height: 50px;
   border-bottom: 1px solid #dcdfe6;
 }

 .rest-row:last-of-type {
   border-bottom: none;
 }
}
</style>
