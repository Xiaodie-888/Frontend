<template>
  <el-dialog v-model="dialogFormVisible" title='申请出库' width="600px" align-center draggable>
    <div class="product-name">您申请出库的产品是:&nbsp;&nbsp;{{formData.product_name}}</div>
    <div class="product-name">该产品的库存还有:&nbsp;&nbsp;{{ formData.warehouse_number }}</div>
    <div class="dialog-content">
      <el-form ref="ruleFormRef" :model="formData" :label-position="labelPosition" :rules="rules"
               label-width="120px">
        <el-form-item label="出库数量" prop="product_out_number">
          <el-input v-model="formData.product_out_number" />
        </el-form-item>
        <el-form-item label="出库申请人" prop="apply_person">
          <el-input v-model="formData.apply_person" disabled/>
        </el-form-item>
        <el-form-item label="产品单价" prop="product_single_price">
          <el-input v-model="formData.product_single_price" disabled/>
        </el-form-item>
        <el-form-item label="申请出库备注" prop="apply_notes">
          <el-input v-model="formData.apply_notes" :rows="2" type="textarea" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
			<span class="dialog-footer">
				<el-button type="primary"
                   @click="apply"
                   :disabled='compare()'>
					确定
				</el-button>
			</span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref, onBeforeUnmount, watch} from 'vue'
// import { applyOutProduct } from '@/api/product'
import {ElMessage} from 'element-plus'

import type { FormProps } from 'element-plus'
import {
  bus
} from "@/utils/mitt"
import {Outbound} from "@/api/product";

bus.on('applyRow', (row : any) => {
  formData.id = row.id
  formData.warehouse_number = row.warehouse_number
  formData.product_name = row.product_name
  formData.product_single_price = row.product_single_price
})

const labelPosition = ref<FormProps['labelPosition']>('left')


const formData = reactive({
  id: null,
  product_name:'',
  warehouse_number:null,
  product_single_price:null,
  product_out_number: null,
  apply_person: localStorage.getItem('name'),
  apply_notes: ''
})

const rules = reactive({
  out_warehouse_number: [
    { required: true, message: '请输入申请出库数量', trigger: 'blur' },
  ],
})

const compare = () =>{
  if(formData.warehouse_number&&formData.product_out_number){
    if(formData.warehouse_number<formData.product_out_number){
      return true
    }else{
      return false
    }
  }
}


const emit = defineEmits(['success'])
// 产品出库
const apply = async () => {
  const res = await Outbound(formData)
  if (res.status == 0) {
    emit('success')
    dialogFormVisible.value = false
  } else {
    dialogFormVisible.value = false
  }
}
// 弹窗开关
const dialogFormVisible = ref(false)

// 打开创建管理员的弹窗
const open = () => {
  dialogFormVisible.value = true
}

defineExpose({
  open
})

onBeforeUnmount(() => {
  bus.all.clear()
})
</script>

<style lang="scss" scoped>
.dialog-content {
  display: flex;
  padding: 0 30px 20px 30px;
}

.product-name {
  display: flex;
  justify-content: center;
  font-size: 16px;
  margin: 10px;
  color: #333;
}

:deep(.el-form-item) {
  margin: 30px;
}
</style>
