<template>
  <BreadCrumb :name='name'></BreadCrumb>
  <div class="common-wrapper">
    <div class="common-content">
      <div class="table-header">
        <div class="left-header">
          <el-date-picker
              v-model="date"
              type="date"
              placeholder="选择日期"
              size="default"
              clearable
              @change="changeDate"
              value-format="YYYY-MM-DD"
          />
        </div>
        <div class="right-header">
<!--          其他属性-->
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
          <el-table-column prop="content" label="内容" width="180"/>
          <el-table-column prop="time" label="操作时间" width="150">
            <template #default="{row}">
              <div>{{ row.time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态"/>
          <el-table-column prop="level" label="等级"/>
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
import {ref,reactive} from "vue";
import BreadCrumb from '@/components/bread_crumb.vue'
import {searchOperation} from '@/api/operation_log'
import {logHooks} from '@/hooks'
const {
  tableData,
  paginationData,
  getFirstPageList,
  changePage,
  clearLog} = logHooks('operation')
const name = ref('操作日志')
const date = ref()

const changeDate = async (val: typeof date) => {
  console.log(date.value)
  if(date.value!==null){
    tableData.value = await searchOperation(date.value) as any
  }else(
      getFirstPageList()
  )
}


// const tableData = ref([])
// 默认获取第一页的数据
// const getFirstPageList = async () => {
//   tableData.value = await getOperationLogList(1) as any
// }
// getFirstPageList()

// 分页数据
// const paginationData = reactive({
//   // 总页数
//   pageCount: 1,
//   // 当前所处页数
//   currentPage: 1,
// })

// 返回日志长度得出页数
// const returnListLength = async  () => {
//   const res = await getOperationLogLength() as any
//   paginationData.pageCount = Math.ceil(res.length / 10)
// }
// returnListLength()

// 监听换页
// const changePage = async (value: number) => {
//   paginationData.currentPage = value
//   tableData.value = await getOperationLogList(value) as any
// }

// const clearLog =async  () => {
//   await clearOperationList()
// }
</script>

<style scoped lang="scss">
@import "@/assets/css/common.scss";
</style>