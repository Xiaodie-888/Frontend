<template>
  <BreadCrumb :name='name'></BreadCrumb>
<div class="common-wrapper">
  <div class="common-content">
    <div class="table-header">
      <div class="left-header">
        <el-input
            v-model="userAccount"
            class="w-50 m-2 distance"
            placeholder="输入账号进行搜索"
            clearable
            :suffix-icon="Search"
            @change="searchByAccount"
            @clear="clearInput"
        />
      </div>
      <div class="right-header">
        <el-button type="primary" @click="clearLog">清空记录</el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table :data="tableData"
                style="width: 100%"
                border>
        <el-table-column type="index" width="50"/>
        <el-table-column prop="account" label="账号"/>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="email" label="联系方式"/>
        <el-table-column prop="login_time" label="登录时间">
          <template #default="{row}">
            <div>{{ row.login_time?.slice(0, 10) }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-footer">
      <el-pagination :current-page="paginationData.currentPage"
                     :pager-count="7"
                     :page-count="paginationData.pageCount"
                     @current-change="changePage"
                     layout="prev, pager, next"
      />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {Search} from "@element-plus/icons-vue";
import {searchLoginLogList} from "@/api/login_log"
import BreadCrumb from '@/components/bread_crumb.vue'
import {logHooks} from '@/hooks/log'
const {
  tableData,
  paginationData,
  getFirstPageList,
  changePage,
  clearLog} = logHooks('login')
const name = ref('登录日志')

const userAccount = ref<number | null>()
// 通过账号返回最近十条登录记录
const searchByAccount =async () =>{
  tableData.value = await
      searchLoginLogList(userAccount.value as number)
}
// 监听清空输入框
const clearInput = () =>{
  getFirstPageList()
}

</script>

<style scoped lang="scss">
@import "@/assets/css/common.scss";
</style>