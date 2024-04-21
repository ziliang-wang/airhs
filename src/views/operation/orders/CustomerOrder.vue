<template>
  <div class="customerorder-container" id="13" ref="custPageRef" v-loading="loading">
    <el-form :inline="true" :model="bookingInfo" :rules="bookingInfoRules" ref="bookingInfoRef">
      <el-tag style="margin-bottom: 20px;">客户訂倉</el-tag>
      <br>
      <el-form-item label="航空公司" prop="mawbKind">
        <el-select v-model="bookingInfo.mawbKind" placeholder="請選擇航空公司" @change="mapToFlight">
          <el-option
            v-for="item in airOptions"
            :key="item.mawbKind"
            :label="item.airline"
            :value="item.mawbKind">
          </el-option>
        </el-select>
        <!-- <el-input v-model.trim="bookingInfo.mawbKind" placeholder="主單號類型"></el-input> -->
      </el-form-item>
      <el-form-item label="客户簡稱" prop="customCode">
        <el-select v-model="bookingInfo.customCode" placeholder="請選擇客戶">
          <el-option
            v-for="item in custOptions"
            :key="item.customCode"
            :label="item.customName"
            :value="item.customCode">
          </el-option>
        </el-select>
        <!-- <el-input v-model.trim="bookingInfo.customCode" placeholder="客戶代號"></el-input> -->
      </el-form-item>
      <el-form-item label="發車時間" prop="depatureTime">
        <el-time-picker
          v-model.trim="bookingInfo.depatureTime"
          :picker-options="{
            selectableRange: '00:00:00 - 23:59:59'
          }"
          placeholder="選擇時間"
          value-format='HH:mm:ss'
        >
        </el-time-picker>
        <!-- <el-input v-model.trim="bookingInfo.depatureTime" placeholder="發車時間"></el-input> -->
      </el-form-item>
      <br>
      <el-form-item label="主單號數量" prop="mainAmount" :rules="[
          { required: true, message: '主單號數量不得為空'},
          { type: 'number', message: '主單號數量必須為數字'}
        ]">
        <el-input v-model.trim.number="bookingInfo.mainAmount" placeholder="主單號數量"></el-input>
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
      <el-form-item label="預定航班日期" prop="date">
        <el-date-picker
          v-model.trim="bookingInfo.date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="選擇日期"
        >
        </el-date-picker>
      </el-form-item>
      <br>
      <el-form-item label="預定班機" prop="flight">
        <el-select v-model="bookingInfo.flight" placeholder="請選擇預定班機">
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
        <el-input v-model.trim="bookingInfo.loader" placeholder="載具代碼" disabled></el-input>
      </el-form-item>
      <br>
      <el-form-item label="件數" prop="piece">
        <el-input v-model.trim.number="bookingInfo.piece" placeholder="件數"></el-input>
      </el-form-item>
      <el-form-item label="訂倉重量" prop="weight" :rules="[
          { required: true, message: '訂倉重量不得為空'},
          { type: 'number', message: '訂倉重量必須為數字'}
        ]">
        <el-input v-model.trim.number="bookingInfo.weight" placeholder="訂倉重量"></el-input>
      </el-form-item>
      <el-form-item label="倉儲" prop="wareHouse">
        <el-input v-model.trim="bookingInfo.wareHouse" placeholder="倉儲"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="備註" prop="remark">
        <el-input v-model.trim="bookingInfo.remark" placeholder="備註"></el-input>
      </el-form-item>
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
        width="100">
      </el-table-column>
      <el-table-column
        prop="訂倉單號"
        label="訂倉單號"
        width="100">
      </el-table-column>
      <el-table-column
        prop="主單號"
        label="主單號(數量)"
        width="100">
      </el-table-column>
      <el-table-column
        prop="訂倉時間"
        label="訂倉時間"
        width="100">
      </el-table-column>
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
      <el-table-column
        prop="載具"
        label="載具"
        width="100">
      </el-table-column>
      <!-- 載具剩餘數量 -->
      <el-table-column
        prop="載具剩餘數量"
        label="載具剩餘數量"
        class-name=""
        width="120">
      </el-table-column>
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
  </div>
</template>

<script>
import { ajax } from '@/utils/ajax'
import FileSaver from 'file-saver'

