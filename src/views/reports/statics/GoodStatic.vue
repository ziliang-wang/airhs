<template>
  <div class="goods-container" id="21" ref="goodsPageRef" v-loading="loading">
    <el-form :inline="true" :model="formInline1" :rules="formInline1Rules" class="form-inline1" ref="goodsRef">
      <el-form-item label="起飛月" prop="monthRange">
        <span v-if="isEnableMonth">
          <el-date-picker
            v-model.trim="formInline1.monthRange"
            type="month"
            placeholder="選擇月"
            value-format="yyyy-MM"
            @change="isEnableDay=false"
            @focus="monthEnableDay"
          >
        </el-date-picker>
        </span>
        <span v-else>
          <el-date-picker
            disabled
            v-model.trim="formInline1.monthRange"
            type="month"
            placeholder="選擇月"
            value-format="yyyy-MM"
          >
        </el-date-picker>
        </span>
      </el-form-item>
      <el-form-item label="起飛日" prop="dateRange">
        <span v-if="isEnableDay">
          <el-date-picker
            v-model="formInline1.dateRange"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="選擇日"
            @change="isEnableMonth=false"
            @focus="dayEnableMonth"
          >
          </el-date-picker>
        </span>
        <span v-else>
          <el-date-picker
            disabled
            v-model="formInline1.dateRange"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="選擇日"
          >
          </el-date-picker>
        </span>
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
        <!-- <el-input v-model="formInline1.mawbKind" placeholder="主單號"></el-input> -->
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
          <el-button type="primary" @click="getGoodsData" class="queryBtn">查詢</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有查詢權限" type="primary" @click="getGoodsData" class="queryBtn">查詢</el-button>
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
    <!-- tonnage區 -->
    <el-divider></el-divider>
    <el-tag>Tonnage</el-tag>
    <el-form :inline="true" class="tonnage" ref="tonnageRef">
      <el-form-item>
        <el-date-picker
          v-model="tonnageDateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          unlink-panels
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <span v-if="isEnableQuery">
          <el-button type="primary" class="queryBtn tonnageBtn" @click="queryTonnage">查詢TONNAGE</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有查詢權限" type="primary" class="queryBtn tonnageBtn" @click="queryTonnage">查詢TONNAGE</el-button>
        </span>
      </el-form-item>
      <el-form-item>
        <!-- 新增tonnage -->
        <span v-if="isEnableAdd">
          <el-button type="primary" class="" @click="addDialogVisible = true">新增/修改重量</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有新增權限" type="primary" class="" @click="addDialogVisible = true">新增/修改重量</el-button>
        </span>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" class="" @click="modifyTonnage">修改TONNAGE</el-button>
      </el-form-item> -->
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
    <div v-show="isShowMainTable">
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
          prop="起飛日"
          label="起飛日期">
        </el-table-column>
        <el-table-column
          prop="客戶簡稱"
          label="客戶名稱">
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
          prop="Tonnage"
          label="Tonnage">
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
      </div>
      <!-- // 分页区域 -->
    </div>
    <!-- // 主表 -->
    <!-- tonnage表 -->
    <div v-show="isShowTonnageTable">
      <el-table
        class="tonnage-table"
        :data="tonnagePageList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="主單號類型"
          label="主單號類型"
          width="200">
        </el-table-column>
        <el-table-column
          prop="日期"
          label="起飛月"
          width="200">
        </el-table-column>
        <el-table-column
          prop="重量"
          label="重量"
          width="200">
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <!-- 修改按鈕 -->
            <span>
              <el-button type="primary" class="operator" @click="showEditDialogVisible(scope.row)">修改</el-button>
            </span>
            <!-- <span v-else>
              <el-button disabled title="您沒有編輯權限" type="primary" icon="el-icon-edit" class="operator" @click="showEditDialogVisible(scope.row)"></el-button>
            </span> -->
            <!-- 刪除按鈕
            <span v-if="isEnableRemove">
              <el-button type="danger" icon="el-icon-delete" class="operator" @click="removeDestById(scope.row.UID)"></el-button>
            </span>
            <span v-else>
              <el-button disabled title="您沒有刪除權限" type="danger" icon="el-icon-delete" class="operator" @click="removeDestById(scope.row.UID)"></el-button>
            </span> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- tonnage分页区域 -->
      <div class="pagination">
        <el-pagination
          background
          :current-page="tonnageCurrentPage"
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="tonnageTotal"
          @current-change="tonnageCurrentChange"
        >
        </el-pagination>
      </div>
      <!-- // 分页区域 -->
    </div>
    <!-- // tonnage表 -->
    <!-- 新增tonnage -->
    <el-dialog
      title="新增TONNAGE"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="起飛月份" prop="month">
          <div style="width: 100%">
            <el-date-picker
              v-model.trim="addForm.month"
              type="month"
              placeholder="選擇月份"
              value-format="yyyy-MM"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <!-- <el-form-item label="起飛日期" prop="DD">
          <div style="width: 100%">
            <el-date-picker
              v-model.trim="addForm.DD"
              type="date"
              placeholder="選擇日期">
            </el-date-picker>
          </div>
        </el-form-item> -->
        <el-form-item label="航空公司" prop="mawbKind">
          <el-select v-model="addForm.mawbKind" placeholder="請選擇航空公司">
          <el-option
            v-for="item in airOptions"
            :key="item.mawbKind"
            :label="item.airline"
            :value="item.mawbKind">
          </el-option>
        </el-select>
          <!-- <el-input v-model.trim="addForm.mawbKind"></el-input> -->
        </el-form-item>
        <el-form-item label="重量" prop="weight">
          <el-input v-model.trim="addForm.weight"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTonnage">確 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改Tonnage -->
    <el-dialog
      title="修改TONNAGE"
      :visible.sync="editDialogVisible"
      width="50%"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="起飛日期" prop="日期">
          <el-input v-model.trim="editForm.日期"></el-input>
          <!-- <el-date-picker
            v-model.trim="editForm.DD"
            type="date"
            placeholder="選擇日期">
          </el-date-picker> -->
        </el-form-item>
        <el-form-item label="主單號" prop="主單號類型">
          <el-input v-model.trim="editForm.主單號類型"></el-input>
        </el-form-item>
        <el-form-item label="重量" prop="重量">
          <el-input v-model.trim="editForm.重量"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="modifyTonnage">確 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ajax } from '@/utils/ajax'
