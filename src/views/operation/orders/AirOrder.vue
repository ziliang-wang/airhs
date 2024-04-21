<template>
  <div class="airorder-container" id="12" ref="airorderPageRef" v-loading="loading">
    <el-form :inline="true" :model="bookingInfo" :rules="bookingInfoRules" ref="bookingInfoRef">
      <el-tag style="margin-bottom: 20px;">航空公司訂倉</el-tag>
      <br>
      <el-form-item label="航空公司" prop="mawbKind">
        <el-select v-model="bookingInfo.mawbKind" placeholder="請選擇航空公司" @change="mapToAirLine">
          <el-option
            v-for="item in airOptions"
            :key="item.mawbKind"
            :label="item.airline"
            :value="item.mawbKind">
          </el-option>
        </el-select>
        <!-- <el-input v-model.trim="bookingInfo.mawbKind" placeholder="主單號類型"></el-input> -->
      </el-form-item>
      <el-form-item label="目的地" prop="destination">
        <el-select v-model="bookingInfo.destination" placeholder="請選擇目的地">
          <el-option
            v-for="item in destList"
            :key="item.代碼"
            :label="item.代碼"
            :value="item.代碼">
          </el-option>
        </el-select>
        <!-- <el-input v-model.trim="bookingInfo.destination" placeholder="目的地"></el-input> -->
      </el-form-item>
      <el-form-item label="預定日期" prop="date">
        <el-date-picker
          @change="mapToDate"
          v-model.trim="bookingInfo.date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="選擇日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="預定班機" prop="flight">
        <el-select v-model="bookingInfo.flight" placeholder="請選擇預定班機" @focus="showAssignFlightList">
          <el-option
            v-for="item in relatedflightList"
            :key="item.航班號碼"
            :label="item.航班號碼"
            :value="item.航班號碼"
          >
          </el-option>
        </el-select>
        <!-- <el-input v-model="bookingInfo.flight" placeholder="預定班機"></el-input> -->
      </el-form-item>
      <el-form-item label="貨種" prop="kind">
        <el-input v-model.trim="bookingInfo.kind" placeholder="貨種"></el-input>
      </el-form-item>
      <el-form-item label="載具" prop="loader">
        <el-input v-model.trim="bookingInfo.loader" placeholder="載具代碼"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="件數" prop="piece">
        <el-input v-model.trim="bookingInfo.piece" placeholder="件數"></el-input>
      </el-form-item>
      <el-form-item label="訂倉重量" prop="weight">
        <el-input v-model.trim="bookingInfo.weight" placeholder="訂倉重量"></el-input>
      </el-form-item>
      <el-form-item label="備註" prop="remark">
        <el-input v-model.trim="bookingInfo.remark" placeholder="備註"></el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <span v-if="isEnableAdd">
          <el-button type="primary" @click="booking">訂倉</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有訂倉權限" type="primary" @click="booking">訂倉</el-button>
        </span>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <!-- 查詢訂倉單 -->
    <el-form :inline="true" :model="formInline1" :rules="formInline1Rules" ref="formInline1Ref" class="form-inline1">
      <el-tag style="margin-bottom: 20px;">查詢訂倉單</el-tag>
      <br>
      <el-form-item label="查詢日期" prop="date">
        <el-date-picker
          v-model.trim="formInline1.date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="選擇日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="查詢天數" prop="days" :rules="[
          { required: true, message: '查詢天數不得為空'},
          { type: 'number', message: '查詢天數必須為數字'}
        ]">
        <el-input v-model.trim.number="formInline1.days" placeholder="查詢天數"></el-input>
      </el-form-item>
      <el-form-item label="航空公司" prop="mawbKind">
        <el-select v-model="formInline1.mawbKind" placeholder="請選擇航空公司">
          <el-option
            v-for="item in airOptions"
            :key="item.mawbKind"
            :label="item.airline"
            :value="item.mawbKind">
          </el-option>
        </el-select>
        <!-- <el-input v-model.trim="formInline1.mawbKind" placeholder="主單號類型"></el-input> -->
      </el-form-item>
      <br>
      <el-form-item label="" prop="search">
        <el-input v-model.trim="formInline1.searchValue" placeholder="搜尋"></el-input>
      </el-form-item>
      <el-form-item>
        <span v-if="isEnableQuery">
          <el-button type="primary" @click="getBookingData" class="queryBtn">查詢訂倉單</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有查詢權限" type="primary" @click="getBookingData" class="queryBtn">查詢訂倉單</el-button>
        </span>
      </el-form-item>
    </el-form>
    <!-- 主表 -->
    <el-table
      class="main-table"
      :data="pageList"
      :row-class-name="exceedClass"
      style="width: 100%">
      <el-table-column
        prop="主單號名稱"
        label="航空公司"
        width="80">
      </el-table-column>
      <el-table-column
        prop="訂倉單號"
        label="訂倉單號"
        width="120">
      </el-table-column>
      <el-table-column
        prop="主單號"
        label="主單號"
        width="120">
      </el-table-column>
      <!-- <el-table-column
        prop="訂倉時間"
        label="訂倉時間"
        width="100">
      </el-table-column> -->
      <el-table-column
        prop="目的地"
        label="目的地"
        width="100">
      </el-table-column>
      <el-table-column
        prop="預定航班日期"
        label="預定航班日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="預定班機"
        label="預定班機"
        width="100">
      </el-table-column>
      <!-- <el-table-column
        prop="訂倉單號"
        label="訂倉單號"
        width="100">
      </el-table-column>
      <el-table-column
        prop="訂倉時間"
        label="訂倉時間"
        width="100">
      </el-table-column> -->
      <el-table-column
        prop="訂倉重"
        label="訂倉重量"
        width="100">
      </el-table-column>
      <el-table-column
        prop="貨物種類"
        label="貨物種類"
        width="100">
      </el-table-column>
      <el-table-column
        prop="載具"
        label="載具"
        width="80">
      </el-table-column>
       <!-- 載具剩餘數量 -->
      <el-table-column
        prop="載具剩餘數量"
        label="載具剩餘數量"
        class-name=""
        width="120">
      </el-table-column>
      <el-table-column label="操作" width="100%">
          <template #default="scope">
            <!-- 修改按鈕 -->
            <span v-if="isEnableModify">
              <el-button type="primary" size="small" class="operator" @click="showEditDialogVisible(scope.row.訂倉單號)">修改載具代碼</el-button>
            </span>
            <span v-else>
              <el-button disabled title="您沒有修改權限" type="primary" size="small" class="operator" @click="showEditDialogVisible(scope.row.訂倉單號)">修改載具代碼</el-button>
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
    <!-- 修改订仓单 -->
    <el-dialog
      title="修改訂倉單"
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
        <el-form-item label="航空公司" prop="">
          <el-input v-model.trim="editForm.主單號名稱" disabled></el-input>
        </el-form-item>
        <el-form-item label="主單號" prop="">
          <el-input v-model.trim="editForm.主單號" disabled></el-input>
        </el-form-item>
        <el-form-item label="訂倉單號" prop="">
          <el-input v-model.trim="editForm.訂倉單號" disabled></el-input>
        </el-form-item>
        <el-form-item label="訂倉時間" prop="">
          <el-input v-model.trim="editForm.訂倉時間" disabled></el-input>
        </el-form-item>
        <el-form-item label="目的地" prop="">
          <el-input v-model.trim="editForm.目的地" disabled></el-input>
        </el-form-item>
        <el-form-item label="預定航班日期" prop="">
          <el-input v-model.trim="editForm.預定航班日期" disabled></el-input>
        </el-form-item>
        <el-form-item label="預定班機" prop="">
          <el-input v-model.trim="editForm.預定班機" disabled></el-input>
        </el-form-item>
        <el-form-item label="訂倉重量" prop="">
          <el-input v-model.trim="editForm.訂倉重" disabled></el-input>
        </el-form-item>
        <el-form-item label="貨物種類" prop="">
          <el-input v-model.trim="editForm.貨物種類" disabled></el-input>
        </el-form-item>
        <el-form-item label="載具" prop="載具">
          <el-input v-model.trim="editForm.載具" placeholder="請輸入載具代碼"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="editOrderNum">確 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ajax } from '@/utils/ajax'
