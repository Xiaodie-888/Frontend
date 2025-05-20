<template>
  <div class="card-wrapper">
    <el-card class="box-card">
      <div class="title">后台管理系统</div>
      <el-tabs v-model="activeName" class="demo-tabs" stretch>
        <el-tab-pane label="登录" name="first">
          <el-form label-width="auto" :model="loginData" style="max-width: 600px">
            <el-form-item label="账号" :label-position="LabelPosition">
              <el-input v-model="loginData.account" />
            </el-form-item>
            <el-form-item label="密码" :label-position="LabelPosition">
              <el-input v-model="loginData.password" show-password />
            </el-form-item>
          </el-form>
          <div class="footer-wrapper">
            <el-button type="primary" @click="Login">登录</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-form label-width="auto" :model="registerData" style="max-width: 600px">
            <el-form-item label="账号" :label-position="LabelPosition">
              <el-input v-model="registerData.account" />
            </el-form-item>
            <el-form-item label="密码" :label-position="LabelPosition">
              <el-input v-model="registerData.password" show-password />
            </el-form-item>
            <el-form-item label="确认密码" :label-position="LabelPosition">
              <el-input v-model="registerData.rePassword" show-password />
            </el-form-item>
          </el-form>
          <div class="footer-wrapper">
            <el-button type="primary" @click="Register">注册</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { login, register } from '@/api/login'
import type { FormItemProps, FormProps } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

//默认打开的卡片
const activeName = ref('first')
//表单标签位置
const LabelPosition = ref<FormItemProps['labelPosition']>('left')

interface FormData {
  account: number | null
  password: string
  rePassword?: string
}
const loginData: FormData = reactive({
  account: null,
  password: '',
})
const registerData: FormData = reactive({
  account: null,
  password: '',
  rePassword: '',
})

const Login = () => {
  router.push('/menu')
  // const res = await login(loginData)
  // console.log(res)
}

const Register = async () => {
  const res = await register(registerData)
  console.log(res)
  if (res.status == 0) {
    activeName.value = 'first'
  }
}
</script>

<style scoped lang="scss">
.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;

  .box-card {
    width: 400px;
    height: 345px;

    .title {
      font-size: 20px;
      font-weight: 700;
      text-align: center;
    }
  }
}

.footer-wrapper {
  display: flex;
  justify-content: center;

  .el-button {
    width: 300px;
    height: 45px;
    font-size: 16px;
  }
}
:deep(.el-input__inner) {
  height: 40px;
}

:deep(.el-form-item__label) {
  height: 40px;
  line-height: 40px;
}
</style>