export default {
  name: 'CustomerOrder',
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
        // CI直接列明细
        if (item.主單號名稱 === 'CI') {
          const bookingTime = item.訂倉時間
          const loader = item.載具
          for (const detailItem of item.主單號明細) {
            console.log(detailItem)
            const data = {
              訂倉單號: detailItem.客戶訂倉單號,
              訂倉時間: this.frmDate(bookingTime),
              訂倉重: detailItem.訂倉重,
              主單號名稱: detailItem.主單號名稱,
              主單號: detailItem.主單號,
              目的地: detailItem.目的地,
              預定航班日期: this.frmDate(detailItem.預定航班日期),
              預定班機: detailItem.預定班機,
              貨物種類: detailItem.貨物種類,
              載具: loader,
              載具剩餘數量: item.載具數量
            }
            dataList.push(data)
          }
        } else {
          if (item.主單號明細.length === 0) {
            const data = {
              訂倉單號: item.訂倉單號,
              訂倉時間: this.frmDate(item.訂倉時間),
              訂倉重: item.訂倉重,
              主單號名稱: item.主單號名稱,
              主單號: item.主單號名稱 !== 'CI' ? item.主單號數量 : item.主單號,
              目的地: item.目的地,
              預定航班日期: this.frmDate(item.預定航班日期),
              預定班機: item.預定班機,
              貨物種類: item.貨物種類,
              載具: item.載具
            }
            dataList.push(data)
          } else {
            for (const detailItem of item.主單號明細) {
              console.log(detailItem)
              const data = {
                訂倉單號: detailItem.客戶訂倉單號,
                // "2022-05-05T11:35:30.21"
                訂倉時間: this.frmDate(item.訂倉時間),
                訂倉重: detailItem.訂倉重,
                主單號名稱: detailItem.主單號名稱,
                主單號: detailItem.主單號,
                目的地: detailItem.目的地,
                預定航班日期: this.frmDate(detailItem.預定航班日期),
                // 預定航班日期: detailItem.預定航班日期.slice(0, 10),
                預定班機: detailItem.預定班機,
                貨物種類: detailItem.貨物種類,
                載具: detailItem.載具代碼
              }
              dataList.push(data)
            }
          }
        }
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
    },
    // 客户代号-客户简称
    custOptions () {
      const dataList = []
      for (const item of this.customerList) {
        const data = {
          customCode: item.客戶代號,
          customName: item.客戶簡稱
        }
        dataList.push(data)
      }
      return dataList
    }
  },
  data () {
    return {
      // 班机列表
      flightList: [],
      // 目的地列表
      destList: [],
      // 定倉信息
      bookingInfo: {
        mainAmount: '',
        wareHouse: '',
        depatureTime: '',
        customCode: '',
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
        // mainAmount: [
        //   { required: true, message: '不得為空', trigger: 'blur' }
        // ],
        wareHouse: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ],
        depatureTime: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        customCode: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        mawbKind: [
          { required: true, message: '不得為空', trigger: 'change' }
        ],
        destination: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        date: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ],
        flight: [
          { required: false, message: '不得為空', trigger: 'blur' }
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
          { required: true, message: '不得為空', trigger: 'blur' }
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
      custDataList: [],
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
      relatedflightList: [],
      customerList: []
    }
  },
  methods: {
    // 載具超過初始值，變色
    exceedClass ({ row, rowIndex }) {
      // console.log(row)
      if (row.載具剩餘數量 < 0) {
        return 'exceeded-row'
      }
      return ''
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
    // 航空公司-航班號碼開頭-對應班機 聯動
    mapToFlight (value) {
      this.bookingInfo.flight = ''

      for (const item of this.sheetList) {
        if (value === item.代碼) {
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
    // 獲取班机列表
    getFlightList () {
      console.log(this.currentDateString)
      this.loading = true
      ajax.get('/api/BasicData/flight', {
        params: {
          dd: this.bookingInfo.date || this.currentDateString
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
    // 獲取主單號類型
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
        if (item.MenuUID === parseInt(this.$refs.custPageRef.id)) {
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
      // console.log(this.bookingInfo.depatureTime)
      // console.log(this.bookingInfo.depatureTime.slice(0, 5))
      console.log(
        JSON.stringify({
          主單號類型: this.bookingInfo.mawbKind,
          客戶代號: this.bookingInfo.customCode,
          發車時間: this.bookingInfo.depatureTime.slice(0, 5),
          主單號數量: this.bookingInfo.mainAmount,
          目的地: this.bookingInfo.destination,
          預定航班日期: this.bookingInfo.date,
          預定班機: this.bookingInfo.flight,
          貨種: this.bookingInfo.kind,
          載具: this.bookingInfo.loader,
          件數: this.bookingInfo.piece,
          訂倉重: this.bookingInfo.weight,
          倉儲: this.bookingInfo.wareHouse,
          備註: this.bookingInfo.remark
        })
      )
      this.$refs.bookingInfoRef.validate(valid => {
        if (!valid) return false
        this.loading = true
        ajax.post('/api/Operate/cusorder',
          {
            JSON: JSON.stringify({
              主單號類型: this.bookingInfo.mawbKind,
              客戶代號: this.bookingInfo.customCode,
              發車時間: this.bookingInfo.depatureTime.slice(0, 5),
              主單號數量: this.bookingInfo.mainAmount,
              目的地: this.bookingInfo.destination,
              預定航班日期: this.bookingInfo.date,
              預定班機: this.bookingInfo.flight,
              貨種: this.bookingInfo.kind,
              載具: this.bookingInfo.loader,
              件數: this.bookingInfo.piece || 0,
              訂倉重: this.bookingInfo.weight,
              倉儲: this.bookingInfo.wareHouse,
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
          console.log('booking res: ', res)
          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(`${res.data.slice(6)}`)
          }
          if (res.data === 'OK') this.$message.success('訂倉成功')
          this.bookingDataList = []
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
    // 查詢訂倉單，獲取客戶訂倉的數據
    getBookingData () {
      this.$refs.formInline1Ref.validate(valid => {
        if (!valid) return
        this.loading = true
        ajax.get('/api/Operate/cusorder', {
        // ajax.get('/api/Mawb/orderdtl', {
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
          this.$message.error('獲取客戶訂倉資料失敗，請稍後重試')
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
    this.getFlightList()
    this.getDestList()
    this.getCustomerList()
  },
  watch: {
    $route () {
      // if (this.$route.fullPath !== '/user-manager/') this.show = false
    }
  }
}
</script>

<style lang="scss">
.customerorder-container {
  padding-bottom: 20px;
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
