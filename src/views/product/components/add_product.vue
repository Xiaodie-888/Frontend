<template>
  <el-dialog v-model="dialogFormVisible" title='产品入库' width="600px" align-center draggable>
    <div class="dialog-content">
      <el-form ref="ruleFormRef" :model="formData" :label-position="labelPosition" :rules="rules"
               label-width="120px">
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
        <el-form-item label="产品入库数量" prop="warehouse_number">
          <el-input v-model="formData.warehouse_number" />
        </el-form-item>
        <el-form-item label="产品入库单价" prop="product_single_price">
          <el-input v-model="formData.product_single_price" />
        </el-form-item>
        <el-form-item label="入库操作人" prop="product_create_person">
          <el-input v-model="formData.product_create_person" disabled/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="add">
					确定
				</el-button>
			</span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { addProduct } from '@/api/product'
import type { FormProps } from 'element-plus'
import { ElMessage } from 'element-plus'
const labelPosition = ref<FormProps['labelPosition']>('left')

interface formData {
  [key: string]: any,
  product_name : string,
  product_category : string,
  product_unit : string,
  warehouse_number : number|null,
  product_single_price : number|null,
  product_create_person : string,
}

const formData : formData = reactive({
  product_name: '',
  product_category: '',
  product_unit: '',
  warehouse_number: null,
  product_single_price: null,
  product_create_person: localStorage.getItem('name') as string,
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
  product_create_person: [
    { required: true, message: '请输入入库操作人', trigger: 'blur' },
  ],
})
const emit = defineEmits(['success'])
// 产品出库
const add = async() => {
  let hasEmptyValue = false
  for (const key in formData ) {
    if (formData[key] == '') {
      hasEmptyValue= true
      break
    }
  }
  if (hasEmptyValue) {
    ElMessage.error('请输入上传的产品信息')
  }else{
    const res = await addProduct(formData)
    if (res.status == 0) {
      emit('success')
      dialogFormVisible.value = false
    }
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