import FileSaver from 'file-saver'

export default {
  name: 'GoodStatic',
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
    // 格式化貨量統計列表
    frmGoodsDataList () {
      const dataList = []
      for (let i = 0; i < this.goodsDataList.length; i++) {
        const data = {
          客戶簡稱: this.goodsDataList[i].客戶簡稱,
          總計票數: this.goodsDataList[i].總計票數,
          起飛日: this.frmDate(this.goodsDataList[i].起飛日),
          總計重量: this.goodsDataList[i].總計重量,
          航空公司: this.goodsDataList[i].航空公司,
          Tonnage: this.isShowTonnage ? this.tonnageList[i].tonnage : 0
        }
        dataList.push(data)
      }
      // for (const item of this.goodsDataList) {
      //   const data = {
      //     客戶簡稱: item.客戶簡稱,
      //     總計票數: item.總計票數,
      //     起飛日: this.frmDate(item.起飛日),
      //     總計重量: item.總計重量,
      //     航空公司: item.航空公司,
      //     Tonnage: this.tonnage
      //   }
      //   dataList.push(data)
      // }
      return dataList
    },
    // 分页total
    total () {
      return this.frmGoodsDataList.length
    },
    // 分页列表
    pageList: {
      get () {
        return this.frmGoodsDataList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    },
    // tonnage分页total
    tonnageTotal () {
      return this.tonnageList.length
    },
    // tonnage分页列表
    tonnagePageList: {
      get () {
        return this.tonnageList.slice((this.tonnageCurrentPage - 1) * this.pageSize, this.tonnageCurrentPage * this.pageSize)
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
      // 是否显示tonnage
      isShowTonnage: false,
      tonnage: 0,
      // 總計重量
      totalWeightList: [],
      // 修改用表单
      editForm: {},
      // 新增對話框字段
      addForm: {
        DD: '',
        month: '',
        mawbKind: '',
        weight: ''
      },
      // 新增表單驗證規則
      addFormRules: {
        DD: [
          { required: true, message: '請選擇起飛日期', trigger: 'blur' }
        ],
        month: [
          { required: true, message: '請選擇起飛月份', trigger: 'blur' }
        ],
        mawbKind: [
          { required: true, message: '請選擇航空公司', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '請输入重量', trigger: 'blur' }
        ]
      },
      // 修改表單驗證規則
      editFormRules: {
        日期: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        主單號類型: [],
        重量: []
      },
      addDialogVisible: false,
      editDialogVisible: false,
      tonnageList: [],
      isShowTonnageTable: false,
      isShowMainTable: false,
      tonnageDateRange: [],
      isEnableMonth: true,
      isEnableDay: true,
      loading: false,
      goodsDataList: [],
      formInline1: {
        monthRange: '',
        dateRange: '',
        mawbKind: '',
        customCode: '',
        searchValue: ''
      },
      formInline1Rules: {
        monthRange: [],
        dateRange: [
          { required: false, message: '請選擇起飛日期', trigger: 'blur' }
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
      // tonnage当前页的页码
      tonnageCurrentPage: 1,
      sheetList: [],
      customerList: [],
      altTonnageFlag: false
    }
  },
  methods: {
    tonnageCurrentChange () {},
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
    // 变更tonnage页码
    toonnageCurrentChange (pageNum) {
      this.tonnageCurrentPage = pageNum
      console.log('tonnageCurrent page: ', this.tonnageCurrentPage)
    },
    // 渲染权限
    renderPermission () {
      for (const item of this.currentUserPermission) {
        // console.log('item: ', item)
        if (item.MenuUID === parseInt(this.$refs.goodsPageRef.id)) {
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
    // 修改tonnage对话框
    showEditDialogVisible (row) {
      this.editDialogVisible = true
      // console.log(row)
      this.editForm = row
      this.queryTonnage()
    },
    // 新增tonnage
    addTonnage () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return false
        this.addDialogVisible = false
        this.loading = true
        ajax.post('/api/Reoprt/tng',
          {
            // DD: this.addForm.DD,
            DD: this.addForm.month,
            mawbKind: this.addForm.mawbKind,
            weight: this.addForm.weight
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }).then((res) => {
          // console.log(res)
          this.loading = false
          console.log('add: ', res)
          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(res.data.slice(6))
          }
          if (res.data === 'OK') this.$message.success('新增成功')
          this.altTonnageFlag = true
          // this.isShowTonnageTable = true
          // this.isShowMainTable = false
          setTimeout(() => {
            this.queryTonnage()
          }, 0)
          setTimeout(() => {
            this.altTonnageFlag = false
          }, 1000)
        }).catch(err => {
          console.log('goods add err: ', err)
          this.loading = false
          this.addDialogVisible = false
          setTimeout(() => {
            this.$message.error('新增失敗，請再重試一次')
          }, 3000)
        })
      })
    },
    // 修改tonnage
    modifyTonnage () {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return false
        this.editDialogVisible = false
        this.loading = true
        ajax.post('/api/Reoprt/tng',
          {
            DD: this.editForm.日期,
            mawbKind: this.editForm.主單號類型,
            weight: this.editForm.重量
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }).then((res) => {
          // console.log(res)
          this.loading = false
          console.log('edit: ', res)
          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(res.data.slice(6))
          }
          if (res.data === 'OK') this.$message.success('修改成功')
          this.altTonnageFlag = true
          setTimeout(() => {
            this.queryTonnage()
          }, 0)
          setTimeout(() => {
            this.altTonnageFlag = false
          }, 1000)
        }).catch(err => {
          console.log('edit err: ', err)
          this.loading = false
          this.addDialogVisible = false
          setTimeout(() => {
            this.$message.error('修改失敗，請再重試一次')
          }, 3000)
        })
      })
    },
    // 查詢tonnage
    queryTonnage () {
      // if (!this.altTonnageFlag) return
      if (this.tonnageDateRange.length === 0) return this.$message.warning('請選擇開始日期與結束日期')
      // 查詢tonnage請求
      this.loading = true
      ajax.get('/api/Reoprt/tng', {
        params: {
          SD: this.tonnageDateRange[0],
          ED: this.tonnageDateRange[1]
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then((res) => {
        this.loading = false
        console.log('tonnage res: ', res)
        if (res.data.slice(0, 5) === 'Error') {
          return this.$message.error(`${res.data.slice(6)}`)
        }
        this.tonnageList = res.data
        this.isShowTonnage = true
        // 取出所有航空公司的Tonnage
        for (let i = 0; i < this.tonnageList.length; i++) {
          this.tonnageList[i].tonnage = this.tonnage
          // this.tonnageList[i].tonnage = this.totalWeight === 0 ? 0 : this.tonnageList[i].重量 - this.totalWeight
          this.tonnageList[i].tonnage = this.totalWeightList[i] === 0 ? 0 : this.tonnageList[i].重量 - this.totalWeightList[i]
          // this.tonnage = this.totalWeight === 0 ? 0 : this.tonnageList[i].重量 - this.totalWeight
          // this.tonnage = this.totalWeightList[i] === 0 ? 0 : this.tonnageList[i].重量 - this.totalWeightList[i]
        }
        console.log(this.tonnageList)
        // 新增/修改重量与tonnage查询的切换
        if (this.altTonnageFlag) {
          this.isShowTonnageTable = true
          this.isShowMainTable = false
        } else {
          this.isShowTonnageTable = false
          this.isShowMainTable = true
        }
        // this.altTonnageFlag = !this.altTonnageFlag
      }).catch(err => {
        this.loading = false
        console.log('tonnage err: ', err)
        this.$message.error('獲取貨量統計失敗，請刷新重試')
      })
    },
    monthEnableDay () {
      this.isEnableDay = true
      this.formInline1.dateRange = ''
    },
    dayEnableMonth () {
      this.isEnableMonth = true
      this.formInline1.monthRange = ''
    },
    // 格式化excel filename
    frmExcelFilename () {
      return '貨量統計-' + parseInt(new Date().getTime() / 1000) + '.xlsx'
    },
    // 格式化pdf filename
    frmPdfFilename () {
      return '貨量統計-' + parseInt(new Date().getTime() / 1000) + '.pdf'
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
      if (this.formInline1.dateRange === '' && this.formInline1.monthRange === ''
      ) {
        this.$message.warning('請選擇起飛日期')
        return false
      }
      // 匯出excel請求
      this.loading = true
      ajax.post('/api/Reoprt/expcv',
        {
          DD: this.formInline1.monthRange || this.formInline1.dateRange,
          // mawbKind: this.formInline1.mawbKind,
          mawbKind: this.formInline1.mawbKind === 'All' ? '' : this.formInline1.mawbKind,
          customCode: this.formInline1.customCode,
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
        // FileSaver.open(file, this.frmExcelFilename())
      }).catch(err => {
        console.log('excel err: ', err)
        this.loading = false
        this.$message.error('匯出Excel失敗，請稍後重試')
      })
    },
    // 匯出pdf
    exportPdf () {
      // if (this.formInline1.dateRange.length === 0 ||
      //     this.formInline1.mawbKind === ''
      // ) {
      //   this.$message.warning('請先選擇日期範圍和主單號類型')
      //   return false
      // }
      // 匯出請求
      // 匯出pdf請求
      this.loading = true
      ajax.post('/api/Reoprt/expcv',
        {
          DD: this.formInline1.monthRange || this.formInline1.dateRange,
          // mawbKind: this.formInline1.mawbKind,
          mawbKind: this.formInline1.mawbKind === 'All' ? '' : this.formInline1.mawbKind,
          customCode: this.formInline1.customCode,
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
        // 利用FileSaver.js 下载文件为pdf文件
        FileSaver.saveAs(file, this.frmPdfFilename())
      }).catch(err => {
        console.log('pdf err: ', err)
        this.loading = false
        this.$message.error('匯出Pdf失敗，請稍後重試')
      })
    },
    // 格式化日期
    frmDate (time) {
      if (time === null) return false
      return time.slice(0, 10)
    },
    // 查詢，獲取貨量統計的數據
    getGoodsData () {
      this.$refs.goodsRef.validate(valid => {
        if (this.formInline1.monthRange === '' && this.formInline1.dateRange === '') {
          this.$message.warning('請選擇起飛月或起飛日')
          return
        }
        if (!valid) return false
        this.isEnableMonth = true
        this.isEnableDay = true
        this.loading = true
        ajax.get('/api/Reoprt/cv', {
          params: {
            DD: this.formInline1.monthRange || this.formInline1.dateRange,
            // mawbKind: this.formInline1.mawbKind,
            mawbKind: this.formInline1.mawbKind === 'All' ? '' : this.formInline1.mawbKind,
            customCode: this.formInline1.customCode
          },
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        }).then((res) => {
          this.loading = false
          // console.log('goods res: ', res)
          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(`${res.data.slice(6)}`)
          }
          this.goodsDataList = res.data
          this.isShowMainTable = true
          this.isShowTonnageTable = false
          // 每一笔的货量统计
          for (let i = 0; i < this.goodsDataList.length; i++) {
            if (this.goodsDataList.length === 0) {
              for (let j = 0; j < this.totalWeightList.length; j++) {
                this.totalWeightList[j] = 0
              }
            } else {
              this.totalWeightList[i] = this.goodsDataList[i].總計重量
            }
          }
          console.log('goods data: ', this.goodsDataList)
        }).catch(err => {
          console.log('goods err: ', err)
          this.loading = false
          this.$message.error('無法獲取該航空公司的貨量統計')
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
.goods-container{
  padding-bottom: 20px;
  .el-tag {
   font-size: 20px;
   margin-bottom: 10px;
 }
  .pagination {
    text-align: center;
    .el-pagination {
      margin-top: 20px;
    }
  }
  .queryBtn {
    background-color: rgb(252, 80, 0);
    border: 1px solid rgb(252, 80, 0);
  }
  .tonnageBtn {
    margin-left: 10px;
    transform: translateY(-1.5px);
  }
  .el-form-item__label {
  }
  .tonnage {
    // background-color: #eee;
    // margin-bottom: 10px;
    // height: 60;
    // line-height: 60px;
    // display: flex;
    // align-items: center;
  }
  .main-table {

  }
}
</style>
