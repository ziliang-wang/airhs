<template>
  <div class="flights-container" id="9" ref="flightsPageRef">
    <el-row :gutter="0" v-loading="loading">
      <!-- 汇入excel -->
      <el-col :span="6" :offset="0">
        <!-- 上傳excel -->
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/"
          accept=".xls,.xlsx"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :multiple="false"
        >
          <template #trigger>
            <span v-if="isEnableAdd">
              <el-button size="medium" type="primary">選取Excel檔案</el-button>
            </span>
            <span v-else>
              <el-button disabled title="您沒有匯入權限" size="medium" type="primary">選取Excel檔案</el-button>
            </span>
          </template>
          <span style="font-weight: bold;">&nbsp;&nbsp;=></span>
          <span v-if="isUpload">
            <el-button
              style="margin-left: 10px;"
              size="medium"
              type="success"
              @click="impExcel"
            >匯入
            </el-button>
          </span>
          <span v-else>
            <el-button
              disabled
              style="margin-left: 10px;"
              size="medium"
              type="success"
            >匯入
            </el-button>
          </span>
          <template #tip>
            <div class="el-upload__tip">只能選取一個Excel檔案，且不超过 10M</div>
          </template>
        </el-upload>
        <!-- // 上傳excel -->
      </el-col>
      <!-- // 汇入excel -->
      <el-col :span="8" :offset="0">
        <span v-if="isEnableQuery">
          <el-date-picker
            v-model.trim="searchValue"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="選擇日期"
          >
          </el-date-picker>
          <el-button class="searchBtn" @click="search">查詢</el-button>
        </span>
        <span v-else>
          <el-date-picker
            disabled
            v-model.trim="searchValue"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="選擇日期"
          >
          </el-date-picker>
          <el-button class="searchBtn" @click="search">查詢</el-button>
        </span>
        <!-- <span v-if="isEnableQuery">
          <el-input class="searchInput" type="text" placeholder="航班日期，如2022-02-20" v-model="searchValue" @input="input" clearable @clear="reget">
            <template #append>
              <el-button class="searchBtn" @click="search">查詢</el-button>
            </template>
          </el-input>
        </span> -->
        <!-- <span v-else>
          <el-input disabled title="您沒有查詢權限" class="searchInput" type="text" placeholder="航班日期，如2022-02-20" v-model="searchValue" @input="input" clearable @clear="reget">
            <template #append>
              <el-button disabled title="您沒有查詢權限" class="searchBtn" @click="search">查詢</el-button>
            </template>
          </el-input>
        </span> -->
      </el-col>
      <!-- 單筆新增 -->
      <el-col :span="3">
        <span v-if="isEnableAdd">
          <el-button type="primary" @click="addDialogVisible = true" style="width: 90%">單筆新增</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有新增權限" type="primary" @click="addDialogVisible = true" style="width: 90%">單筆新增</el-button>
        </span>
      </el-col>
      <!-- 批次新增 -->
      <el-col :span="3">
        <span v-if="isEnableAdd">
          <el-button type="primary" @click="addBatchDialogVisible = true" style="width: 90%">批次新增</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有新增權限" type="primary" @click="addBatchDialogVisible = true" style="width: 90%">批次新增</el-button>
        </span>
      </el-col>
    </el-row>
    <!-- <p>{{ fmtFlightList }}</p> -->
    <!-- <p>{{ weekDay }}</p> -->
    <el-table :data="pageList" stripe>
        <!-- <el-table-column type="index"></el-table-column> -->
        <!-- <el-table-column label="ID" prop="UID"></el-table-column> -->
        <el-table-column label="日期" prop="日期"></el-table-column>
        <!-- <el-table-column label="星期" prop="星期"></el-table-column> -->
        <el-table-column label="主單號類型" prop="主單號類型"></el-table-column>
        <el-table-column label="航班" prop="航班號碼"></el-table-column>
        <el-table-column label="起飛時間" prop="起飛時間"></el-table-column>
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
              <el-button type="danger" icon="el-icon-delete" class="operator" @click="removeFlightById(scope.row.UID)"></el-button>
            </span>
            <span v-else>
              <el-button disabled title="您沒有刪除權限" type="danger" icon="el-icon-delete" class="operator" @click="removeFlightById(scope.row.UID)"></el-button>
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
    <!-- 單筆新增班機 -->
    <el-dialog
      title="單筆新增班機"
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
        <el-form-item label="日期" prop="flight_date">
          <el-date-picker
            v-model.trim="addForm.flight_date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="請選擇日期"
          >
          </el-date-picker>
          <!-- <el-input v-model.trim="addForm.flight_date" placeholder="請輸入日期，如: 2022-02-20"></el-input> -->
          <!-- <el-date-picker type="date" placeholder="請選擇日期" v-model.trim="addForm.flight_date" style="width: 100%"></el-date-picker> -->
        </el-form-item>
        <!-- <el-form-item label="星期" prop="flight_weekday">
          <el-input v-model.trim="addForm.flight_weekday"></el-input>
        </el-form-item> -->
        <el-form-item label="主單號類型" prop="main_category">
          <el-input v-model.trim="addForm.main_category"></el-input>
        </el-form-item>
        <el-form-item label="航班" prop="flight">
          <el-input v-model="addForm.flight"></el-input>
        </el-form-item>
        <el-form-item label="起飛時間" prop="flight_takeoff">
          <!-- <el-time-select
            v-model="addForm.flight_takeoff"
            :picker-options="{
              start: '00:00',
              step: '00:01',
              end: '23:59'
            }"
            placeholder="請輸入起飛時間"
            value-format="HH:mm"
          >
          </el-time-select> -->
          <el-time-picker
            v-model="addForm.flight_takeoff"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            value-format="HH:mm"
            placeholder="請選擇起飛時間">
          </el-time-picker>
          <!-- <el-input v-model.trim="addForm.flight_takeoff" placeholder="請輸入起飛時間，如: 15:20"></el-input> -->
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
          <el-button type="primary" @click="addFlight">確 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 批次新增班機 -->
    <el-dialog
      title="批次新增班機"
      :visible.sync="addBatchDialogVisible"
      width="50%"
      @close="addBatchDialogClosed"
    >
      <el-form
        :model="addBatchForm"
        :rules="addBatchFormRules"
        ref="addBatchFormRef"
        label-width="70px"
      >
        <el-form-item label="日期" prop="flight_dates">
          <el-date-picker
            type="dates"
            v-model.trim="addBatchForm.flight_dates"
            placeholder="批次選擇多個日期，如每周二的日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <!-- <el-date-picker
            v-model.trim="addBatchForm.flight_date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="請選擇日期"
          >
          </el-date-picker> -->
          <!-- <el-input v-model.trim="addForm.flight_date" placeholder="請輸入日期，如: 2022-02-20"></el-input> -->
          <!-- <el-date-picker type="date" placeholder="請選擇日期" v-model.trim="addForm.flight_date" style="width: 100%"></el-date-picker> -->
        </el-form-item>
        <!-- <el-form-item label="星期" prop="flight_weekday">
          <el-input v-model.trim="addForm.flight_weekday"></el-input>
        </el-form-item> -->
        <el-form-item label="主單號類型" prop="main_category">
          <el-input v-model.trim="addBatchForm.main_category"></el-input>
        </el-form-item>
        <el-form-item label="航班" prop="flight">
          <el-input v-model="addBatchForm.flight"></el-input>
        </el-form-item>
        <el-form-item label="起飛時間" prop="flight_takeoff">
          <!-- <el-time-select
            v-model="addForm.flight_takeoff"
            :picker-options="{
              start: '00:00',
              step: '00:01',
              end: '23:59'
            }"
            placeholder="請輸入起飛時間"
            value-format="HH:mm"
          >
          </el-time-select> -->
          <el-time-picker
            v-model="addBatchForm.flight_takeoff"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            value-format="HH:mm"
            placeholder="請選擇起飛時間">
          </el-time-picker>
          <!-- <el-input v-model.trim="addForm.flight_takeoff" placeholder="請輸入起飛時間，如: 15:20"></el-input> -->
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
          <el-button @click="addBatchDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBatchFlight">確 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改班機 -->
    <el-dialog
      title="修改班機資料"
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
        <!-- <el-form-item label="對象UID">
          <el-input v-model.trim="flightUid" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="日期" prop="日期">
          <el-date-picker
            class="dates"
            v-model.trim="editForm.日期"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="請選擇日期"
          >
          </el-date-picker>
          <!-- <el-input v-model.trim="editForm.日期"></el-input> -->
        </el-form-item>
        <!-- <el-form-item label="星期" prop="flight_weekday">
          <el-input v-model.trim="editForm.flight_weekday"></el-input>
        </el-form-item> -->
        <el-form-item label="主單號類型" prop="主單號類型">
          <el-input v-model.trim="editForm.主單號類型"></el-input>
        </el-form-item>
        <el-form-item label="航班" prop="航班號碼">
          <el-input v-model.trim="editForm.航班號碼"></el-input>
        </el-form-item>
        <el-form-item label="起飛時間" prop="起飛時間">
          <el-time-picker
            v-model="editForm.起飛時間"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            value-format="HH:mm"
            placeholder="請選擇起飛時間">
          </el-time-picker>
          <!-- <el-input v-model.trim="editForm.起飛時間"></el-input> -->
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
          <el-button type="primary" @click="editFlight">确 定</el-button>
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
  name: 'Flights',
  computed: {
    // 星期weekday
    weekDay () {
      const weekDayList = ['日', '一', '二', '三', '四', '五', '六']
      const timestamp = Date.now()
      const d = new Date(timestamp)
      const weekDay = d.getDay()
      return '星期' + weekDayList[weekDay]
    },
    // 格式化航班列表
    fmtFlightList () {
      const fmtList = []
      for (const flight of this.flightList) {
        const data = {
          UID: flight.UID,
          主單號類型: flight.主單號類型,
          日期: flight.日期.slice(0, 10),
          航班號碼: flight.航班號碼,
          起飛時間: flight.起飛時間,
          星期: this.weekDay
        }
        fmtList.push(data)
      }
      return fmtList
    },
    // 當前的日期字串
    currentDateString () {
      const timestamp = Date.now()
      const d = new Date(timestamp)
      const date = (d.getFullYear()) + '-' +
      (d.getMonth() + 1) + '-' +
      (d.getDate()) + ' '
      return date
    },
    // 分页total
    total () {
      return this.fmtFlightList.length
    },
    // 分页列表
    pageList: {
      get () {
        return this.fmtFlightList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    }
  },
  methods: {
    // 变更页码
    currentChange (pageNum) {
      this.currentPage = pageNum
      console.log('current page: ', this.currentPage)
    },
    dayEnableMonth () {},
    // date object 轉成 '2022-02-20'
    tranToDateString (date) {
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      if (m < 10) m = '0' + m
      if (d < 10) d = '0' + d
      const dateString = `${y}-${m}-${d}`
      return dateString
    },
    // 渲染权限
    renderPermission () {
      for (const item of this.currentUserPermission) {
        // console.log('item: ', item)
        if (item.MenuUID === parseInt(this.$refs.flightsPageRef.id)) {
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
    // 搜索/查詢班機資料
    search () {
      if (this.searchValue === '') return
      // 查詢get請求
      this.loading = true
      ajax.get('/api/BasicData/flight', {
        params: {
          dd: this.searchValue
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(res => {
        console.log('flight res: ', res)
        this.loading = false
        this.flightList = res.data
      }).catch(err => {
        console.log('flight err: ', err)
        this.loading = false
      })
    },
    // 查詢搜索的clear
    reget () {
      this.getFlightList()
    },
    // 獲取班机列表
    getFlightList () {
      console.log(this.currentDateString)
      this.loading = true
      ajax.get('/api/BasicData/flight', {
        params: {
          dd: this.currentDateString
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(({ data }) => {
        // console.log('flight: ', res)
        this.flightList = data.reverse()
        this.loading = false
        console.log('flight list: ', this.flightList)
      }).catch(err => {
        console.log('flight err: ', err)
        this.loading = false
        this.$message.error('獲取班機列表失敗，請刷新重試')
      })
    },
    // excel轉base64
    getBase64 (file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let res = ''
        reader.readAsDataURL(file.raw)
        reader.onload = function () {
          res = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(res)
        }
      })
    },
    handleChange (file, fileList) {
      this.fileList = [file]
      this.isUpload = true
      // console.log(file)
      // console.log(fileList)
    },
    handleRemove () {
      this.isUpload = false
    },
    // 汇入excel
    async impExcel () {
      const data = await this.getBase64(this.fileList[0])
      const idx = data.indexOf('base64')
      const base64String = data.slice(idx + 7)
      const extName = '.' + this.fileList[0].name.split('.')[this.fileList[0].name.split('.').length - 1]
      this.isUpload = false
      this.fileList = []
      // console.log(data)
      // console.log(base64String)
      // console.log('.' + this.fileList[0].name.split('.')[this.fileList[0].name.split('.').length - 1])
      // todo 調用後端api
      this.loading = true
      ajax.post('/api/BasicData/impflight',
        {
          base64: base64String,
          ext: extName
        },
        {
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + this.token
          }
        }
      ).then(({ data }) => {
        this.loading = false
        console.log(data)
        const res = data
        if (res.slice(0, 5) === 'Error') {
          return this.$message.error(res.slice(6))
        }
        if (res === 'OK') this.$message.success('匯入成功')
        setTimeout(() => {
          this.getFlightList()
        }, 3000)
      }).catch(err => {
        console.log('import err: ', err)
        this.loading = false
        setTimeout(() => {
          this.$message.error('匯入失敗，請再重試一次')
        }, 3000)
      })
    },
    // 刪除班機
    async removeFlightById (id) {
      console.log(id)
      const confirmResult = await this.$confirm('此操作將永久删除該班機, 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.success('已取消刪除')
      }

      this.loading = true
      // todo 刪除班機請求
      ajax.delete('/api/BasicData/flight',
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
          this.getFlightList()
        }, 3000)
      }).catch(err => {
        console.log('flight err: ', err)
        this.loading = false
        this.addDialogVisible = false
        setTimeout(() => {
          this.$message.error('刪除失敗，請再重試一次')
        }, 3000)
      })
    },
    // 修改班機對話框
    showEditDialogVisible (row) {
      // console.log(id)
      this.editDialogVisible = true
      this.editForm = row
      this.flightUid = row.UID
      this.getFlightList()
    },
    editDialogClosed () {
      // eslint-disable-next-line dot-notation
      this.$refs['editFormRef'].resetFields()
    },
    // 修改班機
    editFlight () {
      console.log('修改id: ', this.flightUid)
      console.log('修改班機: ', this.editForm.日期, typeof this.editForm.日期)
      // eslint-disable-next-line dot-notation
      this.$refs['editFormRef'].validate(valid => {
        if (!valid) return false
        this.editDialogVisible = false
        this.loading = true
        // 修改班機請求
        ajax.put('/api/BasicData/flight',
          {
            UID: this.editForm.UID,
            dd: this.editForm.日期,
            mawbKind: this.editForm.主單號類型,
            flightNum: this.editForm.航班號碼,
            flightTime: this.editForm.起飛時間
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
            this.getFlightList()
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
    // 批次新增班機資料
    addBatchFlight () {
      console.log('flight DATE: ', this.addBatchForm.flight_dates, typeof this.addBatchForm.flight_dates)
      // console.log('flight: ', this.addForm.flight)
      this.$refs.addBatchFormRef.validate(valid => {
        if (!valid) return
        this.addBatchDialogVisible = false

        // const lastFlightDateIndex = this.addBatchForm.flight_dates.length - 1

        for (var i = 0; i < this.addBatchForm.flight_dates.length; i++) {
          const currFlightDate = this.addBatchForm.flight_dates[i]

          this.loading = true
          ajax.post('/api/BasicData/flight',
            {
              dd: this.addBatchForm.flight_dates[i],
              mawbKind: this.addBatchForm.main_category,
              flightNum: this.addBatchForm.flight,
              flightTime: this.addBatchForm.flight_takeoff
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
              return this.$message.error(currFlightDate + ' ' + res.slice(6))
            }
            if (res === 'OK') this.$message.success(currFlightDate + ' 新增成功！')

            setTimeout(() => {
              this.getFlightList()
            }, 0)
            // if (i === lastFlightDateIndex) {
            //   console.log('最后1个航班的日期')
            //   setTimeout(() => {
            //     this.getFlightList()
            //   }, 3000)
            // }
          }).catch(err => {
            console.log('sheet err: ', err)
            this.loading = false
            this.addDialogVisible = false
            setTimeout(() => {
              this.$message.error(currFlightDate + ' 新增失敗，請再重試一次')
            }, 3000)
          })
        }

        // this.loading = true
        console.log(
          JSON.stringify(
            {
              dd: this.addBatchForm.flight_dates,
              mawbKind: this.addBatchForm.main_category,
              flightNum: this.addBatchForm.flight,
              flightTime: this.addBatchForm.flight_takeoff
            }
          )
        )
      })
    },
    // 單筆新增班機資料
    addFlight () {
      console.log('flight DATE: ', this.addForm.flight_date, typeof this.addForm.flight_date)
      // console.log('flight: ', this.addForm.flight)
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        this.addDialogVisible = false
        this.loading = true
        console.log(
          JSON.stringify(
            {
              dd: this.addForm.flight_date,
              mawbKind: this.addForm.main_category,
              flightNum: this.addForm.flight,
              flightTime: this.addForm.flight_takeoff
            }
          )
        )
        //  flight_date: '50 BYT',
        //   flight_weekday: '10 BYT',
        //   main_category: '20 BYT',
        //   flight: 'aaa100',
        //   flight_takeoff: '2022-02-12'
        ajax.post('/api/BasicData/flight',
          {
            dd: this.addForm.flight_date,
            mawbKind: this.addForm.main_category,
            flightNum: this.addForm.flight,
            flightTime: this.addForm.flight_takeoff
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
            this.getFlightList()
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
    addBatchDialogClosed () {
      // eslint-disable-next-line dot-notation
      this.$refs['addBatchFormRef'].resetFields()
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
  data () {
    return {
      // 批次班机列表
      flightDates: [],
      addBatchDialogVisible: false,
      // 当前页的页码
      currentPage: 1,
      // 每页的笔数
      pageSize: 10,
      flightUid: '',
      isUpload: false,
      fileList: [],
      // currentPage: 1,
      searchValue: '',
      // edit: Edit,
      // del: Delete,
      // search: Search,
      addDialogVisible: false,
      editDialogVisible: false,
      addBatchForm: {
        flight_dates: [],
        main_category: '',
        flight: '',
        flight_takeoff: ''
      },
      addBatchFormRules: {
        flight_dates: [
          { required: true, message: '請選擇日期', trigger: 'blur' }
          // { required: true, message: '請輸入日期， 如: 2022-02-20', trigger: 'blur' }
        ],
        main_category: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        flight: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        flight_takeoff: [
          { required: true, message: '請選擇時間', trigger: 'blur' }
        ]
      },
      addForm: {
        flight_date: '',
        flight_weekday: '',
        main_category: '',
        flight: '',
        flight_takeoff: ''
      },
      addFormRules: {
        flight_date: [
          { required: true, message: '請選擇日期', trigger: 'blur' }
          // { required: true, message: '請輸入日期， 如: 2022-02-20', trigger: 'blur' }
        ],
        flight_weekday: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        main_category: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        flight: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        flight_takeoff: [
          { required: true, message: '請選擇時間', trigger: 'blur' }
        ]
      },
      editFormRules: {
        日期: [
          { required: true, message: '請選擇日期', trigger: 'blur' }
        ],
        主單號類型: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        航班號碼: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        起飛時間: [
          { required: true, message: '請選擇時間', trigger: 'blur' }
        ]
      },
      editForm: {
        // flight_date: '',
        // main_category: '',
        // flight: '',
        // flight_takeoff: ''
      },
      flightList: [],
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
    this.getFlightList()
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

.flights-container {
  padding: 10px;
  .el-form {
    .el-date-editor {
      width: 100%;
    }
  }
  .searchBtn {
    font-size: 16px;
    border-radius: 2px;
    background-color: #fc5000;
    color: #fff;
    margin-left: 2px;
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
