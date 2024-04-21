<template>
    <!-- [{UID:xxx, Account: 'supervisor', MenuUID: 1, 新增: 1, 編輯: 1, 查詢: 1, 刪除: 1, 匯出: 1 }] -->
    <div class="permission-container">
      <h1 style="font-size: 30px;">權限對象 {{ permissionAccount }}</h1>
      <table width="100%" align="center">
        <!-- 基本資料 -->
        <tr>
          <th width="100">基本資料</th>
          <th width="50">新增</th>
          <th width="50">編輯</th>
          <th width="50">查詢</th>
          <th width="50">刪除</th>
          <th width="50">匯出</th>
        </tr>
        <!-- 使用者資料 -->
        <tr>
          <td>使用者资料<input type="hidden" :value="menu5_id"></td>
          <td><input type="checkbox" :value="menu5_add" @click="menu5AddFn" :checked="menu5_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu5_edit" @click="menu5EditFn" :checked="menu5_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu5_query" @click="menu5QueryFn" :checked="menu5_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu5_remove" @click="menu5RemoveFn" :checked="menu5_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu5_export" @click="menu5ExportFn" :checked="menu5_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 使用者資料 -->
        <!-- 客戶資料 -->
        <tr>
          <td>客戶资料<input type="hidden" :value="menu6_id"></td>
          <td><input type="checkbox" :value="menu6_add" @click="menu6AddFn" :checked="menu6_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu6_edit" @click="menu6EditFn" :checked="menu6_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu6_query" @click="menu6QueryFn" :checked="menu6_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu6_remove" @click="menu6RemoveFn" :checked="menu6_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu6_export" @click="menu6ExportFn" :checked="menu6_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 客戶資料 -->
        <!-- 載具資料 -->
        <tr>
          <td>載具资料<input type="hidden" :value="menu7_id"></td>
          <td><input type="checkbox" :value="menu7_add" @click="menu7AddFn" :checked="menu7_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu7_edit" @click="menu7EditFn" :checked="menu7_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu7_query" @click="menu7QueryFn" :checked="menu7_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu7_remove" @click="menu7RemoveFn" :checked="menu7_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu7_export" @click="menu7ExportFn" :checked="menu7_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 載具資料 -->
        <!-- 主單號類型 -->
        <tr>
          <td>主單號類型<input type="hidden" :value="menu8_id"></td>
          <td><input type="checkbox" :value="menu8_add" @click="menu8AddFn" :checked="menu8_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu8_edit" @click="menu8EditFn" :checked="menu8_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu8_query" @click="menu8QueryFn" :checked="menu8_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu8_remove" @click="menu8RemoveFn" :checked="menu8_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu8_export" @click="menu8ExportFn" :checked="menu8_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 主單號類型 -->
        <!-- 班機資料 -->
        <tr>
          <td>班機資料<input type="hidden" :value="menu9_id"></td>
          <td><input type="checkbox" :value="menu9_add" @click="menu9AddFn" :checked="menu9_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu9_edit" @click="menu9EditFn" :checked="menu9_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu9_query" @click="menu9QueryFn" :checked="menu9_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu9_remove" @click="menu9RemoveFn" :checked="menu9_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu9_export" @click="menu9ExportFn" :checked="menu9_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 班機資料 -->
        <!-- 目的地-->
        <tr>
          <td>目的地<input type="hidden" :value="menu10_id"></td>
          <td><input type="checkbox" :value="menu10_add" @click="menu10AddFn" :checked="menu10_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu10_edit" @click="menu10EditFn" :checked="menu10_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu10_query" @click="menu10QueryFn" :checked="menu10_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu10_remove" @click="menu10RemoveFn" :checked="menu10_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu10_export" @click="menu10ExportFn" :checked="menu10_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 目的地 -->
        <!-- 操作 -->
        <tr>
          <th width="100">操作</th>
          <th width="50">新增</th>
          <th width="50">編輯</th>
          <th width="50">查詢</th>
          <th width="50">刪除</th>
          <th width="50">匯出</th>
        </tr>
        <!-- 航空公司訂倉-->
        <tr>
          <td>航空公司訂倉<input type="hidden" :value="menu12_id"></td>
          <td><input type="checkbox" :value="menu12_add" @click="menu12AddFn" :checked="menu12_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu12_edit" @click="menu12EditFn" :checked="menu12_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu12_query" @click="menu12QueryFn" :checked="menu12_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu12_remove" @click="menu12RemoveFn" :checked="menu12_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu12_export" @click="menu12ExportFn" :checked="menu12_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 航空公司訂倉 -->
        <!-- 客戶訂倉-->
        <tr>
          <td>客戶訂倉<input type="hidden" :value="menu13_id"></td>
          <td><input type="checkbox" :value="menu13_add" @click="menu13AddFn" :checked="menu13_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu13_edit" @click="menu13EditFn" :checked="menu13_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu13_query" @click="menu13QueryFn" :checked="menu13_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu13_remove" @click="menu13RemoveFn" :checked="menu13_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu13_export" @click="menu13ExportFn" :checked="menu13_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 客戶訂倉 -->
        <!-- 倉位分配-->
        <tr>
          <td>倉位分配<input type="hidden" :value="menu14_id"></td>
          <td><input type="checkbox" :value="menu14_add" @click="menu14AddFn" :checked="menu14_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu14_edit" @click="menu14EditFn" :checked="menu14_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu14_query" @click="menu14QueryFn" :checked="menu14_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu14_remove" @click="menu14RemoveFn" :checked="menu14_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu14_export" @click="menu14ExportFn" :checked="menu14_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 倉位分配 -->
        <!-- 現場操作-->
        <tr>
          <td>現場操作<input type="hidden" :value="menu15_id"></td>
          <td><input type="checkbox" :value="menu15_add" @click="menu15AddFn" :checked="menu15_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu15_edit" @click="menu15EditFn" :checked="menu15_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu15_query" @click="menu15QueryFn" :checked="menu15_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu15_remove" @click="menu15RemoveFn" :checked="menu15_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu15_export" @click="menu15ExportFn" :checked="menu15_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 現場操作 -->
        <!-- 貨物追蹤-->
        <tr>
          <td>貨物追蹤<input type="hidden" :value="menu16_id"></td>
          <td><input type="checkbox" :value="menu16_add" @click="menu16AddFn" :checked="menu16_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu16_edit" @click="menu16EditFn" :checked="menu16_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu16_query" @click="menu16QueryFn" :checked="menu16_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu16_remove" @click="menu16RemoveFn" :checked="menu16_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu16_export" @click="menu16ExportFn" :checked="menu16_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 貨物追蹤 -->
        <!-- 主號管理 -->
        <tr>
          <th width="100">主號管理</th>
          <th width="50">新增</th>
          <th width="50">編輯</th>
          <th width="50">查詢</th>
          <th width="50">刪除</th>
          <th width="50">匯出</th>
        </tr>
        <!-- 新增主號-->
        <tr>
          <td>新增主號<input type="hidden" :value="menu17_id"></td>
          <td><input type="checkbox" :value="menu17_add" @click="menu17AddFn" :checked="menu17_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu17_edit" @click="menu17EditFn" :checked="menu17_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu17_query" @click="menu17QueryFn" :checked="menu17_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu17_remove" @click="menu17RemoveFn" :checked="menu17_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu17_export" @click="menu17ExportFn" :checked="menu17_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 新增主號 -->
        <!-- 主號庫存-->
        <!-- <tr>
          <td>主號庫存<input type="hidden" :value="menu18_id"></td>
          <td><input type="checkbox" :value="menu18_add" @click="menu18AddFn"></td>
          <td><input type="checkbox" :value="menu18_edit" @click="menu18EditFn"></td>
          <td><input type="checkbox" :value="menu18_query" @click="menu18QueryFn"></td>
          <td><input type="checkbox" :value="menu18_remove" @click="menu18RemoveFn"></td>
          <td><input type="checkbox" :value="menu18_export" @click="menu18ExportFn"></td>
        </tr> -->
        <!-- // 主號庫存 -->
        <!-- 使用紀錄-->
        <tr>
          <td>使用紀錄<input type="hidden" :value="menu19_id"></td>
          <td><input type="checkbox" :value="menu19_add" @click="menu19AddFn" :checked="menu19_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu19_edit" @click="menu19EditFn" :checked="menu19_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu19_query" @click="menu19QueryFn" :checked="menu19_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu19_remove" @click="menu19RemoveFn" :checked="menu19_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu19_export" @click="menu19ExportFn" :checked="menu19_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 使用紀錄 -->
        <!-- 報表 -->
        <tr>
          <th width="100">報表</th>
          <th width="50">新增</th>
          <th width="50">編輯</th>
          <th width="50">查詢</th>
          <th width="50">刪除</th>
          <th width="50">匯出</th>
        </tr>
        <!-- EQ表-->
        <tr>
          <td>EQ表<input type="hidden" :value="menu20_id"></td>
          <td><input type="checkbox" :value="menu20_add" @click="menu20AddFn" :checked="menu20_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu20_edit" @click="menu20EditFn" :checked="menu20_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu20_query" @click="menu20QueryFn" :checked="menu20_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu20_remove" @click="menu20RemoveFn" :checked="menu20_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu20_export" @click="menu20ExportFn" :checked="menu20_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // EQ表 -->
        <!-- 货量统计-->
        <tr>
          <td>貨量統計<input type="hidden" :value="menu21_id"></td>
          <td><input type="checkbox" :value="menu21_add" @click="menu21AddFn" :checked="menu21_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu21_edit" @click="menu21EditFn" :checked="menu21_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu21_query" @click="menu21QueryFn" :checked="menu21_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu21_remove" @click="menu21RemoveFn" :checked="menu21_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu21_export" @click="menu21ExportFn" :checked="menu21_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 货量统计 -->
        <!-- 同期比较-->
        <tr>
          <td>同期比較<input type="hidden" :value="menu22_id"></td>
          <td><input type="checkbox" :value="menu22_add" @click="menu22AddFn" :checked="menu22_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu22_edit" @click="menu22EditFn" :checked="menu22_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu22_query" @click="menu22QueryFn" :checked="menu22_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu22_remove" @click="menu22RemoveFn" :checked="menu22_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu22_export" @click="menu22ExportFn" :checked="menu22_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 同期比较 -->
        <!-- 日報表-->
        <tr>
          <td>日報表<input type="hidden" :value="menu23_id"></td>
          <td><input type="checkbox" :value="menu23_add" @click="menu23AddFn" :checked="menu23_add === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu23_edit" @click="menu23EditFn" :checked="menu23_edit === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu23_query" @click="menu23QueryFn" :checked="menu23_query === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu23_remove" @click="menu23RemoveFn" :checked="menu23_remove === '1' ? 1 : 0"></td>
          <td><input type="checkbox" :value="menu23_export" @click="menu23ExportFn" :checked="menu23_export === '1' ? 1 : 0"></td>
        </tr>
        <!-- // 日報表 -->
      </table>
      <div class="bottom-btns">
        <el-button @click="closePermissionWindow">取消</el-button>
        <el-button type="primary" @click="uploadPermission">確定</el-button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'App',
  // 權限對象帳號
  props: ['permissionAccount', 'objectPermissionList'],
  watch: {
    objectPermissionList () {
      // console.log('里面的: ', this.objectPermissionList)
      const tmpList = this.objectPermissionList
      if (tmpList.length === 0) {
        // this.menu5_add = '0'
        // this.menu6_add = '0'
        this.menu5_add = '0'
        this.menu5_edit = '0'
        this.menu5_query = '0'
        this.menu5_remove = '0'
        this.menu5_export = '0'
        //
        this.menu6_add = '0'
        this.menu6_edit = '0'
        this.menu6_query = '0'
        this.menu6_remove = '0'
        this.menu6_export = '0'
        //
        this.menu7_add = '0'
        this.menu7_edit = '0'
        this.menu7_query = '0'
        this.menu7_remove = '0'
        this.menu7_export = '0'
        //
        this.menu8_add = '0'
        this.menu8_edit = '0'
        this.menu8_query = '0'
        this.menu8_remove = '0'
        this.menu8_export = '0'
        //
        this.menu9_add = '0'
        this.menu9_edit = '0'
        this.menu9_query = '0'
        this.menu9_remove = '0'
        this.menu9_export = '0'
        //
        this.menu10_add = '0'
        this.menu10_edit = '0'
        this.menu10_query = '0'
        this.menu10_remove = '0'
        this.menu10_export = '0'
        //
        this.menu12_add = '0'
        this.menu12_edit = '0'
        this.menu12_query = '0'
        this.menu12_remove = '0'
        this.menu12_export = '0'
        //
        this.menu13_add = '0'
        this.menu13_edit = '0'
        this.menu13_query = '0'
        this.menu13_remove = '0'
        this.menu13_export = '0'
        //
        this.menu14_add = '0'
        this.menu14_edit = '0'
        this.menu14_query = '0'
        this.menu14_remove = '0'
        this.menu14_export = '0'
        //
        this.menu15_add = '0'
        this.menu15_edit = '0'
        this.menu15_query = '0'
        this.menu15_remove = '0'
        this.menu15_export = '0'
        //
        this.menu16_add = '0'
        this.menu16_edit = '0'
        this.menu16_query = '0'
        this.menu16_remove = '0'
        this.menu16_export = '0'
        //
        this.menu17_add = '0'
        this.menu17_edit = '0'
        this.menu17_query = '0'
        this.menu17_remove = '0'
        this.menu17_export = '0'
        //
        this.menu18_add = '0'
        this.menu18_edit = '0'
        this.menu18_query = '0'
        this.menu18_remove = '0'
        this.menu18_export = '0'
        //
        this.menu19_add = '0'
        this.menu19_edit = '0'
        this.menu19_query = '0'
        this.menu19_remove = '0'
        this.menu19_export = '0'
        //
        this.menu20_add = '0'
        this.menu20_edit = '0'
        this.menu20_query = '0'
        this.menu20_remove = '0'
        this.menu20_export = '0'
        //
        this.menu21_add = '0'
        this.menu21_edit = '0'
        this.menu21_query = '0'
        this.menu21_remove = '0'
        this.menu21_export = '0'
        //
        this.menu22_add = '0'
        this.menu22_edit = '0'
        this.menu22_query = '0'
        this.menu22_remove = '0'
        this.menu22_export = '0'
        //
        this.menu23_add = '0'
        this.menu23_edit = '0'
        this.menu23_query = '0'
        this.menu23_remove = '0'
        this.menu23_export = '0'
        return
      }
      for (var item of tmpList) {
        if (item.Account === this.permissionAccount) {
          if (item.MenuUID === this.menu5_id) {
            this.menu5_add = item.新增.toString()
            this.menu5_edit = item.編輯.toString()
            this.menu5_query = item.查詢.toString()
            this.menu5_remove = item.刪除.toString()
            this.menu5_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu6_id) {
            this.menu6_add = item.新增.toString()
            this.menu6_edit = item.編輯.toString()
            this.menu6_query = item.查詢.toString()
            this.menu6_remove = item.刪除.toString()
            this.menu6_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu7_id) {
            this.menu7_add = item.新增.toString()
            this.menu7_edit = item.編輯.toString()
            this.menu7_query = item.查詢.toString()
            this.menu7_remove = item.刪除.toString()
            this.menu7_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu8_id) {
            this.menu8_add = item.新增.toString()
            this.menu8_edit = item.編輯.toString()
            this.menu8_query = item.查詢.toString()
            this.menu8_remove = item.刪除.toString()
            this.menu8_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu9_id) {
            this.menu9_add = item.新增.toString()
            this.menu9_edit = item.編輯.toString()
            this.menu9_query = item.查詢.toString()
            this.menu9_remove = item.刪除.toString()
            this.menu9_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu10_id) {
            this.menu10_add = item.新增.toString()
            this.menu10_edit = item.編輯.toString()
            this.menu10_query = item.查詢.toString()
            this.menu10_remove = item.刪除.toString()
            this.menu10_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu12_id) {
            this.menu12_add = item.新增.toString()
            this.menu12_edit = item.編輯.toString()
            this.menu12_query = item.查詢.toString()
            this.menu12_remove = item.刪除.toString()
            this.menu12_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu13_id) {
            this.menu13_add = item.新增.toString()
            this.menu13_edit = item.編輯.toString()
            this.menu13_query = item.查詢.toString()
            this.menu13_remove = item.刪除.toString()
            this.menu13_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu14_id) {
            this.menu14_add = item.新增.toString()
            this.menu14_edit = item.編輯.toString()
            this.menu14_query = item.查詢.toString()
            this.menu14_remove = item.刪除.toString()
            this.menu14_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu15_id) {
            this.menu15_add = item.新增.toString()
            this.menu15_edit = item.編輯.toString()
            this.menu15_query = item.查詢.toString()
            this.menu15_remove = item.刪除.toString()
            this.menu15_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu16_id) {
            this.menu16_add = item.新增.toString()
            this.menu16_edit = item.編輯.toString()
            this.menu16_query = item.查詢.toString()
            this.menu16_remove = item.刪除.toString()
            this.menu16_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu17_id) {
            this.menu17_add = item.新增.toString()
            this.menu17_edit = item.編輯.toString()
            this.menu17_query = item.查詢.toString()
            this.menu17_remove = item.刪除.toString()
            this.menu17_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu18_id) {
            this.menu18_add = item.新增.toString()
            this.menu18_edit = item.編輯.toString()
            this.menu18_query = item.查詢.toString()
            this.menu18_remove = item.刪除.toString()
            this.menu18_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu19_id) {
            this.menu19_add = item.新增.toString()
            this.menu19_edit = item.編輯.toString()
            this.menu19_query = item.查詢.toString()
            this.menu19_remove = item.刪除.toString()
            this.menu19_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu20_id) {
            this.menu20_add = item.新增.toString()
            this.menu20_edit = item.編輯.toString()
            this.menu20_query = item.查詢.toString()
            this.menu20_remove = item.刪除.toString()
            this.menu20_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu21_id) {
            this.menu21_add = item.新增.toString()
            this.menu21_edit = item.編輯.toString()
            this.menu21_query = item.查詢.toString()
            this.menu21_remove = item.刪除.toString()
            this.menu21_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu22_id) {
            this.menu22_add = item.新增.toString()
            this.menu22_edit = item.編輯.toString()
            this.menu22_query = item.查詢.toString()
            this.menu22_remove = item.刪除.toString()
            this.menu22_export = item.匯出.toString()
          }
          if (item.MenuUID === this.menu23_id) {
            this.menu23_add = item.新增.toString()
            this.menu23_edit = item.編輯.toString()
            this.menu23_query = item.查詢.toString()
            this.menu23_remove = item.刪除.toString()
            this.menu23_export = item.匯出.toString()
          }
        }
      }
    }
  },
  data () {
    return {
      // 使用者資料
      menu5_id: 5,
      menu5_add: '0',
      menu5_edit: '0',
      menu5_query: '0',
      menu5_remove: '0',
      menu5_export: '0',
      // 客戶資料
      menu6_id: 6,
      menu6_add: '0',
      menu6_edit: '0',
      menu6_query: '0',
      menu6_remove: '0',
      menu6_export: '0',
      // 載具資料
      menu7_id: 7,
      menu7_add: '0',
      menu7_edit: '0',
      menu7_query: '0',
      menu7_remove: '0',
      menu7_export: '0',
      // 主單號類型
      menu8_id: 8,
      menu8_add: '0',
      menu8_edit: '0',
      menu8_query: '0',
      menu8_remove: '0',
      menu8_export: '0',
      // 班機資料
      menu9_id: 9,
      menu9_add: '0',
      menu9_edit: '0',
      menu9_query: '0',
      menu9_remove: '0',
      menu9_export: '0',
      // 目的地
      menu10_id: 10,
      menu10_add: '0',
      menu10_edit: '0',
      menu10_query: '0',
      menu10_remove: '0',
      menu10_export: '0',
      // 航空公司訂倉
      menu12_id: 12,
      menu12_add: '0',
      menu12_edit: '0',
      menu12_query: '0',
      menu12_remove: '0',
      menu12_export: '0',
      // 客戶訂倉
      menu13_id: 13,
      menu13_add: '0',
      menu13_edit: '0',
      menu13_query: '0',
      menu13_remove: '0',
      menu13_export: '0',
      // 倉位分配
      menu14_id: 14,
      menu14_add: '0',
      menu14_edit: '0',
      menu14_query: '0',
      menu14_remove: '0',
      menu14_export: '0',
      // 現場操作
      menu15_id: 15,
      menu15_add: '0',
      menu15_edit: '0',
      menu15_query: '0',
      menu15_remove: '0',
      menu15_export: '0',
      // 貨物追蹤
      menu16_id: 16,
      menu16_add: '0',
      menu16_edit: '0',
      menu16_query: '0',
      menu16_remove: '0',
      menu16_export: '0',
      // 新增主號
      menu17_id: 17,
      menu17_add: '0',
      menu17_edit: '0',
      menu17_query: '0',
      menu17_remove: '0',
      menu17_export: '0',
      // 主號庫存
      menu18_id: 18,
      menu18_add: '0',
      menu18_edit: '0',
      menu18_query: '0',
      menu18_remove: '0',
      menu18_export: '0',
      // 使用紀錄
      menu19_id: 19,
      menu19_add: '0',
      menu19_edit: '0',
      menu19_query: '0',
      menu19_remove: '0',
      menu19_export: '0',
      // EQ表
      menu20_id: 20,
      menu20_add: '0',
      menu20_edit: '0',
      menu20_query: '0',
      menu20_remove: '0',
      menu20_export: '0',
      // 货量统计
      menu21_id: 21,
      menu21_add: '0',
      menu21_edit: '0',
      menu21_query: '0',
      menu21_remove: '0',
      menu21_export: '0',
      // 同期比较
      menu22_id: 22,
      menu22_add: '0',
      menu22_edit: '0',
      menu22_query: '0',
      menu22_remove: '0',
      menu22_export: '0',
      // 日報表
      menu23_id: 23,
      menu23_add: '0',
      menu23_edit: '0',
      menu23_query: '0',
      menu23_remove: '0',
      menu23_export: '0'
    }
  },
  computed: {
    userPermissionList () {
      return [
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu5_id, 新增: parseInt(this.menu5_add), 編輯: parseInt(this.menu5_edit), 查詢: parseInt(this.menu5_query), 刪除: parseInt(this.menu5_remove), 匯出: parseInt(this.menu5_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu6_id, 新增: parseInt(this.menu6_add), 編輯: parseInt(this.menu6_edit), 查詢: parseInt(this.menu6_query), 刪除: parseInt(this.menu6_remove), 匯出: parseInt(this.menu6_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu7_id, 新增: parseInt(this.menu7_add), 編輯: parseInt(this.menu7_edit), 查詢: parseInt(this.menu7_query), 刪除: parseInt(this.menu7_remove), 匯出: parseInt(this.menu7_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu8_id, 新增: parseInt(this.menu8_add), 編輯: parseInt(this.menu8_edit), 查詢: parseInt(this.menu8_query), 刪除: parseInt(this.menu8_remove), 匯出: parseInt(this.menu8_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu9_id, 新增: parseInt(this.menu9_add), 編輯: parseInt(this.menu9_edit), 查詢: parseInt(this.menu9_query), 刪除: parseInt(this.menu9_remove), 匯出: parseInt(this.menu9_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu10_id, 新增: parseInt(this.menu10_add), 編輯: parseInt(this.menu10_edit), 查詢: parseInt(this.menu10_query), 刪除: parseInt(this.menu10_remove), 匯出: parseInt(this.menu10_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu12_id, 新增: parseInt(this.menu12_add), 編輯: parseInt(this.menu12_edit), 查詢: parseInt(this.menu12_query), 刪除: parseInt(this.menu12_remove), 匯出: parseInt(this.menu12_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu13_id, 新增: parseInt(this.menu13_add), 編輯: parseInt(this.menu13_edit), 查詢: parseInt(this.menu13_query), 刪除: parseInt(this.menu13_remove), 匯出: parseInt(this.menu13_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu14_id, 新增: parseInt(this.menu14_add), 編輯: parseInt(this.menu14_edit), 查詢: parseInt(this.menu14_query), 刪除: parseInt(this.menu14_remove), 匯出: parseInt(this.menu14_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu15_id, 新增: parseInt(this.menu15_add), 編輯: parseInt(this.menu15_edit), 查詢: parseInt(this.menu15_query), 刪除: parseInt(this.menu15_remove), 匯出: parseInt(this.menu15_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu16_id, 新增: parseInt(this.menu16_add), 編輯: parseInt(this.menu16_edit), 查詢: parseInt(this.menu16_query), 刪除: parseInt(this.menu16_remove), 匯出: parseInt(this.menu16_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu17_id, 新增: parseInt(this.menu17_add), 編輯: parseInt(this.menu17_edit), 查詢: parseInt(this.menu17_query), 刪除: parseInt(this.menu17_remove), 匯出: parseInt(this.menu17_export) },
        // { UID: 0, Account: this.permissionAccount, MenuUID: this.menu18_id, 新增: parseInt(this.menu18_add), 編輯: parseInt(this.menu18_edit), 查詢: parseInt(this.menu18_query), 刪除: parseInt(this.menu18_remove), 匯出: parseInt(this.menu18_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu19_id, 新增: parseInt(this.menu19_add), 編輯: parseInt(this.menu19_edit), 查詢: parseInt(this.menu19_query), 刪除: parseInt(this.menu19_remove), 匯出: parseInt(this.menu19_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu20_id, 新增: parseInt(this.menu20_add), 編輯: parseInt(this.menu20_edit), 查詢: parseInt(this.menu20_query), 刪除: parseInt(this.menu20_remove), 匯出: parseInt(this.menu20_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu21_id, 新增: parseInt(this.menu21_add), 編輯: parseInt(this.menu21_edit), 查詢: parseInt(this.menu21_query), 刪除: parseInt(this.menu21_remove), 匯出: parseInt(this.menu21_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu22_id, 新增: parseInt(this.menu22_add), 編輯: parseInt(this.menu22_edit), 查詢: parseInt(this.menu22_query), 刪除: parseInt(this.menu22_remove), 匯出: parseInt(this.menu22_export) },
        { UID: 0, Account: this.permissionAccount, MenuUID: this.menu23_id, 新增: parseInt(this.menu23_add), 編輯: parseInt(this.menu23_edit), 查詢: parseInt(this.menu23_query), 刪除: parseInt(this.menu23_remove), 匯出: parseInt(this.menu23_export) }
      ]
    }
  },
  methods: {
    uploadPermission () {
      if (this.permissionAccount === 'supervisor') {
        this.$message.warning('supervisor已是最高權限，無須設置')
        return
      }
      this.$emit('uploadPermission', this.permissionAccount, this.userPermissionList)
    },
    closePermissionWindow () {
      this.$emit('closePermissionWindow')
    },
    // 使用者资料
    menu5AddFn (e) {
      this.menu5_add = e.target.value === '0' ? '1' : '0'
    },
    menu5EditFn (e) {
      this.menu5_edit = e.target.value === '0' ? '1' : '0'
    },
    menu5QueryFn (e) {
      this.menu5_query = e.target.value === '0' ? '1' : '0'
    },
    menu5RemoveFn (e) {
      this.menu5_remove = e.target.value === '0' ? '1' : '0'
    },
    menu5ExportFn (e) {
      this.menu5_export = e.target.value === '0' ? '1' : '0'
    },
    // 客戶資料
    menu6AddFn (e) {
      this.menu6_add = e.target.value === '0' ? '1' : '0'
    },
    menu6EditFn (e) {
      this.menu6_edit = e.target.value === '0' ? '1' : '0'
    },
    menu6QueryFn (e) {
      this.menu6_query = e.target.value === '0' ? '1' : '0'
    },
    menu6RemoveFn (e) {
      this.menu6_remove = e.target.value === '0' ? '1' : '0'
    },
    menu6ExportFn (e) {
      this.menu6_export = e.target.value === '0' ? '1' : '0'
    },
    // 載具資料
    menu7AddFn (e) {
      this.menu7_add = e.target.value === '0' ? '1' : '0'
    },
    menu7EditFn (e) {
      this.menu7_edit = e.target.value === '0' ? '1' : '0'
    },
    menu7QueryFn (e) {
      this.menu7_query = e.target.value === '0' ? '1' : '0'
    },
    menu7RemoveFn (e) {
      this.menu7_remove = e.target.value === '0' ? '1' : '0'
    },
    menu7ExportFn (e) {
      this.menu7_export = e.target.value === '0' ? '1' : '0'
    },
    // 主單號類型
    menu8AddFn (e) {
      this.menu8_add = e.target.value === '0' ? '1' : '0'
    },
    menu8EditFn (e) {
      this.menu8_edit = e.target.value === '0' ? '1' : '0'
    },
    menu8QueryFn (e) {
      this.menu8_query = e.target.value === '0' ? '1' : '0'
    },
    menu8RemoveFn (e) {
      this.menu8_remove = e.target.value === '0' ? '1' : '0'
    },
    menu8ExportFn (e) {
      this.menu8_export = e.target.value === '0' ? '1' : '0'
    },
    // 班機資料
    menu9AddFn (e) {
      this.menu9_add = e.target.value === '0' ? '1' : '0'
    },
    menu9EditFn (e) {
      this.menu9_edit = e.target.value === '0' ? '1' : '0'
    },
    menu9QueryFn (e) {
      this.menu9_query = e.target.value === '0' ? '1' : '0'
    },
    menu9RemoveFn (e) {
      this.menu9_remove = e.target.value === '0' ? '1' : '0'
    },
    menu9ExportFn (e) {
      this.menu9_export = e.target.value === '0' ? '1' : '0'
    },
    // 目的地
    menu10AddFn (e) {
      this.menu10_add = e.target.value === '0' ? '1' : '0'
    },
    menu10EditFn (e) {
      this.menu10_edit = e.target.value === '0' ? '1' : '0'
    },
    menu10QueryFn (e) {
      this.menu10_query = e.target.value === '0' ? '1' : '0'
    },
    menu10RemoveFn (e) {
      this.menu10_remove = e.target.value === '0' ? '1' : '0'
    },
    menu10ExportFn (e) {
      this.menu10_export = e.target.value === '0' ? '1' : '0'
    },
    // 航空公司訂倉
    menu12AddFn (e) {
      this.menu12_add = e.target.value === '0' ? '1' : '0'
    },
    menu12EditFn (e) {
      this.menu12_edit = e.target.value === '0' ? '1' : '0'
    },
    menu12QueryFn (e) {
      this.menu12_query = e.target.value === '0' ? '1' : '0'
    },
    menu12RemoveFn (e) {
      this.menu12_remove = e.target.value === '0' ? '1' : '0'
    },
    menu12ExportFn (e) {
      this.menu12_export = e.target.value === '0' ? '1' : '0'
    },
    // 客戶訂倉
    menu13AddFn (e) {
      this.menu13_add = e.target.value === '0' ? '1' : '0'
    },
    menu13EditFn (e) {
      this.menu13_edit = e.target.value === '0' ? '1' : '0'
    },
    menu13QueryFn (e) {
      this.menu13_query = e.target.value === '0' ? '1' : '0'
    },
    menu13RemoveFn (e) {
      this.menu13_remove = e.target.value === '0' ? '1' : '0'
    },
    menu13ExportFn (e) {
      this.menu13_export = e.target.value === '0' ? '1' : '0'
    },
    // 倉位分配
    menu14AddFn (e) {
      this.menu14_add = e.target.value === '0' ? '1' : '0'
    },
    menu14EditFn (e) {
      this.menu14_edit = e.target.value === '0' ? '1' : '0'
    },
    menu14QueryFn (e) {
      this.menu14_query = e.target.value === '0' ? '1' : '0'
    },
    menu14RemoveFn (e) {
      this.menu14_remove = e.target.value === '0' ? '1' : '0'
    },
    menu14ExportFn (e) {
      this.menu14_export = e.target.value === '0' ? '1' : '0'
    },
    // 現場操作
    menu15AddFn (e) {
      this.menu15_add = e.target.value === '0' ? '1' : '0'
    },
    menu15EditFn (e) {
      this.menu15_edit = e.target.value === '0' ? '1' : '0'
    },
    menu15QueryFn (e) {
      this.menu15_query = e.target.value === '0' ? '1' : '0'
    },
    menu15RemoveFn (e) {
      this.menu15_remove = e.target.value === '0' ? '1' : '0'
    },
    menu15ExportFn (e) {
      this.menu15_export = e.target.value === '0' ? '1' : '0'
    },
    // 貨物追蹤
    menu16AddFn (e) {
      this.menu16_add = e.target.value === '0' ? '1' : '0'
    },
    menu16EditFn (e) {
      this.menu16_edit = e.target.value === '0' ? '1' : '0'
    },
    menu16QueryFn (e) {
      this.menu16_query = e.target.value === '0' ? '1' : '0'
    },
    menu16RemoveFn (e) {
      this.menu16_remove = e.target.value === '0' ? '1' : '0'
    },
    menu16ExportFn (e) {
      this.menu16_export = e.target.value === '0' ? '1' : '0'
    },
    // 新增主號
    menu17AddFn (e) {
      this.menu17_add = e.target.value === '0' ? '1' : '0'
    },
    menu17EditFn (e) {
      this.menu17_edit = e.target.value === '0' ? '1' : '0'
    },
    menu17QueryFn (e) {
      this.menu17_query = e.target.value === '0' ? '1' : '0'
    },
    menu17RemoveFn (e) {
      this.menu17_remove = e.target.value === '0' ? '1' : '0'
    },
    menu17ExportFn (e) {
      this.menu17_export = e.target.value === '0' ? '1' : '0'
    },
    // 主號庫存
    menu18AddFn (e) {
      this.menu18_add = e.target.value === '0' ? '1' : '0'
    },
    menu18EditFn (e) {
      this.menu18_edit = e.target.value === '0' ? '1' : '0'
    },
    menu18QueryFn (e) {
      this.menu18_query = e.target.value === '0' ? '1' : '0'
    },
    menu18RemoveFn (e) {
      this.menu18_remove = e.target.value === '0' ? '1' : '0'
    },
    menu18ExportFn (e) {
      this.menu18_export = e.target.value === '0' ? '1' : '0'
    },
    // 使用紀錄
    menu19AddFn (e) {
      this.menu19_add = e.target.value === '0' ? '1' : '0'
    },
    menu19EditFn (e) {
      this.menu19_edit = e.target.value === '0' ? '1' : '0'
    },
    menu19QueryFn (e) {
      this.menu19_query = e.target.value === '0' ? '1' : '0'
    },
    menu19RemoveFn (e) {
      this.menu19_remove = e.target.value === '0' ? '1' : '0'
    },
    menu19ExportFn (e) {
      this.menu19_export = e.target.value === '0' ? '1' : '0'
    },
    // EQ表
    menu20AddFn (e) {
      this.menu20_add = e.target.value === '0' ? '1' : '0'
    },
    menu20EditFn (e) {
      this.menu20_edit = e.target.value === '0' ? '1' : '0'
    },
    menu20QueryFn (e) {
      this.menu20_query = e.target.value === '0' ? '1' : '0'
    },
    menu20RemoveFn (e) {
      this.menu20_remove = e.target.value === '0' ? '1' : '0'
    },
    menu20ExportFn (e) {
      this.menu20_export = e.target.value === '0' ? '1' : '0'
    },
    // 货量统计
    menu21AddFn (e) {
      this.menu21_add = e.target.value === '0' ? '1' : '0'
    },
    menu21EditFn (e) {
      this.menu21_edit = e.target.value === '0' ? '1' : '0'
    },
    menu21QueryFn (e) {
      this.menu21_query = e.target.value === '0' ? '1' : '0'
    },
    menu21RemoveFn (e) {
      this.menu21_remove = e.target.value === '0' ? '1' : '0'
    },
    menu21ExportFn (e) {
      this.menu21_export = e.target.value === '0' ? '1' : '0'
    },
    // 同期比较
    menu22AddFn (e) {
      this.menu22_add = e.target.value === '0' ? '1' : '0'
    },
    menu22EditFn (e) {
      this.menu22_edit = e.target.value === '0' ? '1' : '0'
    },
    menu22QueryFn (e) {
      this.menu22_query = e.target.value === '0' ? '1' : '0'
    },
    menu22RemoveFn (e) {
      this.menu22_remove = e.target.value === '0' ? '1' : '0'
    },
    menu22ExportFn (e) {
      this.menu22_export = e.target.value === '0' ? '1' : '0'
    },
    // 日報表
    menu23AddFn (e) {
      this.menu23_add = e.target.value === '0' ? '1' : '0'
    },
    menu23EditFn (e) {
      this.menu23_edit = e.target.value === '0' ? '1' : '0'
    },
    menu23QueryFn (e) {
      this.menu23_query = e.target.value === '0' ? '1' : '0'
    },
    menu23RemoveFn (e) {
      this.menu23_remove = e.target.value === '0' ? '1' : '0'
    },
    menu23ExportFn (e) {
      this.menu23_export = e.target.value === '0' ? '1' : '0'
    },
    submitUserPermission () {
      console.log(this.userPermissionList)
    }
  }
}
</script>

<style lang="scss">
.permission-container {

  input[type=checkbox] {
    // visibility: hidden;
    width: 40px;
    height: 40px;
  }

  font-size: 24px;
  h1 {
    text-align: center;
    margin-bottom: 30px;
  }

  tr {
    height: 60px;
    text-align: center;
  }

  tr:hover {
    background-color: #ccc;
  }

  tr:nth-of-type(1):hover,
  tr:nth-of-type(8):hover,
  tr:nth-of-type(14):hover,
  tr:nth-of-type(17):hover {
    background-color: #fff;
  }

  .bottom-btns {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