import FileSaver from 'file-saver'

export default {
  name: 'AirOrder',
  computed: {
    // 所选日期范围
    dateRange () {
      return this.formInline1.dateRange
    },
    // 总Eq
    totalEq () {
      return this.totalLoadingWeight - this.totalBoardWeight
    },
    // 總版重
    totalBoardWeight () {
      let totalWeight = 0
      for (const item of this.eqDataList) {
        totalWeight += item.板重
      }
      return totalWeight
    },
    // 裝載總重量
    totalLoadingWeight () {
      let totalWeight = 0
      for (const item of this.eqDataList) {
        totalWeight += item.實際重
      }
      return totalWeight
    },
    // 格式化eq列表
    frmEqDataList () {
      const dataList = []
      for (const item of this.eqDataList) {
        const data = {
          detail: item.detail,
          主單號: item.主單號,
          客戶簡稱: item.客戶簡稱,
          實際重: item.實際重,
          日期: this.frmDate(item.日期),
          板型: item.板型,
          板重: item.板重,
          航班: item.航班,
          航空公司: item.航空公司,
          載具代碼: item.載具代碼
        }
        dataList.push(data)
      }
      return dataList
    },
    // 格式化訂倉查詢列表
    frmBookingDataList () {
      const dataList = []
      for (const item of this.bookingDataList) {
        const data = {
          訂倉單號: item.訂倉單號,
          訂倉時間: this.frmDate(item.訂倉時間),
          訂倉重: item.訂倉重,
          主單號名稱: item.主單號名稱,
          主單號: item.主單號,
          目的地: item.目的地,
          預定航班日期: this.frmDate(item.預定航班日期),
          預定班機: item.預定班機,
          貨物種類: item.貨物種類,
          載具: item.載具,
          載具剩餘數量: item.載具數量 - item.載具使用數量
        }
        dataList.push(data)
      }
      return dataList
    },
    // 分页total
    total () {
      return this.frmBookingDataList.length
    },
    // 分页列表
    pageList: {
      get () {
        return this.frmBookingDataList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    },
    // 主單號類型對應航空公司/航班號碼開頭
    airOptions () {
      const dataList = []
      for (const item of this.sheetList) {
        if (item.航班號碼開頭 === 'All') continue
        const data = {
          mawbKind: item.代碼,
          airline: item.名稱,
          startWithFlight: item.航班號碼開頭
        }
        dataList.push(data)
      }
      return dataList
    },
    // 當前的日期字串
    currentDateString () {
      const timestamp = Date.now()
      const d = new Date(timestamp)
      const date = (d.getFullYear()) + '-' +
      (d.getMonth() + 1) + '-' +
      (d.getDate()) + ' '
      return date
    }
  },
  data () {
    return {
      // 定倉信息
      bookingInfo: {
        mawbKind: '',
        destination: '',
        date: '',
        flight: '',
        kind: '',
        loader: '',
        piece: '',
        weight: '',
        remark: ''
      },
      // 定倉驗證
      bookingInfoRules: {
        mawbKind: [
          { required: true, message: '不得為空', trigger: 'change' }
        ],
        destination: [
          { required: true, message: '不得為空', trigger: 'change' }
        ],
        date: [
          { required: true, message: '不得為空', trigger: 'change' }
        ],
        flight: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        kind: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        loader: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ],
        piece: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ],
        weight: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ]
      },
      compareRules: {
        compare: [{ required: true, message: '請選擇比較形式', trigger: 'blur' }]
      },
      selectedValue: '',
      options: [
        {
          value: '0',
          label: '月'
        },
        {
          value: '1',
          label: '季'
        },
        {
          value: '2',
          label: '年'
        }
      ],
      loading: false,
      bookingDataList: [],
      compareDataList: [],
      eqDataList: [],
      formInline1: {
        date: '',
        days: '',
        month: '',
        dateRange: [],
        mawbKind: '',
        customCode: '',
        searchValue: ''
      },
      formInline1Rules: {
        search: [],
        date: [
          { required: true, message: '請選擇日期', trigger: 'blur' }
        ],
        // days: [
        //   { required: true, message: '請輸入查詢天數', trigger: 'blur' }
        // ],
        month: [
          { required: true, message: '請選擇月份', trigger: 'blur' }
        ],
        mawbKind: [
          { required: true, message: '請選擇航空公司', trigger: 'blur' }
        ],
        customCode: []
      },
      currentUserPermission: [],
      isEnableAdd: 0,
      isEnableRemove: 0,
      isEnableModify: 0,
      isEnableQuery: 0,
      // 当前页的页码
      currentPage: 1,
      // 每页的笔数
      pageSize: 10,
      sheetList: [],
      destList: [],
      flightList: [],
      startWithFlightList: [],
      relatedflightList: [],
      editDialogVisible: false,
      editFormRules: {
        載具: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ]
      },
      editForm: {},
      // 航空公司
      airLineCorp: ''
    }
  },
  methods: {
    showAssignFlightList () {
      // console.log('tt')
      this.mapToFlight()
    },
    mapToAirLine (val) {
      this.airLineCorp = val
    },
    // 載具超過初始值，變色
    exceedClass ({ row, rowIndex }) {
      // console.log(row)
      if (row.載具剩餘數量 < 0) {
        return 'exceeded-row'
      }
      return ''
    },
    // 修改訂倉單
    editOrderNum () {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        this.editDialogVisible = false
        this.loading = true
        // 測試
        console.log(
          JSON.stringify(
            {
              訂倉單號: this.editForm.訂倉單號,
              主單號類型: this.editForm.主單號名稱,
              目的地: this.editForm.目的地,
              預定航班日期: this.editForm.預定航班日期,
              預定班機: this.editForm.預定班機,
              貨種: this.editForm.貨物種類,
              載具: this.editForm.載具,
              件數: this.editForm.件數,
              訂倉重: this.editForm.訂倉重,
              備註: this.editForm.備註
            }
          )
        )
        // 修改訂倉單請求
        ajax.post('/api/Operate/airorderedit',
          {
            // customCode: this.editForm.客戶代號,
            // 訂倉單號,主單號類型,目的地,預定航班日期,預定班機,貨種,載具,件數,訂倉重,備註
            JSON: JSON.stringify(
              {
                訂倉單號: this.editForm.訂倉單號,
                主單號類型: this.editForm.主單號名稱,
                目的地: this.editForm.目的地,
                預定航班日期: this.editForm.預定航班日期,
                預定班機: this.editForm.預定班機,
                貨種: this.editForm.貨物種類,
                載具: this.editForm.載具,
                件數: this.editForm.件數,
                訂倉重: this.editForm.訂倉重,
                備註: this.editForm.備註
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
          // console.log('訂倉單修改結果: ', res)
          if (res.slice(0, 5) === 'Error') {
            // this.bookingDataList = []
            return this.$message.error(res.slice(6))
          }
          if (res === 'OK') this.$message.success('修改成功')
          setTimeout(() => {
            // this.bookingDataList = []
            this.getBookingData()
          }, 3000)
        }).catch(err => {
          console.log('orderNum err: ', err)
          this.loading = false
          this.editDialogVisible = false
          setTimeout(() => {
            this.$message.error('修改失敗，請再重試一次')
          }, 3000)
        })
      })
    },
    editDialogClosed () {
      // eslint-disable-next-line dot-notation
      this.$refs['editFormRef'].resetFields()
    },
    // 修改订仓单對話框
    showEditDialogVisible (orderNum) {
      console.log('订仓单号: ', orderNum)
      ajax.get('/api/Operate/order', {
        params: {
          ordernum: orderNum
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
      // this.editDialogVisible = true
    },
    relatedFlight () {
      for (const flight of this.flightList) {
        if (this.startWithFlightList.indexOf(flight.航班號碼.substr(0, 2)) >= 0) {
          console.log(flight.航班號碼)
        }
      }
    },
    mapToDate (date) {
      console.log('日期: ', date)
      this.getAssignFlightList(date)
    },
    // 航空公司-航班號碼開頭-對應/预定日期/预定班機 聯動
    mapToFlight (value) {
      this.bookingInfo.flight = ''

      for (const item of this.sheetList) {
        if (this.airLineCorp === item.代碼) {
          this.startWithFlightList = item.航班號碼開頭.trim().toLowerCase().split(',')
        }
      }

      this.relatedflightList = []

      for (const flight of this.flightList) {
        if (this.startWithFlightList.indexOf(flight.航班號碼.substr(0, 2).toLowerCase()) >= 0) {
          const data = {
            航班號碼: flight.航班號碼
          }
          this.relatedflightList.push(data)
        }
      }
      // this.relatedflightList = []
    },
    triggerSelect () {
      console.log('hhh')
    },
    // 獲取指定日期班机列表
    getAssignFlightList (date) {
      // console.log(this.currentDateString)
      this.loading = true
      ajax.get('/api/BasicData/flight', {
        params: {
          // dd: this.bookingInfo.date || this.currentDateString
          dd: date || this.currentDateString
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
    // 獲取班机列表
    getFlightList () {
      // console.log(this.currentDateString)
      this.loading = true
      ajax.get('/api/BasicData/flight', {
        params: {
          dd: this.bookingInfo.date || this.currentDateString
          // dd: date
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
    // 獲取主單號類型/航空公司/航班號碼開頭
    getSheetList () {
      this.loading = true
      ajax.get('/api/BasicData/mwb', {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(({ data }) => {
        this.loading = false
        this.sheetList = data
        console.log('sheet list: ', this.sheetList)
      }).catch(err => {
        this.loading = false
        console.log('sheet err: ', err)
        this.$message.error('獲取主單號列表失敗，請刷新重試')
      })
    },
    // 变更页码
    currentChange (pageNum) {
      this.currentPage = pageNum
      console.log('current page: ', this.currentPage)
    },
    // 渲染权限
    renderPermission () {
      for (const item of this.currentUserPermission) {
        // console.log('item: ', item)
        if (item.MenuUID === parseInt(this.$refs.airorderPageRef.id)) {
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
    // 訂倉
    booking () {
      this.$refs.bookingInfoRef.validate(valid => {
        if (!valid) return false
        this.loading = true
        ajax.post('/api/Operate/airorder',
          {
            JSON: JSON.stringify({
              主單號類型: this.bookingInfo.mawbKind,
              目的地: this.bookingInfo.destination,
              預定航班日期: this.bookingInfo.date,
              預定班機: this.bookingInfo.flight,
              貨種: this.bookingInfo.kind,
              載具: this.bookingInfo.loader,
              件數: this.bookingInfo.piece || 0,
              訂倉重: this.bookingInfo.weight || 0,
              備註: this.bookingInfo.remark
            })
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }
        ).then((res) => {
          this.loading = false
          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(`${res.data.slice(6)}`)
          }
          if (res.data === 'OK') this.$message.success('訂倉成功')
        }).catch(err => {
          console.log('booking err: ', err)
          this.loading = false
          this.$message.error('訂倉失敗，請稍後重試')
        })
      })
    },
    // 格式化excel filename
    frmExcelFilename () {
      return 'compare-' + parseInt(new Date().getTime() / 1000) + '.xlsx'
    },
    // base64 to excel
    b64toFile (b64Data, filename, contentType) {
      const sliceSize = 512
      const byteCharacters = window.atob(b64Data)
      const byteArrays = []

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)
        const byteNumbers = new Array(slice.length)

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
      }

      const file = new File(byteArrays, filename, { type: contentType })
      return file
    },
    // 匯出excel
    exportExcel () {
      if (this.formInline1.month === '' ||
          this.selectedValue === ''
      ) {
        this.$message.warning('請選擇月份和比較形式')
        return
      }
      // 匯出excel請求
      this.loading = true
      ajax.post('/api/Reoprt/expcpe',
        {
          Month: this.formInline1.month,
          mawbKind: this.formInline1.mawbKind,
          customCode: this.formInline1.customCode,
          cpeKind: this.selectedValue,
          expKind: 0
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        }
      ).then((res) => {
        this.loading = false
        // console.log('excel res: ', res)
        // this.eqDataList = data
        if (res.data.slice(0, 5) === 'Error') {
          return this.$message.error(`${res.data.slice(6)}`)
        }
        const b64data = res.data.split(',')[0]
        const file = this.b64toFile(b64data, 'test', 'application/vnd.ms-excel;charset=utf-8')
        // 利用FileSaver.js 下载文件为Excel文件
        FileSaver.saveAs(file, this.frmExcelFilename())
        // FileSaver.open(file, this.frmExcelFilename())
      }).catch(err => {
        console.log('excel err: ', err)
        this.loading = false
        this.$message.error('匯出Excel失敗，請稍後重試')
      })
    },
    // 匯出pdf
    exportPdf () {
      if (this.formInline1.month === '' ||
          this.selectedValue === ''
      ) {
        this.$message.warning('請選擇月份和比較形式')
        return
      }
      // 匯出請求
      // 匯出excel請求
      this.loading = true
      ajax.post('/api/Reoprt/expeq',
        {
          SD: this.formInline1.dateRange[0],
          ED: this.formInline1.dateRange[1],
          mawbKind: this.formInline1.mawbKind,
          customCode: this.formInline1.customCode,
          searchFor: this.formInline1.searchValue,
          expKind: 1
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        }
      ).then((res) => {
        this.loading = false
        console.log('excel res: ', res)
        // this.eqDataList = data
        if (res.data.slice(0, 5) === 'Error') {
          return this.$message.error(`${res.data.slice(6)}`)
        }
        // this.eqDataList = res.data
        // console.log('excel data: ', this.eqDataList)
      }).catch(err => {
        console.log('excel err: ', err)
        this.loading = false
        this.$message.error('匯出Pdf失敗，請稍後重試')
      })
    },
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
    frmDate (time) {
      if (time === null) return false
      return time.slice(0, 10)
    },
    // 查詢訂倉單，獲取航空公司訂倉的數據
    getBookingData () {
      this.$refs.formInline1Ref.validate(valid => {
        if (!valid) return
        this.loading = true
        ajax.get('/api/Operate/airorder', {
          params: {
            DD: this.formInline1.date,
            addday: parseInt(this.formInline1.days),
            mawbKind: this.formInline1.mawbKind,
            searchFor: this.formInline1.searchValue
          },
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        }).then((res) => {
          this.loading = false
          // console.log('booking res: ', res)
          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(`${res.data.slice(6)}`)
          }
          // this.bookingDataList = res.data.reverse()
          this.bookingDataList = res.data
          console.log('booking data: ', this.bookingDataList)
        }).catch(err => {
          console.log('booking err: ', err)
          this.loading = false
          this.$message.error('獲取航空公司訂倉資料失敗，請稍後重試')
        })
      })
    }
  },
  mounted () {
    this.token = window.localStorage.getItem('token')
    this.nameid = window.localStorage.getItem('nameid')
    this.isAdmin()
    this.getCurrentUserPermission()
    this.getSheetList()
    // this.getFlightList()
    this.getDestList()
    // this.relatedflightList = []
    // this.getFlightList()
  },
  watch: {
    // $route () {
    //   // if (this.$route.fullPath !== '/user-manager/') this.show = false
    // }
  }
}
</script>

<style lang="scss">
.airorder-container{
  padding-bottom: 20px;
  .operator {
    padding-left: 10px;
  }
  .pagination {
    text-align: center;
    .el-pagination {
      margin-top: 20px;
    }
  }
  .el-tag {
    font-size: 20px;
  }

  .el-divider {
    margin-top: 0;
  }

  .el-form-item__label {
  }
  .queryBtn {
    background-color: rgb(252, 80, 0);
    border: 1px solid rgb(252, 80, 0);
  }
  .row1 {
    margin-bottom: 20px;
    .search-area {
      display: flex;
      .search {
        margin-left: 10px;
      }
    }
  }
  .summary {
    margin-top: 10px;
    background: #f1eeee;
    // padding: 100px;
    td {
      padding: 20px 0 20px 0;
    }
    td:first-of-type {
      padding-left: 20px;
      padding-right: 0;
      text-align: center;
    }
  }
  .main-table {
    margin-top: 0;
    padding-right: 0;
    // margin-right: -1000px;
    // 載具超量的樣式
    .exceeded-row {
      background: #f56c6c;
      color: #000;
    }
    .hidden-loader-rest-amount {
      display: none;
    }
  }
}
</style>
