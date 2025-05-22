<template>
  <div class="card-wrapper">
    <el-card class="box-card">
      <div class="title">后台管理系统</div>
      <el-tabs v-model="activeName" class="demo-tabs"
               :stretch='true'>
        <el-tab-pane label="登录" name="first">
          <el-form class="login-form">
            <el-form-item label="账号">
              <el-input v-model="loginData.account" placeholder="请输入账号"/>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="loginData.password" placeholder="请输入密码" show-password/>
            </el-form-item>
            <div class="footer-wrapper">
<!--登录按钮-->
              <el-button type="primary" @click="Login">登录</el-button>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-form class="login-form">
            <el-form-item label="账号">
              <el-input v-model="registerData.account" placeholder="账号长度6-12位"/>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="registerData.password" show-password placeholder="密码需长度6-12位含字母数字"/>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="registerData.rePassword" show-password placeholder="请再次输入密码"/>
            </el-form-item>
            <div class="footer-wrapper">
              <el-button type="primary" @click="Register">注册</el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'
import {
  login, register,returnMenuList
} from '@/api/login'
import { useUserInfo } from '@/stores/user' // 导入Store
import {loginLog} from '@/api/login_log'
// 引入路由、定义路由实例
import { useRouter } from 'vue-router'
import {useMenu} from "@/stores/menu";
const menuStore = useMenu()
const router = useRouter()
const userStore = useUserInfo() // 创建实例
const activeName = ref('first')

// 表单接口
interface FormData {
  account: number | null;
  password: string;
  // 再次输入密码
  rePassword?: string;
}

// 登录表单数据
const loginData: FormData = reactive({
  account: null,
  password: '',
})
// // 注册表单数据
const registerData: FormData = reactive({
  account: null,
  password: '',
  rePassword: '',
})

// 登录
const Login = async () => {
  const res = await login(loginData)
  if (res.status == 0) {
    // 解构赋值
    const {account,name,email,id,position,department} = res.results
    await loginLog(account,name,email)
    localStorage.setItem('account', account)
    localStorage.setItem('name', name)
    localStorage.setItem('id', id)
    localStorage.setItem('position', position)
    localStorage.setItem('department', department)
    userStore.userInfo(account)
    const routerList = await returnMenuList(id)
    // console.log(routerList)
    menuStore.setRouter(routerList)
    router.push('/set') // 登录成功后跳转至个人设置页面
  }
}



// 注册
const Register = async () => {
  if (registerData.password == registerData.rePassword) {
    const res = await register(registerData)
    // console.log(res)
    if (res.status == 0) {
      activeName.value = 'first'
    }
  }
}

</script>

<style scoped lang="scss">
// 卡片组件外壳
.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

// 卡片组件
.box-card {
  width: 400px;
  height: 345px;
  // 系统标题
  .title {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }

  // 底部外壳
  .footer-wrapper {
    display: flex;
    justify-content: center;
  }
}

// 标签页字体大小
:deep(.el-tabs__item) {
  font-size: 18px;
}

// 输入框高度
:deep(.el-input__inner) {
  height: 40px;
}

// 输入框标签字体高度
:deep(.el-form-item__label) {
  height: 40px;
  line-height: 40px;
}

// 登录按钮
.el-button {
  width: 300px;
  height: 45px;
  font-size: 16px;
}
</style>