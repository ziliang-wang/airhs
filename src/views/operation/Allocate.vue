<template>
  <div class="allocate-container" id="14" ref="allocatePageRef" v-loading="loading">
    <el-form :inline="true" :model="bookingInfo" :rules="bookingInfoRules" ref="bookingInfoRef">
      <el-tag style="margin-bottom: 20px;">倉位分配</el-tag>
      <br>
      <el-form-item label="客戶訂倉單號" prop="sheetNum">
        <el-select v-model="bookingInfo.sheetNum" placeholder="客戶訂倉單號(先查詢倉位分配)" @change="matchOrder">
          <el-option
            v-for="item in orderListOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!-- <el-input v-model.trim="bookingInfo.sheetNum" placeholder="訂倉單號"></el-input> -->
      </el-form-item>
      <span v-show="isShowCustSheet">
        <el-form-item label="航空公司配對客户" prop="sheetNum">
          <el-select v-model="bookingInfo.airMatchCustSheetNum" placeholder="客户訂倉單號" size="medium" @change="AirMatchCustOrder">
            <el-option
              v-for="item in airMatchCustListOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- <el-input v-model.trim="bookingInfo.sheetNum" placeholder="訂倉單號"></el-input> -->
        </el-form-item>
      </span>
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
      <br>
      <el-form-item label="預排日期" prop="date">
        <el-date-picker
          @change="mapToDate"
          v-model.trim="bookingInfo.date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="選擇日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="預排航班" prop="flight">
        <el-select v-model="bookingInfo.flight" placeholder="請選擇預排航班" @focus="showAssignFlightList">
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
      <br>
      <el-form-item label="載具" prop="loader">
        <!-- <el-input v-model.trim="bookingInfo.loader" placeholder="載具代碼" :disabled="isCustOrAir == 'cust'"></el-input> -->
        <el-input v-model.trim="bookingInfo.loader" placeholder="載具代碼"></el-input>
      </el-form-item>
      <el-form-item label="件數" prop="piece">
        <el-input v-model.trim="bookingInfo.piece" placeholder="件數"></el-input>
      </el-form-item>
      <el-form-item label="訂倉重量" prop="weight" :rules="[
          { required: true, message: '訂倉重量不得為空'},
          { type: 'number', message: '訂倉重量必須為數字'}
        ]">
        <el-input v-model.trim.number="bookingInfo.weight" placeholder="訂倉重量"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="倉儲" prop="wareHouse">
        <el-input v-model.trim="bookingInfo.wareHouse" placeholder="倉儲"></el-input>
      </el-form-item>
      <el-form-item label="備註" prop="remark">
        <el-input v-model.trim="bookingInfo.remark" placeholder="備註"></el-input>
      </el-form-item>
      <el-form-item>
        <span v-if="isEnableAdd">
          <!-- 为航空公司订仓或客户订仓 -->
          <el-button type="primary" @click="allocating">{{ showCustOrAir }}</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有分配權限" type="primary" @click="allocating">分配</el-button>
        </span>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <!-- 查詢倉位分配 -->
    <el-form :inline="true" :model="formInline1" :rules="formInline1Rules" ref="formInline1Ref" class="form-inline1">
      <el-tag style="margin-bottom: 20px;">查詢倉位分配</el-tag>
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
        <el-select v-model="formInline1.mawbKind" placeholder="請選擇航空公司" @change="clearRelatedflightList">
          <el-option
            v-for="item in airOptions"
            :key="item.mawbKind"
            :label="item.airline"
            :value="item.mawbKind">
          </el-option>
        </el-select>
        <!-- <el-input v-model.trim="formInline1.mawbKind" placeholder="主單號類型"></el-input> -->
      </el-form-item>
      <el-form-item label="" prop="search">
        <el-input v-model.trim="formInline1.searchValue" placeholder="其它條件搜尋"></el-input>
      </el-form-item>
      <el-form-item label="分配狀態" prop="allocation">
        <el-select v-model.trim="formInline1.allocation" placeholder="請選擇" @change="matchAllocate">
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
          <el-button type="primary" @click="getBookingData" class="queryBtn">查詢倉位分配</el-button>
        </span>
        <span v-else>
          <el-button disabled title="您沒有查詢權限" type="primary" @click="getBookingData" class="queryBtn">查詢倉位分配</el-button>
        </span>
      </el-form-item>
    </el-form>
    <!-- 主表 -->
    <el-table
      class="main-table"
      :data="pageList"
      :row-class-name="exceedClass"
      :stripe="isStripe"
      style="width: 100%">
      <el-table-column
        prop="航空公司"
        label="航空公司"
        width="80">
      </el-table-column>
      <el-table-column
        prop="訂倉單號"
        label="訂倉單號"
        width="110">
      </el-table-column>
      <el-table-column
        prop="客戶簡稱"
        label="客戶"
        width="100">
      </el-table-column>
      <el-table-column
        prop="主單號"
        label="主單號(數量)"
        width="120">
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
        prop="貨種"
        label="貨物種類"
        width="100">
      </el-table-column>
      <el-table-column
        prop="訂倉重"
        label="訂倉重量"
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
// import { isCryptoKey } from 'util/types'

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
    // 格式化倉位分配查詢列表
    frmBookingDataList () {
      // 未分配
      if (this.formInline1.allocation === '0') {
        const dataList = []
        for (const item of this.allocationDataList) {
          // 非CI
          if (item.航空公司 !== 'CI') {
            const data = {
              航空公司: item.航空公司,
              客戶簡稱: item.客戶簡稱,
              訂倉重: item.訂倉重,
              // 主單號: item.主單號,
              主單號: item.訂倉類型 === 2 ? item.主單號數量 : item.主單號,
              訂倉單號: item.訂倉單號,
              目的地: item.目的地,
              預排日期: this.frmDate(item.預排日期),
              預排航班: item.預排航班,
              貨種: item.貨種,
              載具: item.載具,
              倉儲: item.倉儲,
              備註: item.備註
            }
            dataList.push(data)
          } else {
            let ciAirData = {}
            // CI的航空公司订仓单
            if (item.訂倉單號[0] === 'F') {
              const ciAirItem = item
              ciAirData = {
                訂倉單號: ciAirItem.訂倉單號,
                航空公司: ciAirItem.航空公司,
                客戶簡稱: ciAirItem.客戶簡稱,
                主單號: ciAirItem.主單號,
                目的地: ciAirItem.目的地,
                預排日期: this.frmDate(ciAirItem.預排日期),
                預排航班: ciAirItem.預排航班,
                載具: ciAirItem.載具,
                貨種: ciAirItem.貨種,
                訂倉重: ciAirItem.訂倉重,
                倉儲: ciAirItem.倉儲,
                備註: ciAirItem.備註
              }
              dataList.push(ciAirData)
            }
            if (item.訂倉單號[0] === 'C') {
              for (let i = 0; i < item.主單號明細.length; i++) {
                const data = {
                  訂倉單號: item.主單號明細[i].客戶訂倉單號,
                  // 訂倉時間: this.frmDate(bookingTime),
                  航空公司: item.主單號明細[i].主單號名稱,
                  // 客戶簡稱: detailItem.客戶簡稱,
                  客戶簡稱: item.主單號明細[i].客戶簡稱,
                  // 訂倉重: detailItem.訂倉重,
                  訂倉重: item.主單號明細[i].訂倉重,
                  // 主單號名稱: detailItem.主單號名稱,
                  主單號名稱: item.主單號明細[i].主單號名稱,
                  // 主單號: detailItem.主單號,
                  主單號: item.主單號明細[i].主單號,
                  // 載具: i === 0 ? loader : 'MIX',
                  載具: item.主單號明細[i].載具代碼,
                  // 目的地: detailItem.目的地,
                  目的地: item.主單號明細[i].目的地,
                  // 預定航班日期: this.frmDate(detailItem.預定航班日期),
                  // 預定航班日期: this.frmDate(item.主單號明細[i].預定航班日期),
                  預排日期: this.frmDate(item.主單號明細[i].預定航班日期),
                  // 預定班機: detailItem.預定班機,
                  預排航班: item.主單號明細[i].預定班機,
                  // 貨物種類: detailItem.貨物種類
                  貨種: item.主單號明細[i].貨物種類,
                  倉儲: item.主單號明細[i].倉儲,
                  備註: item.主單號明細[i].備註
                  // 載具: loader
                }
                dataList.push(data)
              }
            }
          }
        }
        return dataList
      } else {
        const dataList = []
        for (const item of this.allocationDataList) {
          // 已分配查询
          if (item.訂倉單號[0] === 'F') {
            const data = {
              訂倉單號: item.訂倉單號,
              // 訂倉時間: this.frmDate(bookingTime),
              航空公司: item.航空公司,
              // 客戶簡稱: detailItem.客戶簡稱,
              // 客戶簡稱: item.主單號明細[i].客戶簡稱,
              客戶簡稱: item.客戶簡稱,
              // 訂倉重: detailItem.訂倉重,
              訂倉重: item.訂倉重,
              // 主單號名稱: detailItem.主單號名稱,
              // 主單號名稱: item.主單號名稱,
              // 主單號: detailItem.主單號,
              主單號: item.主單號,
              // 載具: i === 0 ? loader : 'MIX',
              載具: item.載具,
              // 目的地: detailItem.目的地,
              目的地: item.目的地,
              // 預定航班日期: this.frmDate(detailItem.預定航班日期),
              // 預定航班日期: this.frmDate(item.主單號明細[i].預定航班日期),
              預排日期: this.frmDate(item.預排日期),
              // 預定班機: detailItem.預定班機,
              預排航班: item.預排航班,
              // 貨物種類: detailItem.貨物種類
              貨種: item.貨種,
              倉儲: item.倉儲,
              備註: item.備註,
              載具剩餘數量: item.載具數量 - item.載具使用數量
              // 載具: loader
            }
            dataList.push(data)
          }
          for (let i = 0; i < item.主單號明細.length; i++) {
            // 跳過已分配的航空公司訂倉明細
            // if (item.主單號明細[i].航空訂倉單號[0] === 'F') continue
            if (item.主單號明細[i].客戶訂倉單號 === '') continue
            const data = {
              訂倉單號: item.主單號明細[i].客戶訂倉單號,
              // 訂倉時間: this.frmDate(bookingTime),
              航空公司: item.主單號明細[i].主單號名稱,
              // 客戶簡稱: detailItem.客戶簡稱,
              // 客戶簡稱: item.主單號明細[i].客戶簡稱,
              客戶簡稱: item.主單號明細[i].客戶簡稱,
              // 訂倉重: detailItem.訂倉重,
              訂倉重: item.主單號明細[i].訂倉重,
              // 主單號名稱: detailItem.主單號名稱,
              主單號名稱: item.主單號明細[i].主單號名稱,
              // 主單號: detailItem.主單號,
              主單號: item.主單號明細[i].主單號,
              // 載具: i === 0 ? loader : 'MIX',
              載具: item.主單號明細[i].載具代碼,
              // 目的地: detailItem.目的地,
              目的地: item.主單號明細[i].目的地,
              // 預定航班日期: this.frmDate(detailItem.預定航班日期),
              // 預定航班日期: this.frmDate(item.主單號明細[i].預定航班日期),
              預排日期: this.frmDate(item.主單號明細[i].預定航班日期),
              // 預定班機: detailItem.預定班機,
              預排航班: item.主單號明細[i].預定班機,
              // 貨物種類: detailItem.貨物種類
              貨種: item.主單號明細[i].貨物種類,
              倉儲: item.主單號明細[i].倉儲,
              備註: item.主單號明細[i].備註,
              載具剩餘數量: item.載具數量
              // 載具: loader
            }
            dataList.push(data)
          }
        }
        return dataList
      }
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
    // 主單號類型對應航空公司
    airOptions () {
      const dataList = []
      for (const item of this.sheetList) {
        if (item.航班號碼開頭 === 'All') continue
        const data = {
          mawbKind: item.代碼,
          airline: item.名稱
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
    },
    // 去重后的订仓下拉列表
    orderListOptions () {
      const list1 = []
      const resList = []
      for (const item of this.allocationDataList) {
        // 若是航空公司订仓单号，就跳过，避免"航空公司配对客户"的误操作
        if (item.訂倉單號[0] === 'F') continue

        if (list1.indexOf(item.訂倉單號) < 0) {
          list1.push(item.id)
          const data = {
            value: item.訂倉單號,
            label: item.訂倉單號
          }
          resList.push(data)
        }
      }
      return resList
    },
    // 航空公司，配对指定客户
    airMatchCustListOptions () {
      const list1 = []
      const resList = []
      for (const item of this.allocationDataList) {
        if (list1.indexOf(item.訂倉單號) < 0 && item.訂倉單號[0] !== 'F') {
          list1.push(item.id)
          const data = {
            value: item.訂倉單號,
            label: '客戶:' + item.客戶簡稱 + '    ' + '訂倉單號:' + item.訂倉單號 + '    ' + '貨種:' + item.貨種 + '    ' + '訂倉重量:' + item.訂倉重
          }
          resList.push(data)
        }
      }
      return resList
    }
  },
  data () {
    return {
      // 表格是否顯示班馬紋
      isStripe: false,
      isCustOrAir: '',
      showCustOrAir: '分配',
      // 关联班机列表
      relatedflightList: [],
      // 分配狀態
      options: [
        {
          value: '0',
          label: '未分配'
        },
        {
          value: '1',
          label: '已分配'
        }
      ],
      // 定倉信息
      bookingInfo: {
        // 航空公司配对客户
        airMatchCustSheetNum: '',
        // 訂倉單號
        sheetNum: '',
        wareHouse: '無',
        depatureTime: '',
        customCode: '',
        mawbKind: '',
        destination: '',
        date: '',
        flight: '',
        kind: '',
        loader: '',
        piece: 0,
        weight: '',
        remark: ''
      },
      // 定倉驗證
      bookingInfoRules: {
        sheetNum: [
          { required: true, message: '不得為空', trigger: 'blur' }
        ],
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
          { required: false, message: '不得為空', trigger: 'blur' }
        ],
        piece: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ],
        // weight: [
        //   { required: true, message: '不得為空', trigger: 'blur' }
        // ],
        remark: [
          { required: false, message: '不得為空', trigger: 'blur' }
        ]
      },
      compareRules: {
        compare: [{ required: true, message: '請選擇比較形式', trigger: 'blur' }]
      },
      selectedValue: '',
      loading: false,
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
        // days: [
        //   { required: true, message: '請輸入天數', trigger: 'blur' }
        // ],
        month: [
          { required: true, message: '請選擇月份', trigger: 'blur' }
        ],
        mawbKind: [
          { required: true, message: '請選擇航空公司', trigger: 'change' }
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
      customerList: [],
      airMain: '',
      startWithFlightList: [],
      // 是否显示客户订仓单号的下拉
      isShowCustSheet: false,
      airLineCorp: ''
      // relatedflightList: []
      // orderList: []
    }
  },
  methods: {
    showAssignFlightList () {
      // console.log('tt')
      this.mapToFlight()
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
    mapToDate (date) {
      console.log('日期: ', date)
      this.getAssignFlightList(date)
    },
    mapToAirLine (val) {
      this.airLineCorp = val
    },
    // 當前的分配狀態
    matchAllocate (status) {
      status === '0' ? this.isStripe = true : this.isStripe = false
    },
    // 載具超過初始值，變色
    exceedClass ({ row, rowIndex }) {
      // console.log(row)
      if (row.載具剩餘數量 < 0) {
        return 'exceeded-row'
      }
      return ''
    },
    AirMatchCustOrder () {
    },
    // 判断为客户订仓或航空公司订仓
    // isCustOrAir () {
    // },
    clearRelatedflightList () {
      this.relatedflightList = []
    },
    // 航空公司-航班號碼開頭-對應班機 聯動
    mapToFlight (value) {
      this.bookingInfo.flight = ''

      for (const item of this.sheetList) {
        if (value === item.名稱) {
          this.startWithFlightList = item.航班號碼開頭.trim().toLowerCase().split(',')
        }
      }

      this.relatedflightList = []

      for (const flight of this.flightList) {
        // console.log(flight)
        // const data = {
        //   航班號碼: flight.航班號碼
        // }
        // this.relatedflightList.push(data)
        if (this.startWithFlightList.indexOf(flight.航班號碼.substr(0, 2).toLowerCase()) >= 0) {
          const data = {
            航班號碼: flight.航班號碼
          }
          this.relatedflightList.push(data)
        }
      }
    },
    // 訂倉單號，聯動各個欄位
    matchOrder (orderNum) {
      if (orderNum[0] === 'F') {
        this.isShowCustSheet = true
      } else {
        this.isShowCustSheet = false
      }

      for (const item of this.allocationDataList) {
        if (orderNum === item.訂倉單號) {
          // 目的地、貨種、件數、訂倉重及倉儲
          // this.bookingInfo.customCode = item.客戶簡稱
          // 客户简称，转客户代号
          for (const custItem of this.custOptions) {
            if (custItem.customName === item.客戶簡稱) {
              this.bookingInfo.customCode = custItem.customCode
              console.log('客户简称，转客户代号:', this.bookingInfo.customCode)
              break
            }
          }
          this.bookingInfo.destination = item.目的地
          this.bookingInfo.kind = item.貨種
          this.bookingInfo.loader = item.載具
          this.bookingInfo.piece = item.件數
          this.bookingInfo.weight = item.訂倉重
          this.bookingInfo.wareHouse = item.倉儲
          break
        }
      }
      if (orderNum !== '') {
        if (orderNum.charAt(0) === 'C') {
          this.isCustOrAir = 'cust'
          this.showCustOrAir = '客户倉位分配'
        } else {
          this.isCustOrAir = 'air'
          this.showCustOrAir = '航空公司倉位分配'
        }
      }
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
    // 獲取班机列表
    getFlightList () {
      // console.log(this.currentDateString)
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
        this.flightList = data
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
        if (item.MenuUID === parseInt(this.$refs.allocatePageRef.id)) {
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
    // 航空公司倉位分配/有载具的客户仓位分配
    airAllocate () {
      console.log('有载具的客户/航空公司倉位分配')
      this.$refs.bookingInfoRef.validate(valid => {
        if (!valid) return false
        this.loading = true
        console.log(
          JSON.stringify({
            訂倉單號: this.bookingInfo.sheetNum,
            客戶代號: this.bookingInfo.customCode,
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
        )
        ajax.post('/api/Operate/posdrb',
          {
            JSON: JSON.stringify({
              訂倉單號: this.bookingInfo.sheetNum,
              客戶代號: this.bookingInfo.customCode,
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
          console.log('allocate1 res: ', res)

          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(`${res.data.slice(6)}`)
          }
          if (res.data === 'OK') this.$message.success('倉位分配成功')
          this.allocationDataList = []
        }).catch(err => {
          console.log('allocate err: ', err)
          this.loading = false
          this.$message.error('倉位分配失敗，請稍後重試')
        })
      })
    },
    // 客户仓位分配
    custAllocate () {
      // 有载具，走"仓位分配"的API
      if (this.bookingInfo.loader.trim() !== '') {
        console.log('有载具代码的客戶倉位分配')
        this.airAllocate()
        return
      }
      // 无载具代码的客戶倉位分配(修改)，走客户订仓修改的api
      console.log('无载具代码的客戶倉位分配')
      this.$refs.bookingInfoRef.validate(valid => {
        if (!valid) return
        this.loading = true
        ajax.post('/api/Operate/cusorderedit',
          {
            JSON: JSON.stringify({
              訂倉單號: this.bookingInfo.sheetNum,
              客戶代號: this.bookingInfo.customCode,
              目的地: this.bookingInfo.destination,
              預定航班日期: this.bookingInfo.date,
              預定班機: this.bookingInfo.flight,
              貨種: this.bookingInfo.kind,
              載具: '',
              件數: this.bookingInfo.piece || 0,
              訂倉重: this.bookingInfo.weight,
              倉儲: this.bookingInfo.wareHouse,
              備註: this.bookingInfo.remark
              // 主單號類型: this.bookingInfo.mawbKind,
              // 客戶代號: this.bookingInfo.customCode,
              // 發車時間: this.bookingInfo.depatureTime.slice(0, 5),
              // 主單號數量: this.bookingInfo.mainAmount,
              // 目的地: this.bookingInfo.destination,
              // 預定航班日期: this.bookingInfo.date,
              // 預定班機: this.bookingInfo.flight,
              // 貨種: this.bookingInfo.kind,
              // 載具: this.bookingInfo.loader,
              // 件數: this.bookingInfo.piece || 0,
              // 訂倉重: this.bookingInfo.weight,
              // 倉儲: this.bookingInfo.wareHouse,
              // 備註: this.bookingInfo.remark
            })
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }
        ).then((res) => {
          this.loading = false
          console.log('cust allocating res: ', res)
          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(`${res.data.slice(6)}`)
          }
          if (res.data === 'OK') this.$message.success('客户订仓修改成功')
          this.allocationDataList = []
        }).catch(err => {
          console.log('cust allocating err: ', err)
          this.loading = false
          this.$message.error('客户订仓修改失敗，請稍後重試')
        })
      })
    },
    // 分配倉位
    allocating () {
      switch (this.isCustOrAir) {
        case 'cust':
          this.custAllocate()
          break
        case 'air':
          this.airAllocate()
          break
        default:
          console.log('無分配')
      }
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
    // 查詢倉位分配，獲取倉位分配的數據
    getBookingData () {
      console.log('allocation: ', this.formInline1.allocation)
      this.$refs.formInline1Ref.validate(valid => {
        if (!valid) return
        this.loading = true
        // 查詢之前，清空訂倉下拉列表
        this.orderListOptions.length = 0
        // 查詢之前，清空選中的值
        this.bookingInfo.sheetNum = ''
        // 查詢請求
        ajax.get('/api/Operate/drb', {
          params: {
            DD: this.formInline1.date,
            addday: parseInt(this.formInline1.days),
            mawbKind: this.formInline1.mawbKind,
            status: parseInt(this.formInline1.allocation),
            searchFor: this.formInline1.searchValue
          },
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        }).then((res) => {
          this.loading = false
          console.log('allocation res: ', res)

          if (res.data === null) {
            this.allocationDataList = []
            return this.$message.warning('查詢不到數據')
          }

          if (res.data.slice(0, 5) === 'Error') {
            return this.$message.error(`${res.data.slice(6)}`)
          }
          this.allocationDataList = res.data.reverse()
          console.log('allocation data: ', this.allocationDataList)
          this.airMain = this.allocationDataList.length === 0 ? '' : this.allocationDataList[0].航空公司
          setTimeout(() => {
            if (this.airMain === '') return
            this.mapToFlight(this.airMain)
          }, 1000)
        }).catch(err => {
          console.log('allocation err: ', err)
          this.loading = false
          this.$message.error('查詢倉位分配失敗，請稍後重試')
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
    this.getDestList()
    // this.getFlightList()
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
.allocate-container {
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
