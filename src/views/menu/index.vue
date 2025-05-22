<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="210px">
        <el-menu class="el-menu-vertical-demo" router default-active="set">
          <div class="title">通用后台管理系统</div>
          <el-menu-item index="set">
            <el-icon>
              <Tools/>
            </el-icon>
            <span>个人设置</span>
          </el-menu-item>
          <el-menu-item index="user" v-if="userAdmin||superAdmin">
            <el-icon><User /></el-icon>
            <span>用户模块</span>
          </el-menu-item>
          <el-menu-item index="login_log" v-if="superAdmin">
            <el-icon><Clock /></el-icon>
            <span>登录日志</span>
          </el-menu-item>
          <el-menu-item index="operation_log" v-if="superAdmin">
            <el-icon><Operation /></el-icon>
            <span>操作日志</span>
          </el-menu-item>
          <el-sub-menu index="产品管理" v-if="productAdmin||superAdmin">
            <template #title>
              <el-icon><Goods /></el-icon>
              <span>产品管理</span>
            </template>
            <el-menu-item-group title="产品列表">
              <el-menu-item index="product">产品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="审核列表">
              <el-menu-item index="audit">审核列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="出库列表">
              <el-menu-item index="outbound">出库列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="statistics" v-if="superAdmin">
            <el-icon><PieChart /></el-icon>
            <span>统计</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left-content">尊敬的 {{name}} 欢迎您登录本系统</div>
          <div class="right-content">
            <el-avatar :size="24" :src="userStore.imageUrl"/>
            <span class="exit" @click="exit">
								退出登录
            </span>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserInfo } from '@/stores/user'

import {useRouter} from 'vue-router'
import {useMenu} from "@/stores/menu";
const menuStore = useMenu()
// console.log(menuStore.menuData)
const userStore = useUserInfo()
const router = useRouter()

// const imageUrl = ref('http://127.0.0.1:3007/upload/123.jpg')

const name = ref(localStorage.getItem('name'))

const superAdmin = ref(false)
const userAdmin = ref(false)
const productAdmin = ref(false)
const getDepartment = () => {
  let department = localStorage.getItem('department')
  if(department == '人事部'){
    userAdmin.value = true
  }
  if(department == '产品部'){
    productAdmin.value = true
  }
  if(department == '超级管理员'){
    superAdmin.value = true
  }
}
getDepartment()
const exit = () => {
  router.push('/')
  localStorage.clear()
}

</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-menu {
  border-right: 0px;
}
.el-aside{
  border-right: 1px solid #dcdfe6;
}
//
//// 标题
.title {
  padding: 20px;
  text-align: center;
}
//
.el-header {
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;

  .right-content {
    width: 120px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .exit{
      cursor: pointer;
    }
  }
}

// 默认带有边距，需去除
.el-main {
  --el-main-padding: 0;
  background-color: #f3f4fa;
}

</style>