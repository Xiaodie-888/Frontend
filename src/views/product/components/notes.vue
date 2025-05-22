<template>
  <el-dialog v-model="dialogVisible" title="审核产品" width="400px">
      <div class="apply-notes">
        <span>申请备注：</span>
        <el-input
            v-model="apply_notes"
            :rows="2"
            type="textarea"
            disabled
        />
      </div>
      <div class="audit-notes">
        <span>审核备注：</span>
        <el-input
            v-model="audit_notes"
            :rows="2"
            type="textarea"
            :disabled="admin()"
        />
      </div>

    <template #footer v-if="!admin()">
      <el-button type="success"
                 @click="confirm('通过')">通过审核</el-button>
      <el-button type="danger"
                 @click="confirm('不通过')">拒绝审核</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {bus} from "@/utils/mitt"
import { productInfo,audit } from "@/api/product"
bus.on('applyRow',(id)=>{
  productId.value = id
})
const productId = ref<number>()

// 申请备注
const apply_notes =ref()
// 审核备注
const audit_notes = ref()

const dialogVisible = ref(false)

const emit = defineEmits(['success'])
const confirm = async (audit_status:string) => {
  // 获取用户信息
  const res = await productInfo(productId.value as number)
  // 置换原有属性
  res.audit_notes = audit_notes.value
  res.audit_status = audit_status
  res.audit_person = localStorage.getItem('name')
  res.apply_time = convertISOToMySQLFormat(res.apply_time)
  // 审核阶段
  const res1 = await audit(res)
  if(res1.status==0){
    emit('success')
    dialogVisible.value= false
  }
}

const convertISOToMySQLFormat = (isoString:any) => {
  let date = new Date(isoString);
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let seconds = ("0" + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const admin = () => {
  if(localStorage.getItem('position')=='经理'){
    return true
  }else{
    return false
  }
}

const open = () => {
  dialogVisible.value = true
}

defineExpose({
  open
})
</script>

<style scoped lang="scss">

</style>