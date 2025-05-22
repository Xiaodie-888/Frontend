<template>
  <!-- 修改密码 -->
  <el-dialog v-model="dialogVisible " title="修改密码" width="400px">
    <el-form class="login-form"
             :label-position="labelPosition"
             :model="passwordData"
             :rules="rules">
      <el-form-item label="请输入您的旧密码" prop="oldPassword">
        <el-input v-model="passwordData.oldPassword"
                  placeholder="请输入您的旧密码"
                  show-password />
      </el-form-item>
      <el-form-item label="请输入您的新密码" prop="newPassword">
        <el-input v-model="passwordData.newPassword"
                  placeholder="请输入您的新密码"
                  show-password />
      </el-form-item>
    </el-form>
    <!-- 底部内容 -->
    <template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible  = false">取消</el-button>
				<el-button type="primary" @click="sure">
					确定
				</el-button>
			</span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

import { changePassword } from '@/api/user'
import { useRouter } from 'vue-router'
import {
  ElMessage
} from 'element-plus'
import type { FormProps, FormRules  } from 'element-plus'
const router = useRouter()
// 表单对齐方式
const labelPosition = ref<FormProps['labelPosition']>('top')
// 表单对象接口
// 密码是有字母跟数字 所有是string
interface PasswordData {
  oldPassword : string;
  newPassword : string;
}
// 表单对象
const passwordData : PasswordData = reactive({
  oldPassword: '',
  newPassword: '',
})
// 表单规则
const rules = reactive<FormRules<PasswordData>>({
  oldPassword: [
    { required: true, message: '请输入您的旧密码', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入您的新密码', trigger: 'blur' },
  ],
})
// 控制弹窗 默认关闭

const dialogVisible  = ref(false)


// 修改密码 id 跟 两个 password 少async
const sure = async () => {
  // 判断是否输入新旧密码值
  if (passwordData.oldPassword && passwordData.newPassword) {
    // 调用接口
    const res = await changePassword(
        localStorage.getItem('id') as any ,
        passwordData.oldPassword,
        passwordData.newPassword)
    console.log(res)
    if (res.status == 0) {
      dialogVisible.value = false
      router.push('/')
    }
  } else {
    ElMessage.error('请输入密码！')
  }
}
// 打开修改密码的弹窗
const open = () => {
  dialogVisible.value = true
}

defineExpose({
  open
})

// onBeforeUnmount(()=>{
// 	bus.all.clear()
// })
</script>

<style lang="scss" scoped>
</style>
