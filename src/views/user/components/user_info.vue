<template>
  <el-dialog v-model="dialogVisible" title="用户信息" width="600px">
    <div class="dialog-wrapper">
      <!--    左边部分-->
      <div class="dialog-left">
        <el-avatar shape="square" :size="178" :src="imageUrl"/>
      </div>
      <!--    右边部分-->
      <div class="dialog-right">
        <el-row>
          <el-col :span="8">
            <span>姓名：{{ userName }}</span>
          </el-col>
          <el-col :span="16">
            <span>账号：{{ userAccount }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="status">状态：
              <el-tag v-if="userStatus==1" class="ml-2">冻结</el-tag>
              <el-tag class="ml-2" type="success" v-else>正常</el-tag>
            </div>
          </el-col>
          <el-col :span="16">
            <span>联系方式：{{ userEmail }}</span>
          </el-col>
        </el-row>
        <div class="info-wrapper">
          <span>用户部门：</span>
          <div class="info-content">
            <el-select v-model="userDepartment"
                       @change="editDepartment">
              <el-option label="人事部" value="人事部"/>
              <el-option label="产品部" value="产品部"/>
            </el-select>
          </div>
        </div>
        <div class="info-wrapper">
          <span>用户职位：</span>
          <div class="info-content">
            <el-select v-model="userPosition"
                       @change="editPosition">
              <el-option label="员工" value="员工"/>
              <el-option label="经理" value="经理"/>
            </el-select>
          </div>
        </div>
      </div>

    </div>
    <template #footer v-if="admin()">
      <span class="delete" @click="openMessageBox">删除用户</span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {bus} from "@/utils/mitt"
import {changeLevel, deleteUser} from '@/api/user'
import {ElMessage, ElMessageBox} from 'element-plus'
import {operationLog} from '@/api/operation_log'

bus.on('info', (row: any) => {
  userId.value = row.id
  // 其余赋值
  imageUrl.value = row.image_url
  userName.value = row.name
  userAccount.value = row.account
  userStatus.value = row.status
  userEmail.value = row.email
  userDepartment.value = row.department
  userPosition.value = row.position
})

const userId = ref<number>()

const imageUrl = ref()
const userName = ref<string>()
const userAccount = ref<number>()
const userEmail = ref<string>()
const userStatus = ref(1)
const userDepartment = ref<string>()
const emit = defineEmits(['success'])
const editDepartment = async () => {
  await changeLevel(userId.value as number, userDepartment.value)
  emit('success')
}
const userPosition = ref<string>()
const editPosition = async () => {
  await changeLevel(userId.value as number, undefined, userPosition.value)
  emit('success')
}

const dialogVisible = ref(false)

const openMessageBox = () => {
  ElMessageBox.confirm(
      '您确定要删除这个用户吗?',
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        let id = localStorage.getItem('id') as any as number
        if(id == userId.value){
          return ElMessage.error('不能删除自己！')
        }
        const res = await deleteUser(userId.value as number)
        const content = `删除了用户${userAccount.value}`
        if(res.status==0){
          await operationLog(localStorage.getItem('account') as any,
              localStorage.getItem('name') as any,
              content,'高级','成功')
          emit('success')
          dialogVisible.value = false
        }else{
          await operationLog(localStorage.getItem('account') as any,
              localStorage.getItem('name') as any,
              content,'高级','失败')
          dialogVisible.value = false
        }
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}

const admin = () =>{
  if(localStorage.getItem('position')=='员工'){
    return false
  }else{
    return true
  }
}
admin()
// 打开修改密码的弹窗
const open = () => {
  dialogVisible.value = true
}

defineExpose({
  open
})
</script>

<style scoped lang="scss">
.dialog-wrapper {
  display: flex;

  .dialog-left {
    width: 30%;
    display: flex;
    justify-content: center;
  }

  .dialog-right {
    font-size: 16px;
    width: 70%;
    padding: 10px;


    .status {
      display: flex;
      align-items: center;
    }

    .info-wrapper {
      display: flex;
      align-items: center;
      height: 40px;

      .info-content {
        margin-left: 20px;
      }
    }
  }
}

.delete {
  font-size: 16px;
  color: #409eff;
  cursor: pointer;
}

.el-row {
  margin-bottom: 20px;
}
</style>