<template>
  <el-dialog v-model="dialogFormVisible" title='编辑产品' width="600px" align-center draggable>
    <div class="dialog-content">
      <el-form ref="ruleFormRef" :model="formData" :label-position="labelPosition" :rules="rules"
               label-width="120px">
        <el-form-item label="入库编号" prop="product_id">
          <el-input v-model="formData.product_id" disabled />
        </el-form-item>
        <el-form-item label="产品名称" prop="product_name">
          <el-input v-model="formData.product_name" />
        </el-form-item>
        <el-form-item label="产品类别" prop="product_category">
          <el-select v-model="formData.product_category" placeholder="请选择产品类别">
            <el-option label="家电类" value="家电类" />
            <el-option label="服装类" value="服装类" />
            <el-option label="数码类" value="数码类" />
            <el-option label="食品类" value="食品类" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品单位" prop="product_unit">
          <el-select v-model="formData.product_unit" placeholder="请选择产品单位">
            <el-option label="个" value="个" />
            <el-option label="件" value="件" />
            <el-option label="千克" value="千克" />
            <el-option label="盒" value="盒" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品库存数量" prop="warehouse_number">
          <el-input v-model="formData.warehouse_number"
                    @input="changeWarehouse"/>
        </el-form-item>
        <el-form-item label="产品入库单价" prop="product_single_price">
          <el-input v-model="formData.product_single_price" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="edit">
					确定
				</el-button>
			</span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref,onBeforeUnmount } from 'vue'
import { editProduct } from '@/api/product'
import { ElMessage } from 'element-plus'
import type { FormProps } from 'element-plus'
import {
  bus
} from "@/utils/mitt"
import {
  operationLog
} from '@/api/operation_log'

bus.on('editRow', (row : any) => {
  formData.id = row.id
  formData.product_id = row.product_id
  formData.product_name = row.product_name
  formData.product_category = row.product_category
  formData.product_unit = row.product_unit
  formData.warehouse_number = row.warehouse_number
  firstNumber.value = row.warehouse_number
  formData.product_single_price = row.product_single_price
})
const labelPosition = ref<FormProps['labelPosition']>('left')


const formData = reactive({
  id:null,
  product_id: null,
  product_name: '',
  product_category: '',
  product_unit: '',
  warehouse_number: null,
  product_single_price: null,
})

const rules = reactive({
  product_name: [
    { required: true, message: '请输入产品名称', trigger: 'blur' },
  ],
  product_category: [
    { required: true, message: '请选择产品类别', trigger: 'blur' },
  ],
  product_unit: [
    { required: true, message: '请选择产品单位', trigger: 'blur' },
  ],
  warehouse_number: [
    { required: true, message: '请输入产品入库数量', trigger: 'blur' },
  ],
  product_single_price: [
    { required: true, message: '请输入产品入库单价', trigger: 'blur' },
  ],
})
const emit = defineEmits(['success'])

// 数量改变
const diffContent = ref<string>()
const firstNumber = ref<number>()
const changeWarehouse = (value:number) => {
  if(firstNumber.value!==undefined){
    if(value>firstNumber.value){
      let diff = value - firstNumber.value
      diffContent.value = `${formData.product_name}的库存新增了${diff}`
    }else{
      let diff =  firstNumber.value - value
      diffContent.value = `${formData.product_name}的库存减少了${diff}`
    }
  }
}

// 编辑产品
const edit = async  () => {
    const res = await editProduct(formData)
    if(res.status==0){
      emit('success')
      if(diffContent){
        await operationLog(localStorage.getItem('account') as any,
            localStorage.getItem('name') as any,
            diffContent.value as string,'中级','成功')
      }
      dialogFormVisible.value = false
    }else{
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
  padding: 20px 30px;
}

:deep(.el-form-item) {
  margin: 30px;
}
</style>
