<template>
  <div class="currence-container" id="15" ref="onsitePageRef" v-loading="loading">
    <!-- <el-form :inline="true" :model="bookingInfo" :rules="bookingInfoRules" ref="bookingInfoRef">
      <el-tag style="margin-bottom: 20px;">操作列表</el-tag>
      <br> -->
      <!-- <el-form-item label="訂倉單號" prop="sheetNum">
        <el-input v-model.trim="bookingInfo.sheetNum" placeholder="訂倉單號"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="客户代號" prop="customCode">
        <el-input v-model.trim="bookingInfo.customCode" placeholder="客戶代號"></el-input>
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
      </el-form-item> -->
      <!-- <br> -->
      <!-- <el-form-item label="目的地" prop="destination">
        <el-input v-model.trim="bookingInfo.destination" placeholder="目的地"></el-input>
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
        <el-input v-model="bookingInfo.flight" placeholder="預定班機"></el-input>
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
      <el-form-item label="倉儲" prop="wareHouse">
        <el-input v-model.trim="bookingInfo.wareHouse" placeholder="倉儲"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="備註" prop="remark">
        <el-input v-model.trim="bookingInfo.remark" placeholder="備註"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="booking">分配</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider> -->
    <!-- 查詢現場操作 -->
    <el-form :inline="true" :model="formInline1" :rules="formInline1Rules" ref="formInline1Ref" class="form-inline1">
      <el-tag style="margin-bottom: 20px;">操作列表</el-tag>
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
      <el-form-item label="查詢天數" prop="days">
        <el-input v-model.trim="formInline1.days" placeholder="查詢天數"></el-input>
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
      <el-form-item label="客戶簡稱" prop="customCode">
        <el-select v-model="formInline1.customCode" placeholder="請選擇客戶">
          <el-option
            v-for="item in custOptions"
            :key="item.customCode"
            :label="item.customName"
            :value="item.customCode">
          </el-option>
        </el-select>
        <!-- <el-input v-model.trim="formInline1.customCode" placeholder="客戶代號"></el-input> -->
      </el-form-item>
      <el-form-item label="實際重量輸入狀態" prop="allocation">
        <el-select v-model.trim="formInline1.allocation" placeholder="請選擇">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <span v-if="isEnableQuery">
          <el-button type="primary" @click="getBookingData" class="queryBtn">查詢</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有查詢權限" type="primary" @click="getBookingData" class="queryBtn">查詢</el-button>
        </span>
      </el-form-item>
    </el-form>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 合并主单号 -->
    <el-tag>合併主單號</el-tag>
    <el-form :inline="true" class="mergeForm" ref="mergeFormRef">
      <el-form-item label="主單號" prop="">
        <el-select v-model="merge.mergeValue1" placeholder="請選擇主單號">
          <el-option
            v-for="item in mergeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="併入的主單號" prop="">
        <el-select v-model="merge.mergeValue2" placeholder="請選擇併入的主單號">
          <el-option
            v-for="item in mergeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <span v-if="isEnableAdd">
          <el-button type="primary" @click="mergeSheet" class="queryBtn">合併</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有合併權限" type="primary" @click="mergeSheet" class="queryBtn">合併</el-button>
        </span>
      </el-form-item>
    </el-form>
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
        label="客戶"
        width="100">
      </el-table-column>
      <el-table-column
        prop="主單號"
        label="主單號"
        width="100">
      </el-table-column>
      <el-table-column
        prop="目的地"
        label="目的地"
        width="100">
      </el-table-column>
      <el-table-column
        prop="預排日期"
        label="預排日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="預排航班"
        label="預排航班"
        width="100">
      </el-table-column>
      <el-table-column
        prop="貨種"
        label="貨物種類"
        width="100">
      </el-table-column>
      <el-table-column
        prop="載具"
        label="載具"
        width="100">
      </el-table-column>
      <el-table-column
        prop="件數"
        label="件數"
        width="100">
      </el-table-column>
      <el-table-column
        prop="訂倉重"
        label="訂倉重量"
        width="100">
      </el-table-column>
      <el-table-column
        prop="實際重"
        label="實際重量"
        width="100">
      </el-table-column>
      <el-table-column
        prop="倉儲"
        label="倉儲"
        width="100">
      </el-table-column>
      <el-table-column
        prop="備註"
        label="備註"
        width="100">
      </el-table-column>
      <!-- 表格操作区 -->
      <el-table-column label="操作" width="700">
              <template #default="scope">
                <!-- 修改實際重量按鈕 -->
                <span v-if="isEnableModify">
                  <el-button type="danger" class="operator" @click="showEditWeightDialogVisible(scope.row)">修改實際重量</el-button>
                </span>
                <span v-else>
                  <el-button disabled title="您沒有修改權限" type="danger" class="operator" @click="showEditWeightDialogVisible(scope.row)">修改實際重量</el-button>
                </span>
                <!-- 刪除主單號按鈕 -->
                <span v-if="isEnableRemove">
                  <el-button type="danger" class="operator" @click="removeMainSheetByNum(scope.row.主單號)">取消主單號</el-button>
                </span>
                <span v-else>
                  <el-button disabled title="您沒有刪除權限" type="danger" class="operator" @click="removeMainSheetByNum(scope.row.主單號)">取消主單號</el-button>
                </span>
                <!-- 修改载具按鈕 -->
                <span v-if="isEnableModify">
                   <el-button type="primary" class="operator" @click="showEditDialogVisible(scope.row)">修改載具</el-button>
                </span>
                <span v-else>
                   <el-button disabled title="您沒有修改權限" type="primary" class="operator" @click="showEditDialogVisible(scope.row)">修改載具</el-button>
                </span>
                <!-- 修改客户按鈕 -->
                <span v-if="isEnableModify">
                   <el-button type="primary" class="operator" @click="showEditCustDialogVisible(scope.row)">修改客户</el-button>
                </span>
                <span v-else>
                   <el-button disabled title="您沒有修改權限" type="primary" class="operator" @click="showEditCustDialogVisible(scope.row)">修改客户</el-button>
                </span>
                <!-- 修改航班按鈕 -->
                <span v-if="isEnableModify">
                   <el-button type="primary" class="operator" @click="showEditFlightDialogVisible(scope.row)">修改航班</el-button>
                </span>
                <span v-else>
                   <el-button disabled title="您沒有修改權限" type="primary" class="operator" @click="showEditFlightDialogVisible(scope.row)">修改航班</el-button>
                </span>
                <!-- 权限控管按鈕 -->
                <!-- <span v-show="isAdmin">
                  <el-button type="warning" class="permission" @click="showPermissionDialogVisible(scope.row.Account)">權限設置</el-button>
                </span> -->
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
    <!-- 修改實際重量 -->
    <el-dialog
      title="修改實際重量"
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
        <el-form-item label="實際重量" prop="實際重量">
          <el-input ref="loaderRef" v-model.trim="editWeightForm.實際重" placeholder="實際重量" @input="input"></el-input>
        </el-form-item>
        <!-- <el-form-item label="姓名" prop="名稱">
          <el-input v-model.trim="editForm.名稱"></el-input>
        </el-form-item> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editWeightDialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="editActualWeight">確 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改载具 -->
    <el-dialog
      title="修改載具"
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
        <el-form-item label="主單號" prop="">
          <el-input v-model.trim="editForm.主單號" placeholder="主單號" disabled></el-input>
        </el-form-item>
        <el-form-item label="載具" prop="載具">
          <el-input ref="loaderRef" v-model.trim="editForm.載具" placeholder="載具" @input="input"></el-input>
        </el-form-item>
        <!-- <el-form-item label="姓名" prop="名稱">
          <el-input v-model.trim="editForm.名稱"></el-input>
        </el-form-item> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="editLoader">確 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改客户 -->
    <el-dialog
      title="修改客户"
      :visible.sync="editCustDialogVisible"
      width="50%"
      @close="editCustDialogClosed"
    >
      <el-form
        :model="editCustForm"
        :rules="editCustFormRules"
        ref="editCustFormRef"
        label-width="70px"
      >
        <el-form-item label="主單號" prop="">
          <el-input v-model.trim="editCustForm.主單號" placeholder="主單號" disabled></el-input>
        </el-form-item>
        <el-form-item label="客戶代號" prop="">
          <el-input ref="custRef" v-model.trim="editCustForm.客戶代號" placeholder="請輸入客户代號" @input="input"></el-input>
        </el-form-item>
        <el-form-item label="對照" prop="">
          <ul>
            <li v-for="item of customerList" :key="item.客戶代號">
              {{ item.客戶簡稱 }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.客戶代號 }}
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editCustDialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="editCust">確 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改航班 -->
    <el-dialog
      title="修改航班"
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
        <el-form-item label="航班日期" prop="">
        <el-date-picker
          v-model.trim="editFlightForm.預排日期"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="請選擇航班日期"
        >
        </el-date-picker>
      </el-form-item>
        <el-form-item label="航班號嗎" prop="">
          <el-input ref="flightRef" v-model.trim="editFlightForm.預排航班" placeholder="航班號碼" @input="input"></el-input>
        </el-form-item>
        <!-- <el-form-item label="姓名" prop="名稱">
          <el-input v-model.trim="editForm.名稱"></el-input>
        </el-form-item> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editFlightDialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="editFlight">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ajax } from '@/utils/ajax'
