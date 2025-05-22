<template>
  <BreadCrumb :name='name'></BreadCrumb>
  <div class="common-wrapper">
    <div class="common-content">
      <div class="table-header">
        <div class="left-header">
          <span class="tips">tips:双击表格进行审核</span>
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData"
                  style="width: 100%"
                  border
                  @row-dblclick='applyOperation'
        >
          <el-table-column type="index" width="50"/>
          <el-table-column prop="product_id" label="产品ID"/>
          <el-table-column prop="product_name" label="产品名称"/>
          <el-table-column prop="product_out_number" label="出库数量"/>
          <el-table-column prop="apply_person" label="申请人"/>
<!--          <el-table-column prop="apply_notes" label="申请备注"/>-->
          <el-table-column prop="audit_person" label="审核人"/>
<!--          <el-table-column prop="audit_notes" label="审核备注"/>-->
          <el-table-column prop="audit_time" label="审核时间">
            <template #default="{row}">
              <div>{{ row.audit_time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="250" fixed="right">
            <template #default="{row}">
              <div class="button-content">
                <el-button type="primary" @click="withdrawApply(row)"
                           :disabled='row.audit_status=="审核"'
                >撤回申请
                </el-button>
                <el-button type="success" @click="nextApply(row)"
                           :disabled='row.audit_status=="审核"'
                >再次申请
                </el-button>
              </div>
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
  <Note ref="note" @success="getFirstPageList(paginationData.currentPage)"></Note>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import BreadCrumb from "@/components/bread_crumb.vue";
import Note from './components/notes.vue'
import {ElMessage, ElMessageBox} from "element-plus";
import {getApplyList,withdraw,againApply} from "@/api/product";
import {bus} from "@/utils/mitt"
const name = ref('审核列表')

const note = ref()

// 表格数据
const tableData = ref([])

const getFirstPageList = async (pager: number = 1) => {
  tableData.value = await getApplyList(pager) as any
}
getFirstPageList()

const paginationData = reactive({
  // 总页数
  pageCount: 1,
  // 当前所处页数
  currentPage: 1,
})

const changePage = () =>{

}

// 用户双击查看审核备注 管理双击查看申请备注

// 撤回申请
const withdrawApply = (row:any) => {
  ElMessageBox.confirm(
      `您确定要撤回申请出库 ${row.product_name} 吗？`,
      '撤回出库申请',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        const res = await withdraw(row.id)
        if(res.status==0){
          getFirstPageList(paginationData.currentPage)
        }
      })
}

// 再次申请
const nextApply = (row:any) => {
  ElMessageBox.confirm(
      `您确定要再次申请出库 ${row.product_name} 吗？`,
      '再次申请',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
      }
  )
      .then(async () => {
        const res = await againApply(row.id)
        if(res.status==0){
          getFirstPageList(paginationData.currentPage)
        }
      })
}

// 打开审核框
const applyOperation = (row:any) => {
  bus.emit('applyRow',row.id)
  note.value.open()
}
</script>

<style scoped lang="scss">
@import "@/assets/css/common.scss";

.tips{
  font-size: 14px;
  color: #A9A9A9;
}
</style>