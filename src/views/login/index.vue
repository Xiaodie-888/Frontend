<template>
  <el-card style="width: 480px">
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
        <el-button type="primary">登录</el-button>
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
        <el-button type="primary">注册</el-button>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormItemProps, FormProps } from 'element-plus'
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
</script>

<style scoped lang="scss"></style>
