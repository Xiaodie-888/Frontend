<template>
  <BreadCrumb :name='name'></BreadCrumb>
  <div class="common-wrapper">
    <div class="common-content">
      <div class="table-header">
        <div class="left-header">
          <el-input
              v-model="product_id"
              class="w-50 m-2 distance"
              placeholder="输入产品ID进行搜索"
              :suffix-icon="Search"
              @change="searchById"
          />
        </div>
        <div class="right-header">
          <el-button type="danger" @click="clear">清空记录</el-button>
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData"
                  style="width: 100%"
                  border>
          <el-table-column type="index" width="50"/>
          <el-table-column prop="product_id" label="产品ID"/>
          <el-table-column prop="product_name" label="产品名称"/>
          <el-table-column prop="product_unit" label="产品单位"/>
          <el-table-column prop="out_warehouse_number" label="出库数量"/>
          <el-table-column prop="product_single_price" label="产品单价"/>
          <el-table-column prop="apply_person" label="申请人"/>
          <el-table-column prop="apply_time" label="申请时间">
            <template #default="{row}">
              <div>{{ row.apply_time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="audit_person" label="审核人"/>
          <el-table-column prop="audit_time" label="审核时间">
            <template #default="{row}">
              <div>{{ row.audit_time?.slice(0, 10) }}</div>
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
import {reactive, ref} from 'vue'
import BreadCrumb from "@/components/bread_crumb.vue";
import {Search} from "@element-plus/icons-vue";
import {ElMessageBox} from "element-plus";
import {getOutboundList, getOutboundLength, searchOutbound, cleanOutbound, getApplyList} from '@/api/product'
const name = ref('出库列表')

// 产品id
const product_id = ref<number>()
// 通常产品id搜索
const searchById = async () => {
  tableData.value = await searchOutbound(product_id.value as number)
}



// 表格数据
const tableData = ref([])

const paginationData = reactive({
  // 总页数
  pageCount: 1,
  // 当前所处页数
  currentPage: 1,
})

const getFirstPageList = async (pager: number = 1) => {
  tableData.value = await getOutboundList(pager) as any
}
getFirstPageList()


const changePage = () =>{

}

// 清空记录
const clear = () => {
  ElMessageBox.confirm(
      `您确定要清空出库记录吗？`,
      '清空出库记录',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
      }
  )
      .then(async () => {
        await cleanOutbound()
      })
}
</script>

<style scoped lang="scss">
@import "@/assets/css/common.scss";
</style>