import FileSaver from 'file-saver'

export default {
  name: 'Currence',
  computed: {
    // merge選項
    mergeOptions () {
      const dataList = []
      for (const item of this.onsiteDataList) {
        if (item.主單號 === null || item.主單號 === '') continue
        const data = {
          value: item.主單號,
          label: item.主單號
        }
        dataList.push(data)
      }
      return dataList
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
    // 格式化现场操作查詢列表
    frmOnsiteDataList () {
      const dataList = []
      for (const item of this.onsiteDataList) {
        const data = {
          航空公司: item.航空公司,
          客戶代號: item.客戶代號,
          客戶簡稱: item.客戶簡稱,
          主單號: item.主單號,
          目的地: item.目的地,
          預排航班: item.預排航班,
          預排日期: this.frmDate(item.預排日期),
          貨種: item.貨種,
          載具: this.frmLoader(item.載具),
          件數: item.件數,
          訂倉重: item.訂倉重,
          實際重: item.實際重,
          倉儲: item.倉儲,
          備註: item.備註
        }
        dataList.push(data)
      }
      return dataList
    },
    // 分页total
    total () {
      return this.frmOnsiteDataList.length
    },
    // 分页列表
    pageList: {
      get () {
        return this.frmOnsiteDataList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    },
    // 主單號類型對應航空公司
    airOptions () {
      const dataList = []
      for (const item of this.sheetList) {
        if (item.代碼 === 'All') continue
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
    const chkNum = (rule, value, callback) => {
      if (value <= 0) {
        return callback(new Error('數量不得為0或空'))
      } else if (isNaN(value)) {
        return callback(new Error('請輸入數字'))
      }
      callback()
    }
    return {
      // 合併主單號
      merge: {
        mergeValue1: '',
        mergeValue2: ''
      },
      editFlightDialogVisible: false,
      editWeightForm: {},
      editFlightForm: {},
      editFlightFormRules: {},
      editCustForm: {},
      editCustFormRules: {},
      editCustDialogVisible: false,
      editWeightFormRules: {},
      editFormRules: {
        載具: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ]
      },
      editForm: {},
      editDialogVisible: false,
      // 分配狀態
      options: [
        {
          value: '0',
          label: '未輸入'
        },
        {
          value: '1',
          label: '已輸入'
        }
      ],
      // 定倉信息
      bookingInfo: {
        // 訂倉單號
        sheetNum: '',
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
        sheetNum: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        wareHouse: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        depatureTime: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        customCode: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        mawbKind: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        destination: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        flight: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        kind: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        loader: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        piece: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ]
      },
      compareRules: {
        compare: [{ required: true, message: '請選擇比較形式', trigger: 'blur' }]
      },
      selectedValue: '',
      loading: false,
      onsiteDataList: [],
      allocationDataList: [],
      custDataList: [],
      bookingDataList: [],
      compareDataList: [],
      eqDataList: [],
      formInline1: {
        allocation: '',
        date: '',
        days: '',
        month: '',
        dateRange: [],
        mawbKind: '',
        customCode: '',
        searchValue: ''
      },
      formInline1Rules: {
        allocation: [
          { required: true, message: '請選擇分配狀態', trigger: 'blur' }
        ],
        search: [],
        date: [
          { required: true, message: '請選擇日期', trigger: 'blur' }
        ],
        days: [
          { required: true, validator: chkNum, trigger: 'blur' }
        ],
        month: [
          { required: true, message: '請選擇月份', trigger: 'blur' }
        ],
        mawbKind: [
          { required: true, message: '請輸入主單號類型', trigger: 'blur' }
        ],
        customCode: [{ required: false, message: '請輸入客戶代號', trigger: 'blur' }]
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
      customerList: [],
      editWeightDialogVisible: false
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
        this.sheetList = data.reverse()
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
        if (item.MenuUID === parseInt(this.$refs.onsitePageRef.id)) {
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
    mergeSheet () {
      if (this.merge.mergeValue1 === this.merge.mergeValue2) {
        return this.$message.warning('兩者單號不可以一樣喔')
      }
      console.log('merge1: ', this.merge.mergeValue1)
      console.log('merge2: ', this.merge.mergeValue2)
      // 發起合併請求
      this.loading = true
      ajax.post('/api/Operate/onosite_merge',
        {
          mawbNo: this.merge.mergeValue1,
          merge_mawbNo: this.merge.mergeValue2
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        }).then(({ data }) => {
        this.loading = false
        // console.log('merge res: ', res)
        const res = data
        console.log(res)
        if (res.slice(0, 5) === 'Error') {
          return this.$message.error(res.slice(6))
        }
        if (res === 'OK') this.$message.success('合併成功')
        setTimeout(() => {
          this.getBookingData()
        }, 3000)
      }).catch(err => {
        console.log('merge err: ', err)
        this.loading = false
        setTimeout(() => {
          this.$message.error('合併失敗，請再重試一次')
        }, 3000)
      })
    },
    // 载具过滤
    frmLoader (loader) {
      if (loader === null) loader = ''

      if (loader !== '') {
        if (loader.charAt(0) === '1') {
          // 不显示载具数量
          // return loader.slice(1)
        }
        return loader
      }
      return loader
    },
    editFlightDialogClosed () {},
    editCustDialogClosed () {},
    blur () {
      if (this.editForm.載具 !== '') {
        this.editFormRules = {}
        // console.log(document.querySelector('el-form-item__error'))
        // console.log(this.$refs.loaderRef)
      }
    },
    input () {
      this.$forceUpdate()
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editWeightDialogClosed () {},
    // 修改實際重量
    async editActualWeight () {
      await this.$refs.editWeightFormRef.validate(valid => {
        console.log(this.editWeightForm.主單號)
        if (!valid) return false
        this.editWeightDialogVisible = false
        this.loading = true
        // 修改實際重量請求
        // console.log(
        //   {
        //     mawbNo: this.editWeightForm.主單號,
        //     weight: this.editWeightForm.實際重
        //   }
        // )
        // console.log(
        //   JSON.stringify(
        //     {
        //       mawbNo: this.editWeightForm.主單號,
        //       weight: this.editWeightForm.實際重
        //     }
        //   )
        // )
        ajax.post('/api/Operate/onosite_weight',
          {
            mawbNo: this.editWeightForm.主單號,
            weight: this.editWeightForm.實際重
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
          setTimeout(() => {
            this.getBookingData()
          }, 3000)
        }).catch(err => {
          console.log('Weight err: ', err)
          this.loading = false
          this.editWeightDialogVisible = false
          setTimeout(() => {
            this.$message.error('修改失敗，請再重試一次')
          }, 3000)
        })
      })
    },
    // 修改實際重量對話框
    showEditWeightDialogVisible (row) {
      this.editWeightDialogVisible = true
      console.log(row)
      this.editWeightForm.主單號 = row.主單號
      this.editWeightForm.實際重 = row.實際重
      this.getBookingData()
    },
    // 修改航班
    async editFlight () {
      await this.$refs.editFlightFormRef.validate(valid => {
        console.log(this.editFlightForm.主單號)
        if (!valid) return false
        this.editFlightDialogVisible = false
        this.loading = true
        // 修改航班請求
        ajax.post('/api/Operate/onosite_flight',
          {
            mawbNo: this.editFlightForm.主單號,
            flightDate: this.editFlightForm.預排日期,
            flightNo: this.editFlightForm.預排航班
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
          setTimeout(() => {
            this.getBookingData()
          }, 3000)
        }).catch(err => {
          console.log('flight err: ', err)
          this.loading = false
          this.editFlightDialogVisible = false
          setTimeout(() => {
            this.$message.error('修改失敗，請再重試一次')
          }, 3000)
        })
      })
    },
    // 修改客户
    async editCust () {
      await this.$refs.editCustFormRef.validate(valid => {
        console.log(this.editCustForm.主單號)
        if (!valid) return false
        this.editCustDialogVisible = false
        this.loading = true
        // 修改客户請求
        ajax.post('/api/Operate/onosite_custom',
          {
            mawbNo: this.editCustForm.主單號,
            customCode: this.editCustForm.客戶代號
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
          setTimeout(() => {
            this.getBookingData()
          }, 3000)
        }).catch(err => {
          console.log('cust err: ', err)
          this.loading = false
          this.editCustDialogVisible = false
          setTimeout(() => {
            this.$message.error('修改失敗，請再重試一次')
          }, 3000)
        })
      })
    },
    // 修改載具
    async editLoader () {
      await this.$refs.editFormRef.validate(valid => {
        console.log(this.editForm.載具)
        if (!valid) return false
        this.editDialogVisible = false
        this.loading = true
        // 修改載具請求
        ajax.post('/api/Operate/onosite_vehs',
          {
            mawbNo: this.editForm.主單號,
            vehs: this.editForm.載具
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
          setTimeout(() => {
            this.getBookingData()
          }, 3000)
        }).catch(err => {
          console.log('loader err: ', err)
          this.loading = false
          this.editDialogVisible = false
          setTimeout(() => {
            this.$message.error('修改失敗，請再重試一次')
          }, 3000)
        })
      })
    },
    // 修改客户對話框
    showEditCustDialogVisible (row) {
      // this.editForm = {}
      this.editCustDialogVisible = true
      console.log(row)
      this.editCustForm.主單號 = row.主單號
      this.editCustForm.客戶代號 = row.客戶代號
      this.editCustForm.客戶簡稱 = row.客戶簡稱
      this.getBookingData()
      // ajax.get('/api/User', {
      //   params: {
      //     account: row
      //   },
      //   headers: {
      //     Authorization: 'Bearer ' + this.token
      //   }
      // }).then(res => {
      //   this.editForm = res.data[0]
      //   this.editForm.Password = ''
      //   // 禁止非supervisor修改supervisor
      //   if (this.editForm.Account === 'supervisor' && this.nameid !== 'supervisor') {
      //     this.$message.warning('禁止修改supervisor')
      //     return
      //   }
      //   this.editDialogVisible = true
      //   // console.log(this.editForm)
      // }).catch(err => {
      //   console.log('edit err: ', err)
      // })
    },
    // 修改航班對話框
    showEditFlightDialogVisible (row) {
      // this.editForm = {}
      this.editFlightDialogVisible = true
      console.log(row)
      this.editFlightForm.主單號 = row.主單號
      this.editFlightForm.預排日期 = row.預排日期
      this.editFlightForm.預排航班 = row.預排航班
      this.getBookingData()
      // ajax.get('/api/User', {
      //   params: {
      //     account: row
      //   },
      //   headers: {
      //     Authorization: 'Bearer ' + this.token
      //   }
      // }).then(res => {
      //   this.editForm = res.data[0]
      //   this.editForm.Password = ''
      //   // 禁止非supervisor修改supervisor
      //   if (this.editForm.Account === 'supervisor' && this.nameid !== 'supervisor') {
      //     this.$message.warning('禁止修改supervisor')
      //     return
      //   }
      //   this.editDialogVisible = true
      //   // console.log(this.editForm)
      // }).catch(err => {
      //   console.log('edit err: ', err)
      // })
    },
    // 修改载具對話框
    showEditDialogVisible (row) {
      // this.editForm = {}
      this.editDialogVisible = true
      console.log(row)
      this.editForm.主單號 = row.主單號
      this.editForm.載具 = row.載具
      this.getBookingData()
      // ajax.get('/api/User', {
      //   params: {
      //     account: row
      //   },
      //   headers: {
      //     Authorization: 'Bearer ' + this.token
      //   }
      // }).then(res => {
      //   this.editForm = res.data[0]
      //   this.editForm.Password = ''
      //   // 禁止非supervisor修改supervisor
      //   if (this.editForm.Account === 'supervisor' && this.nameid !== 'supervisor') {
      //     this.$message.warning('禁止修改supervisor')
      //     return
      //   }
      //   this.editDialogVisible = true
      //   // console.log(this.editForm)
      // }).catch(err => {
      //   console.log('edit err: ', err)
      // })
    },
    // 取消主單號
    async removeMainSheetByNum (num) {
      // // 禁止刪除supervisor
      // if (id === 40) {
      //   this.$message.warning('禁止刪除supervisor')
      //   return
      // }

      console.log(num)
      // console.log(typeof id)
      const confirmResult = await this.$confirm('此操作將取消該主號, 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.success('已取消該操作')
      }

      // todo 取消主單號請求
      this.loading = true
      ajax.post('/api/Operate/onosite_cancel',
        {
          mawbNo: num
        },
        {
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + this.token
          }
        }
      ).then(({ data }) => {
        this.loading = false
        const res = data
        if (res.slice(0, 5) === 'Error') {
          return this.$message.error(res.slice(6))
        }
        if (res === 'OK') this.$message.success('取消主單號成功')
        setTimeout(() => {
          this.getBookingData()
          // this.getUserList()
        }, 3000)
      }).catch(err => {
        console.log('mainSheet err: ', err)
        this.loading = false
        this.addDialogVisible = false
        setTimeout(() => {
          this.$message.error('取消主單號失敗，請再重試一次')
        }, 3000)
      })
    },
    // 訂倉
    booking () {
      // console.log(this.bookingInfo.depatureTime)
      // console.log(this.bookingInfo.depatureTime.slice(0, 5))
      // console.log(
      //   JSON.stringify({
      //     主單號類型: this.bookingInfo.mawbKind,
      //     客戶代號: this.bookingInfo.customCode,
      //     發車時間: this.bookingInfo.depatureTime.slice(0, 5),
      //     目的地: this.bookingInfo.destination,
      //     預定航班日期: this.bookingInfo.date,
      //     預定班機: this.bookingInfo.flight,
      //     貨種: this.bookingInfo.kind,
      //     載具: '1' + this.bookingInfo.loader,
      //     件數: this.bookingInfo.piece,
      //     訂倉重: this.bookingInfo.weight,
      //     倉儲: this.bookingInfo.wareHouse,
      //     備註: this.bookingInfo.remark
      //   })
      // )
      this.$refs.bookingInfoRef.validate(valid => {
        if (!valid) return false
        this.loading = true
        ajax.post('/api/Operate/cusorder',
          {
            JSON: JSON.stringify({
              訂倉單號: this.bookingInfo.sheetNum,
              目的地: this.bookingInfo.destination,
              預定航班日期: this.bookingInfo.date,
              預定班機: this.bookingInfo.flight,
              貨種: this.bookingInfo.kind,
              載具: '1' + this.bookingInfo.loader,
              件數: this.bookingInfo.piece,
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
          console.log('allocate1 res: ', res)

          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(`${res.data.slice(6)}`)
          }
          if (res.data === 'OK') this.$message.success('倉位分配成功')
        }).catch(err => {
          console.log('allocate err: ', err)
          this.loading = false
          this.$message.error('查詢倉位分配失敗，請稍後重試')
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
    // 獲取操作列表的數據
    getBookingData () {
      // console.log('allocation: ', this.formInline1.allocation)
      this.$refs.formInline1Ref.validate(valid => {
        if (!valid) return
        this.loading = true
        ajax.get('/api/Operate/onsite', {
          params: {
            DD: this.formInline1.date,
            addday: parseInt(this.formInline1.days),
            mawbKind: this.formInline1.mawbKind,
            customCode: this.formInline1.customCode,
            status: parseInt(this.formInline1.allocation)
            // status: '0'
          },
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        }).then((res) => {
          this.loading = false
          console.log('currence res: ', res)

          if (res.data === null) {
            return this.$message.warning('查詢不到數據')
          }

          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(`${res.data.slice(6)}`)
          }
          this.onsiteDataList = res.data
          console.log('onsite data: ', this.onsiteDataList)
        }).catch(err => {
          console.log('onsite err: ', err)
          this.loading = false
          this.$message.error('查詢操作列表失敗，請稍後重試')
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
.currence-container {
  padding-bottom: 20px;
  .pagination {
    text-align: center;
    .el-pagination {
      margin-top: 20px;
    }
  }
  .mergeForm {
    margin-top: 20px;
  }

  .el-tag {
    font-size: 20px;
  }

  .operator {
    margin-right: 10px;
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
  }
}
</style>
