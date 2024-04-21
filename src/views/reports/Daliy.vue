<template>
  <div class="daily-container" id="23" ref="dailyPageRef" v-loading="loading">
    <el-form :inline="true" :model="formInline1" :rules="formInline1Rules" ref="formInline1Ref" class="form-inline1">
      <el-form-item label="起飛日期" prop="date">
        <el-date-picker
          v-model.trim="formInline1.date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="請選擇起飛日期"
        >
        </el-date-picker>
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
        <!-- <el-input v-model="formInline1.mawbKind" placeholder="主單號類型"></el-input> -->
      </el-form-item>
      <el-form-item label="客戶簡稱" prop="customCode">
        <el-select v-model="formInline1.customCode" placeholder="請選擇客戶">
          <el-option
            v-for="item in custOptions"
            :key="item.customCode"
            :label="item.customName"
            :value="item.customCode">
          </el-option>
        </el-select>
        <!-- <el-input v-model="formInline1.customCode" placeholder="客戶代號"></el-input> -->
      </el-form-item>
    </el-form>
    <el-form :inline="true" :rules="compareRules">
      <el-form-item label="" prop="searchFor">
        <el-input v-model="formInline1.searchValue" placeholder="主單號/目的地/貨種..."></el-input>
      </el-form-item>
      <el-form-item>
        <span v-if="isEnableQuery">
          <el-button type="primary" @click="getDailyData" class="queryBtn">查詢</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有查詢權限" type="primary" @click="getDailyData" class="queryBtn">查詢</el-button>
        </span>
      </el-form-item>
      <el-form-item>
        <span v-if="isEnableExport">
          <el-button type="primary" @click="exportExcel">匯出Excel</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有匯出權限" type="primary" @click="exportExcel">匯出Excel</el-button>
        </span>
      </el-form-item>
      <el-form-item>
        <span v-if="isEnableExport">
          <el-button type="primary" @click="exportPdf">匯出Pdf</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有匯出權限" type="primary" @click="exportPdf">匯出Pdf</el-button>
        </span>
      </el-form-item>
      <el-form-item>
         <!-- 上傳excel -->
        <el-upload
          class="upload-area"
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
              <el-button type="primary">選取Excel檔案</el-button>
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
              type="success"
            >匯入
            </el-button>
          </span>
          <template #tip>
            <div class="el-upload__tip">只能選取一個Excel檔案，且不超过 10M</div>
          </template>
        </el-upload>
        <!-- // 上傳excel -->
      </el-form-item>
    </el-form>
    <!-- <table class="summary" width="80%" align="center">
      <tr>
        <td>起飛日期範圍 {{ dateRange[0] }} - {{ dateRange[1] }}</td>
        <td>裝載總重量 {{ totalLoadingWeight }}</td>
        <td>總板重 {{ totalBoardWeight }}</td>
        <td>總EQ {{ totalEq }}</td>
      </tr>
    </table> -->
    <!-- 主表 -->
    <el-table
      class="main-table"
      :data="pageList"
      stripe
      :cell-class-name="actualWeight"
      style="width: 100%">
      <el-table-column
        prop="工作檔號"
        label="工作檔號"
        width="120">
      </el-table-column>
      <el-table-column
        prop="航空公司"
        label="航空公司">
      </el-table-column>
      <el-table-column
        prop="客戶簡稱"
        label="客戶">
      </el-table-column>
      <el-table-column
        prop="主單號"
        label="主單號"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="目的地"
        label="目的地">
      </el-table-column>
      <el-table-column
        prop="預定班機"
        label="預排航班">
      </el-table-column>
      <el-table-column
        prop="起飛日"
        label="起飛日"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="確認起飛日"
        label="確認起飛日"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="載具"
        label="載具">
      </el-table-column>
      <el-table-column
        prop="貨種"
        label="貨種">
      </el-table-column>
      <el-table-column
        prop="實際重"
        label="實際重量">
      </el-table-column>
      <el-table-column
        prop="確認重量"
        label="確認重量">
      </el-table-column>
      <el-table-column
        prop="起飛航班"
        label="起飛航班">
      </el-table-column>
      <el-table-column
        prop="確認班機"
        label="確認班機">
      </el-table-column>
      <el-table-column
        prop="備註"
        label="備註">
      </el-table-column>
      <!-- 操作区 -->
      <el-table-column label="操作" width="500">
              <template #default="scope">
                <!-- 變更重量按鈕 -->
                <span v-if="isEnableModify">
                   <el-button type="primary" class="operator" @click="showEditWeightDialogVisible(scope.row)">變更重量</el-button>
                </span>
                <span v-else>
                   <el-button type="primary" class="operator" @click="showEditWeightDialogVisible(scope.row)" disabled title="您沒有修改權限">變更重量</el-button>
                </span>
                <!-- 變更航班按鈕 -->
                <span v-if="isEnableModify">
                   <el-button type="primary" class="operator" @click="showEditFlightDialogVisible(scope.row)">變更航班</el-button>
                </span>
                <span v-else>
                   <el-button type="primary" class="operator" @click="showEditFlightDialogVisible(scope.row)" disabled title="您沒有修改權限">變更航班</el-button>
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
    <!-- 變更重量 -->
    <el-dialog
      title="變更重量"
      :visible.sync="editWeightDialogVisible"
      width="50%"
      @close="editWeightDialogClosed"
    >
      <el-form
        :model="editWeightForm"
        :rules="editWeightFormRules"
        ref="editWeightFormRef"
        label-width="70px"
      >
        <el-form-item label="主單號" prop="">
          <el-input v-model.trim="editWeightForm.主單號" placeholder="主單號" disabled></el-input>
        </el-form-item>
        <el-form-item label="重量" prop="weight">
          <el-input ref="weightRef" v-model.trim="editWeightForm.確認重量" placeholder="请输入最终確認重量" @input="input"></el-input>
        </el-form-item>
        <!-- <el-form-item label="姓名" prop="名稱">
          <el-input v-model.trim="editForm.名稱"></el-input>
        </el-form-item> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editWeightDialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="editWeight">確 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 變更航班 -->
    <el-dialog
      title="變更航班"
      :visible.sync="editFlightDialogVisible"
      width="50%"
      @close="editFlightDialogClosed"
    >
      <el-form
        :model="editFlightForm"
        :rules="editFlightFormRules"
        ref="editFlightFormRef"
        label-width="70px"
      >
        <el-form-item label="主單號" prop="">
          <el-input v-model.trim="editFlightForm.主單號" placeholder="主單號" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="起飛日期">
          <el-date-picker
            disabled
            v-model="editFlightForm.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="起飛日期">
          </el-date-picker>
        </el-form-item> -->
        <!-- <el-form-item label="起飛日期" prop="">
          <el-date-picker
            v-model.trim="editFlightForm.起飛日"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="請選擇起飛日期"
          >
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="航班" prop="">
          <el-input ref="flightRef" v-model="editFlightForm.確認班機" placeholder="如：CI928 / 11" @input="input"></el-input>
        </el-form-item>
        <!-- <el-form-item label="姓名" prop="名稱">
          <el-input v-model.trim="editForm.名稱"></el-input>
        </el-form-item> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editFlightDialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="editFlight">確 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ajax } from '@/utils/ajax'
