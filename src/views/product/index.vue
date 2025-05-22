<template>
  <BreadCrumb :name='name'></BreadCrumb>
  <div class="common-wrapper">
    <div class="common-content">
      <div class="table-header">
        <div class="left-header">
          <el-input
              v-model="product_id"
              class="w-50 m-2 distance"
              placeholder="输入账号进行搜索"
              :suffix-icon="Search"
              @change="searchById"
          />
        </div>
<!--      产品入库按钮  -->
        <div class="right-header">
          <el-button type="primary" @click="add">产品入库</el-button>
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData"
                  style="width: 100%"
                  border
        @cell-dblclick="openEdit">
<!--        表格列...  -->
          <el-table-column type="index" width="50"/>
          <el-table-column prop="product_id" label="产品ID"/>
          <el-table-column prop="product_name" label="产品名称" width="100"/>
          <el-table-column prop="product_category" label="产品类别" width="120"/>
          <el-table-column prop="warehouse_number" label="库存数量" width="120"/>
          <el-table-column prop="product_single_price" label="产品单价" width="120"/>
          <el-table-column prop="product_create_person" label="入库人"/>
          <el-table-column prop="product_create_time" label="入库时间">
            <template #default="{row}">
              <div>{{ row.product_create_time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="product_update_time" label="最新编辑时间">
            <template #default="{row}">
              <div>{{ row.product_update_time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250" fixed="right">
            <template #default="{row}">
              <div class="button-content">
                <el-button type="primary" @click="applyOutbound(row)"
                           :disabled='row.audit_status!=="在库" || row.warehouse_number==0'>
                  申请出库
                </el-button>
                <el-button type="success" @click="removeProduct(row)">删除产品
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
  <AddProduct ref="addProduct" @success="getFirstPageList"></AddProduct>

  <ApplyProduct ref="applyProduct"
                @success="getFirstPageList(paginationData.currentPage)">
  </ApplyProduct>
<!-- 编辑产品组件 -->
  <EditProduct ref="editProduct"
               @success="getFirstPageList(paginationData.currentPage)"
  ></EditProduct>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import BreadCrumb from "@/components/bread_crumb.vue";
import AddProduct from './components/add_product.vue'
import ApplyProduct from './components/apply_product.vue'
import EditProduct from './components/edit_product.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {getProductList,getProductLength,
  searchProduct,deleteProduct } from '@/api/product'
import {
  operationLog
} from '@/api/operation_log'
import {Search} from "@element-plus/icons-vue";
import {
  bus
} from "@/utils/mitt"
const name = ref('产品列表')

// 产品id
const product_id = ref()

// 通常产品id搜索
const searchById = async () => {
 tableData.value = await searchProduct(product_id.value) as any
}

// 表格数据
const tableData = ref([])


const addProduct = ref()
// 产品入库
const add = () => {
  addProduct.value.open()
}

const applyProduct = ref()
const applyOutbound = (row:any) => {
  bus.emit('applyRow',row)
  applyProduct.value.open()
}

const paginationData = reactive({
  // 总页数
  pageCount: 1,
  // 当前所处页数
  currentPage: 1,
})

// 返回在库产品长度得出页数
const returnListLength = async  () => {
   const res = await getProductLength() as any
  paginationData.pageCount = Math.ceil(res.length / 10)
}
returnListLength()
// 默认获取第一页数据
const getFirstPageList = async (pager: number = 1) => {
    tableData.value = await getProductList(pager) as any
}
getFirstPageList()

// 监听换页
const changePage = async (value: number) => {
  paginationData.currentPage = value
    tableData.value = await getProductList(value) as any
}

const editProduct = ref()
// 编辑产品信息
const openEdit = (row:any) =>{
  if(localStorage.getItem('position')=='员工') return
  bus.emit('editRow',row)
  editProduct.value.open()
}

// 删除产品
const removeProduct = (row:any) => {
  ElMessageBox.confirm(
      `您确定要删除产品 ${row.product_name} 吗？`,
      '删除产品',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
      }
  )
      .then(async() => {
        const res = await deleteProduct(row.id)
        if(res.status==0){
          getFirstPageList(paginationData.currentPage)
          let content = `删除了id为${row.product_id}
          的${row.product_name}`
          await operationLog(
              localStorage.getItem('account') as any,
              localStorage.getItem('name') as any,
              content,'高级','成功')
        }
      })
}

</script>

<style scoped lang="scss">
@import "@/assets/css/common.scss";
</style>