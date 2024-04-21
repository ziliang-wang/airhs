<template>
  <div class="eq-container" id="20" ref="eqPageRef" v-loading="loading">
    <el-form :inline="true" :model="formInline1" :rules="formInline1Rules" class="form-inline1">
      <el-form-item label="起飛日期範圍" prop="dateRange">
        <el-date-picker
          v-model="formInline1.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          value-format="yyyy-MM-dd"
          unlink-panels
        >
        </el-date-picker>
        <!-- <el-input v-model="formInline.user" placeholder="审批人"></el-input> -->
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
        <!-- <el-input v-model="formInline1.mawbKind" placeholder="航空公司"></el-input> -->
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
    <el-form :inline="true">
      <el-form-item label="航班" prop="flight">
        <el-input v-model="formInline1.searchValue" placeholder="航班"></el-input>
      </el-form-item>
      <el-form-item>
        <span v-if="isEnableQuery">
          <el-button type="primary" @click="getEqData" class="queryBtn">查詢</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有查詢權限" type="primary" @click="getEqData" class="queryBtn">查詢</el-button>
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
          <el-button type="primary" disabled title="您沒有匯出權限" @click="exportPdf">匯出Pdf</el-button>
        </span>
      </el-form-item>
    </el-form>
    <table class="summary" width="80%" align="center">
      <tr>
        <td>起飛日期範圍 {{ dateRange[0] }} - {{ dateRange[1] }}</td>
        <td>裝載總重量 {{ totalLoadingWeight }}</td>
        <td>總板重 {{ totalBoardWeight }}</td>
        <td>總EQ {{ totalEq }}</td>
      </tr>
    </table>
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
      <el-table-column
        prop="客戶簡稱"
        label="客戶簡稱">
      </el-table-column>
      <el-table-column
        prop="主單號"
        label="主單號">
      </el-table-column>
      <el-table-column
        prop="航班"
        label="航班"
        width="180">
      </el-table-column>
      <el-table-column
        prop="日期"
        label="起飛日">
      </el-table-column>
      <el-table-column
        prop="板型"
        label="板型">
      </el-table-column>
      <el-table-column
        prop="實際重"
        label="實際重">
      </el-table-column>
      <el-table-column
        prop="板重"
        label="板重">
      </el-table-column>
      <el-table-column
        prop="EQ"
        label="EQ">
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
  name: 'Eq',
  computed: {
    // 所选日期范围
    dateRange () {
      return this.formInline1.dateRange
    },
    // 总Eq
    totalEq () {
      let eq = 0
      for (const item of this.eqDataList) {
        eq += item.EQ
      }
      return eq
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
        for (const subItem of item.detail) {
          totalWeight += item.實際重 + subItem.實際重
        }
      }
      return totalWeight
    },
    // 格式化eq列表
    frmEqDataList () {
      const dataList = []
      for (const item of this.eqDataList) {
        const data = {
          主單號: item.主單號,
          客戶簡稱: item.客戶簡稱,
          實際重: item.實際重,
          日期: this.frmDate(item.日期),
          板型: item.板型,
          板重: item.板重,
          航班: item.航班 !== '' ? item.航班.replace(' ', '') : item.航班,
          航空公司: item.航空公司,
          載具代碼: item.載具代碼,
          EQ: item.EQ
        }
        dataList.push(data)
        if (item.detail.length >= 1) {
          for (const subItem of item.detail) {
            const data = {
              主單號: subItem.主單號,
              客戶簡稱: subItem.客戶簡稱,
              實際重: subItem.實際重,
              日期: this.frmDate(subItem.日期),
              板型: subItem.板型,
              板重: subItem.板重,
              航班: item.航班 !== '' ? item.航班.replace(' ', '') : item.航班,
              航空公司: subItem.航空公司,
              載具代碼: subItem.載具代碼
            }
            dataList.push(data)
          }
        }
      }
      return dataList
    },
    // 分页total
    total () {
      return this.frmEqDataList.length
    },
    // 分页列表
    pageList: {
      get () {
        return this.frmEqDataList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
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
      loading: false,
      eqDataList: [],
      formInline1: {
        dateRange: [],
        mawbKind: '',
        customCode: '',
        searchValue: ''
      },
      formInline1Rules: {
        dateRange: [
          { required: true, message: '請選擇起始日期與終止日期' }
        ],
        mawbKind: [
          { required: true, message: '請選擇航空公司' }
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
        if (item.MenuUID === parseInt(this.$refs.eqPageRef.id)) {
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
      this.loading = true
      ajax.get('/api/User/auth', {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(res => {
        this.loading = false
        this.currentUserPermission = res.data
        console.log('user per: ', this.currentUserPermission)
        this.renderPermission()
      }).catch(err => {
        this.loading = false
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
      return 'eq-' + parseInt(new Date().getTime() / 1000) + '.xlsx'
    },
    // 格式化odf filename
    frmPdfFilename () {
      return 'eq-' + parseInt(new Date().getTime() / 1000) + '.pdf'
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
      if (this.formInline1.dateRange.length === 0 ||
          this.formInline1.mawbKind === ''
      ) {
        this.$message.warning('請先選擇日期範圍和主單號类型')
        return false
      }
      // 匯出excel請求
      this.loading = true
      ajax.post('/api/Reoprt/expeq',
        {
          SD: this.formInline1.dateRange[0],
          ED: this.formInline1.dateRange[1],
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
        console.log('excel res: ', res)
        // this.eqDataList = data
        if (res.data.slice(0, 5) === 'Error') {
          return this.$message.error(`${res.data.slice(6)}`)
        }
        const b64data = res.data.split(',')[0]
        const file = this.b64toFile(b64data, 'test', 'application/vnd.ms-excel;charset=utf-8')
        // 利用FileSaver.js 下载文件为Excel文件
        FileSaver.saveAs(file, this.frmExcelFilename())
      }).catch(err => {
        console.log('excel err: ', err)
        this.loading = false
        this.$message.error('匯出Excel失敗，請稍後重試')
      })
    },
    // 匯出pdf
    exportPdf () {
      if (this.formInline1.dateRange.length === 0 ||
          this.formInline1.mawbKind === ''
      ) {
        this.$message.warning('請先選擇日期範圍和主單號类型')
        return false
      }
      // 匯出請求
      // 匯出pdf請求
      this.loading = true
      ajax.post('/api/Reoprt/expeq',
        {
          SD: this.formInline1.dateRange[0],
          ED: this.formInline1.dateRange[1],
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
        if (res.data.slice(0, 5) === 'Error') {
          return this.$message.error(`${res.data.slice(6)}`)
        }
        const b64data = res.data.split(',')[0]
        const file = this.b64toFile(b64data, 'test', 'application/pdf;charset=utf-8')
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
    // 查詢，獲取Eq數據
    getEqData () {
      if (this.formInline1.dateRange.length === 0 ||
          this.formInline1.mawbKind === ''
      ) {
        this.$message.warning('請先選擇日期範圍和航空公司')
        return
      }
      // console.log(this.formInline1.dateRange[0])
      this.loading = true
      ajax.get('/api/Reoprt/eq', {
        params: {
          SD: this.formInline1.dateRange[0],
          ED: this.formInline1.dateRange[1],
          // mawbKind: this.formInline1.mawbKind,
          mawbKind: this.formInline1.mawbKind === 'All' ? '' : this.formInline1.mawbKind,
          customCode: this.formInline1.customCode,
          searchFor: this.formInline1.searchValue
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then((res) => {
        // console.log('eq res: ', res)
        // this.eqDataList = data
        this.loading = false
        if (res.data.slice(0, 5) === 'Error') {
          return this.$message.error(`${res.data.slice(6)}`)
        }
        this.eqDataList = res.data
        console.log('eq data: ', this.eqDataList)
      }).catch(err => {
        console.log('eq err: ', err)
        this.loading = false
        this.$message.error('獲取Eq資料失敗，請刷新重試')
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
.eq-container{
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