import FileSaver from 'file-saver'

export default {
  name: 'Daliy',
  computed: {
    // 當前的日期字串
    currentDateString () {
      const timestamp = Date.now()
      const d = new Date(timestamp)
      const date = (d.getFullYear()) + '-' +
      (d.getMonth() + 1) + '-' +
      (d.getDate()) + ' '
      return date
    },
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
    // 格式化daily日報表
    frmDailyDataList () {
      const dataList = []
      // 測試用，變更重量
      // const alterWeight = ''
      for (const item of this.dailyDataList) {
        const data = {
          Gross重量: item.Gross重量,
          detail: item.detail,
          主單號: item.主單號,
          主單號警示: item.主單號警示,
          備註: item.備註,
          客戶簡稱: item.客戶簡稱,
          實際重: item.實際重,
          工作檔號: (item.實際重 !== item.Gross重量 && item.確認重量 === 0) ? '' : item.工作檔號,
          目的地: item.目的地,
          航空公司: item.航空公司,
          貨種: item.貨種,
          起飛日: this.frmDate(item.起飛日),
          確認起飛日: this.frmDate(item.確認航班日期),
          起飛航班: item.起飛航班 !== '' ? item.起飛航班.replace(' ', '') : item.起飛航班,
          重量警示: item.重量警示,
          預定班機: item.預定班機 !== '' ? item.預定班機.replace(' ', '') : item.預定班機,
          確認重量: item.確認重量 === 0 ? '' : item.確認重量,
          確認班機: item.確認班機 !== '' ? item.確認班機.replace(' ', '') : item.確認班機,
          載具: item.載具
        }
        dataList.push(data)
        // MIX的部份
        if (item.detail.length >= 1) {
          for (const subItem of item.detail) {
            const data = {
              Gross重量: subItem.Gross重量,
              // detail: subItem.detail,
              主單號: subItem.主單號,
              主單號警示: subItem.主單號警示,
              備註: subItem.備註,
              客戶簡稱: subItem.客戶簡稱,
              實際重: subItem.實際重,
              工作檔號: (subItem.實際重 !== subItem.Gross重量 && subItem.確認重量 === 0) ? '' : subItem.工作檔號,
              目的地: subItem.目的地,
              航空公司: subItem.航空公司,
              貨種: subItem.貨種,
              起飛日: this.frmDate(subItem.起飛日),
              // 確認起飛日: this.frmDate(subItem.確認航班日期),
              起飛航班: subItem.起飛航班 !== '' ? subItem.起飛航班.replace(' ', '') : subItem.起飛航班,
              重量警示: subItem.重量警示,
              預定班機: subItem.預定班機 !== '' ? subItem.預定班機.replace(' ', '') : subItem.預定班機,
              確認重量: subItem.確認重量 === 0 ? '' : subItem.確認重量,
              確認班機: subItem.確認班機 !== '' ? subItem.確認班機.replace(' ', '') : subItem.確認班機,
              載具: subItem.載具
            }
            dataList.push(data)
          }
        }
      }
      return dataList
    },
    // 分页total
    total () {
      return this.frmDailyDataList.length
    },
    // 分页列表
    pageList: {
      get () {
        return this.frmDailyDataList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    },
    // 主單號類型對應航空公司
    airOptions () {
      const dataList = []
      for (const item of this.sheetList) {
        // if (item.名稱 === '所有航空公司') {
        //   item.代碼 = ''
        // }
        const data = {
          mawbKind: item.代碼,
          airline: item.名稱
        }
        dataList.push(data)
      }
      // dataList.push(
      //   {
      //     mawbKind: '',
      //     airline: '全部航空公司'
      //   }
      // )
      return dataList
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
      fileList: [],
      isUpload: false,
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
      dailyDataList: [],
      eqDataList: [],
      formInline1: {
        date: '',
        month: '',
        dateRange: [],
        mawbKind: '',
        customCode: '',
        searchValue: ''
      },
      formInline1Rules: {
        searchFor: [
          { required: false }
        ],
        date: [
          { required: true, message: '請選擇日期', trigger: 'blur' }
        ],
        month: [
          { required: false, message: '請選擇月份', trigger: 'blur' }
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
      isEnableExport: 0,
      // 当前页的页码
      currentPage: 1,
      // 每页的笔数
      pageSize: 10,
      sheetList: [],
      customerList: [],
      // 變更重量
      editWeightDialogVisible: false,
      editWeightForm: {},
      editWeightFormRules: {
        weight: [
          { required: false, message: '請輸入重量', trigger: 'blur' }
        ]
      },
      editFlightDialogVisible: false,
      editFlightForm: {
        date: ''
      },
      editFlightFormRules: {}
    }
  },
  methods: {
    // 檢查起飛資訊的格式
    checkFlightInfo (info) {
      if (info.indexOf('/') === -1) return false
      if (info.indexOf(',') >= 0) {
        const arr = info.split(',')
        for (const e of arr) {
          if (e.trim()[2] === '0') {
            return false
          } else if (e.trim()[2] === ' ') {
            return false
          }
        }
      } else {
        if (info[2] === '0' || info[2] === ' ') {
          return false
        }
      }
      return true
    },
    // 變更航班
    editFlight () {
      console.log(this.editFlightForm.確認班機)
      if (this.editFlightForm.確認班機.trim() === '') return this.$message.error('請輸入航班，不得為空')
      if (!this.checkFlightInfo(this.editFlightForm.確認班機)) {
        return this.$message.error('格式錯誤，請重新輸入')
      }
      // 變更航班請求
      console.log(
        {
          mawbNo: this.editFlightForm.主單號,
          // flightDate: this.editFlightForm.date,
          flight: this.editFlightForm.確認班機
        }
      )
      this.loading = true
      ajax.post('/api/Mawb/confirmflight',
        {
          mawbNo: this.editFlightForm.主單號,
          // flightDate: this.editFlightForm.date,
          flight: this.editFlightForm.確認班機
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
        this.editFlightDialogVisible = false
        setTimeout(() => {
          this.getDailyData()
        }, 3000)
      }).catch(err => {
        console.log('flight err: ', err)
        this.loading = false
        this.editFlightDialogVisible = false
        setTimeout(() => {
          this.$message.error('修改失敗，請再重試一次')
        }, 3000)
      })
    },
    editFlightDialogClosed () {},
    // 變更航班對話框
    showEditFlightDialogVisible (row) {
      this.editFlightDialogVisible = true
      console.log(row)
      this.editFlightForm.主單號 = row.主單號
      this.editFlightForm.date = row.起飛日
      // this.editFlightForm.確認班機 = row.確認班機
    },
    input () {
      this.$forceUpdate()
    },
    // 變更重量
    editWeight () {
      if (this.editWeightForm.確認重量.toString().trim() === '') {
        return this.$message.error('請輸入重量，不得為空')
      }
      // 變更重量請求
      console.log(
        {
          mawbNo: this.editWeightForm.主單號,
          weight: this.editWeightForm.確認重量
        }
      )
      this.loading = true
      ajax.post('/api/Mawb/confirmweight',
        {
          mawbNo: this.editWeightForm.主單號,
          weight: this.editWeightForm.確認重量
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
          // this.editWeightDialogVisible = false
          return this.$message.error(res.slice(6))
        }
        if (res === 'OK') this.$message.success('修改成功')
        this.editWeightDialogVisible = false
        setTimeout(() => {
          // this.queryFlight()
          this.getDailyData()
        }, 3000)
      }).catch(err => {
        console.log('flight err: ', err)
        this.loading = false
        this.editWeightDialogVisible = false
        setTimeout(() => {
          this.$message.error('修改失敗，請再重試一次')
        }, 3000)
      })
    },
    editWeightDialogClosed () {},
    // 變更重量對話框
    showEditWeightDialogVisible (row) {
      this.editWeightDialogVisible = true
      console.log(row)
      console.log('确认重量: ', row.確認重量)
      this.editWeightForm.主單號 = row.主單號
      this.editWeightForm.確認重量 = row.確認重量
    },
    // 實際重量變色
    actualWeight ({ row, column, rowIndex, columnIndex }) {
      // if (row.實際重 !== row.Gross重量) {
      //   if (columnIndex === 10) return 'actual-weight'
      // }
      if (row.重量警示 === 1) {
        if (columnIndex === 10) return 'actual-weight'
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
        if (item.MenuUID === parseInt(this.$refs.dailyPageRef.id)) {
          this.isEnableAdd = item.新增
          this.isEnableRemove = item.刪除
          this.isEnableModify = item.編輯
          this.isEnableQuery = item.查詢
          this.isEnableExport = item.匯出
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
        this.isEnableExport = true
      }
    },
    // 查詢，獲取日報表的數據
    reGetDailyData () {
      // if (this.formInline1.date === '' ||
      //     this.formInline1.mawbKind === ''
      // ) {
      //   this.$message.warning('請選擇起飛日和主單號類別')
      //   return
      // }
      this.loading = true
      ajax.get('/api/Reoprt/drp', {
        params: {
          DD: this.currentDateString,
          mawbKind: '',
          customCode: '',
          searchFor: ''
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then((res) => {
        this.loading = false
        // console.log('daily res: ', res)
        if (res.data.slice(0, 5) === 'Error') {
          return this.$message.error(`${res.data.slice(6)}`)
        }
        this.dailyDataList = res.data
        console.log('daily data: ', this.dailyDataList)
      }).catch(err => {
        console.log('daily err: ', err)
        this.loading = false
        this.$message.error('獲取日報表失敗，請刷新重試')
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
    // 匯入excel
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
      ajax.post('/api/Reoprt/impdrp',
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
        // setTimeout(() => {
        //   this.reGetDailyData()
        // }, 3000)
      }).catch(err => {
        console.log('import err: ', err)
        this.loading = false
        setTimeout(() => {
          this.$message.error('匯入失敗，請再重試一次')
        }, 3000)
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
    // 格式化excel filename
    frmExcelFilename () {
      return 'daily-' + parseInt(new Date().getTime() / 1000) + '.xlsx'
    },
    // 格式化pdf filename
    frmPdfFilename () {
      return 'daily-' + parseInt(new Date().getTime() / 1000) + '.pdf'
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
      if (this.formInline1.date === '' ||
          this.formInline1.mawbKind === ''
      ) {
        this.$message.warning('請選擇起飛日和主單號類別')
        return
      }
      // 匯出excel請求
      this.loading = true
      ajax.post('/api/Reoprt/expdrp',
        {
          DD: this.formInline1.date,
          // mawbKind: this.formInline1.mawbKind,
          mawbKind: this.formInline1.mawbKind === 'All' ? '' : this.formInline1.mawbKind,
          customCode: this.formInline1.customCode,
          searchFor: this.formInline1.searchValue,
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
      if (this.formInline1.date === '' ||
          this.formInline1.mawbKind === ''
      ) {
        this.$message.warning('請選擇起飛日和主單號類別')
        return
      }
      // 匯出請求
      // 匯出pdf請求
      this.loading = true
      ajax.post('/api/Reoprt/expdrp',
        {
          DD: this.formInline1.date,
          // mawbKind: this.formInline1.mawbKind,
          mawbKind: this.formInline1.mawbKind === 'All' ? '' : this.formInline1.mawbKind,
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
        console.log('pdf res: ', res)
        // this.eqDataList = data
        if (res.data.slice(0, 5) === 'Error') {
          return this.$message.error(`${res.data.slice(6)}`)
        }
        const b64data = res.data.split(',')[0]
        const file = this.b64toFile(b64data, 'test', 'application/pdf;charset=utf-8')
        // 利用FileSaver.js 下载文件为pdf文件
        FileSaver.saveAs(file, this.frmPdfFilename())
      }).catch(err => {
        console.log('pdf err: ', err)
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
      if (time === null) return
      time = time.replace('/', '-').replace('/', '-')
      return time.slice(0, 10)
    },
    // 查詢，獲取日報表的數據
    getDailyData () {
      // if (this.formInline1.date === '') {
      //   this.$message.warning('請選擇起飛日')
      //   return
      // }
      this.$refs.formInline1Ref.validate(valid => {
        if (!valid) return false
        this.loading = true
        ajax.get('/api/Reoprt/drp', {
          params: {
            DD: this.formInline1.date,
            mawbKind: this.formInline1.mawbKind === 'All' ? '' : this.formInline1.mawbKind,
            customCode: this.formInline1.customCode,
            searchFor: this.formInline1.searchValue
          },
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        }).then((res) => {
          this.loading = false
          // console.log('daily res: ', res)
          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(`${res.data.slice(6)}`)
          }
          this.dailyDataList = res.data
          console.log('daily data: ', this.dailyDataList)
        }).catch(err => {
          console.log('daily err: ', err)
          this.loading = false
          this.$message.error('獲取日報表失敗，請刷新重試')
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
.daily-container{
  .operator {
    margin-right: 10px;
  }
  padding-bottom: 20px;
  .pagination {
    text-align: center;
    .el-pagination {
      margin-top: 20px;
    }
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
    .actual-weight {
      color: red;
      font-weight: bold;
    }
  }
}
</style>
