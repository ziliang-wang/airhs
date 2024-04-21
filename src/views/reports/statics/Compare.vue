<template>
  <div class="compare-container" id="22" ref="comparePageRef" v-loading="loading">
    <el-form :inline="true" :model="formInline1" :rules="formInline1Rules" ref="formInline1Ref" class="form-inline1">
      <el-form-item label="月份" prop="month">
        <el-date-picker
          v-model.trim="formInline1.month"
          type="month"
          value-format="yyyy-MM"
          placeholder="選擇月"
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
      </el-form-item>
      <el-form-item label="比較形式" prop="compare">
        <el-select v-model="formInline1.selectedValue" placeholder="請選擇比較形式">
          <el-option
            v-for="item in formInline1.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
      <el-form-item>
        <span v-if="isEnableQuery">
          <el-button type="primary" @click="getCompareData" class="queryBtn">查詢</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有查詢權限" type="primary" @click="getCompareData" class="queryBtn">查詢</el-button>
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
      style="width: 100%">
      <el-table-column
        prop="航空公司"
        label="航空公司"
        width="100">
      </el-table-column>
      <!-- <el-table-column
        prop="客戶簡稱"
        label="客戶名稱">
      </el-table-column> -->
      <el-table-column
        prop="月份"
        label="月份">
      </el-table-column>
      <el-table-column
        prop="總計重量"
        label="總計重量">
      </el-table-column>
      <el-table-column
        prop="總計票數"
        label="總計票數">
      </el-table-column>
      <el-table-column
        prop="重量成長率"
        label="重量成長率">
      </el-table-column>
      <el-table-column
        prop="票數成長率"
        label="票數成長率">
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
  name: 'Compare',
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
    // 分页total
    total () {
      return this.compareDataList.length
    },
    // 分页列表
    pageList: {
      get () {
        return this.compareDataList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    },
    // 主單號類型對應航空公司
    airOptions () {
      const dataList = []
      for (const item of this.sheetList) {
        const data = {
          mawbKind: item.代碼,
          airline: item.名稱
        }
        dataList.push(data)
      }
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
      // compareRules: {
      //   compare: [{ required: true, message: '請選擇比較形式', trigger: 'blur' }]
      // },
      // selectedValue: '',
      // options: [
      //   {
      //     value: '0',
      //     label: '月'
      //   },
      //   {
      //     value: '1',
      //     label: '季'
      //   },
      //   {
      //     value: '2',
      //     label: '年'
      //   }
      // ],
      loading: false,
      compareDataList: [],
      eqDataList: [],
      formInline1: {
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
        selectedValue: '',
        month: '',
        dateRange: [],
        mawbKind: '',
        customCode: '',
        searchValue: ''
      },
      formInline1Rules: {
        month: [
          { required: false, message: '請選擇月份', trigger: 'blur' }
        ],
        mawbKind: [
          { required: false, message: '請選擇航空公司', trigger: 'blur' }
        ],
        compare: [
          { required: false, message: '請選擇比較形式', trigger: 'blur' }
        ]
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
      customerList: []
    }
  },
  methods: {
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
    test () {
      console.log(this.formInline1.selectedValue)
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
        if (item.MenuUID === parseInt(this.$refs.comparePageRef.id)) {
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
    // 格式化excel filename
    frmExcelFilename () {
      return 'compare-' + parseInt(new Date().getTime() / 1000) + '.xlsx'
    },
    // 格式化pdf filename
    frmPdfFilename () {
      return 'compare-' + parseInt(new Date().getTime() / 1000) + '.pdf'
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
          // mawbKind: this.formInline1.mawbKind,
          mawbKind: this.formInline1.mawbKind === 'All' ? '' : this.formInline1.mawbKind,
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
      // 匯出pdf請求
      this.loading = true
      ajax.post('/api/Reoprt/expcpe',
        {
          Month: this.formInline1.month,
          // mawbKind: this.formInline1.mawbKind,
          mawbKind: this.formInline1.mawbKind === 'All' ? '' : this.formInline1.mawbKind,
          customCode: this.formInline1.customCode,
          cpeKind: this.selectedValue,
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
        if (res.data.slice(0, 5) === 'Error') {
          return this.$message.error(`${res.data.slice(6)}`)
        }
        const b64data = res.data.split(',')[0]
        const file = this.b64toFile(b64data, 'test', 'application/pdf;charset=utf-8')
        // 利用FileSaver.js 下载文件为Excel文件
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
      if (time === null) return false
      return time.slice(0, 10)
    },
    // 查詢，獲取同期比較的數據
    getCompareData () {
      if (this.formInline1.month === '' ||
          this.formInline1.selectedValue === '' ||
          this.formInline1.mawbKind === ''
      ) {
        this.$message.warning('請選擇月份/航空公司/比較形式')
        return
      }
      this.$refs.formInline1Ref.validate(valid => {
        // if (!valid) return false
        this.loading = true
        ajax.get('/api/Reoprt/cpe', {
          params: {
            Month: this.formInline1.month,
            mawbKind: this.formInline1.mawbKind === 'All' ? '' : this.formInline1.mawbKind,
            customCode: this.formInline1.customCode,
            cpeKind: parseInt(this.formInline1.selectedValue)
          },
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        }).then((res) => {
          this.loading = false
          // console.log('compare res: ', res)
          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(`${res.data.slice(6)}`)
          }
          this.compareDataList = res.data
          console.log('compare data: ', this.compareDataList)
        }).catch(err => {
          console.log('compare err: ', err)
          this.loading = false
          this.$message.error('獲取同期比較資料失敗，請刷新重試')
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
.compare-container{
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
    margin-top: 20px;
  }
}
</style>
