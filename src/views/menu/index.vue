<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="210px">
        <div class="title">通用后台管理系统</div>
        <el-menu default-active="set" class="el-menu-vertical-demo" router>
          <el-menu-item index="set">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>个人设置</span>
            </template>
          </el-menu-item>
          <el-menu-item index="user">
            <el-icon><User /></el-icon>
            <span>用户模块</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left-content">亲爱的 {{ name }} 欢迎登录本系统</div>
          <div class="right-content">
            <el-avatar :size="34" :src="circleUrl" />
            <span class="exit" @click="exit">退出登陆</span>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Setting, User } from '@element-plus/icons-vue'
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()

const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})
const { circleUrl } = toRefs(state)

const name = ref(localStorage.getItem('name'))
const exit = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
.el-container {
  height: 100vh;
}
.el-menu {
  border-right: 0px;
}
.el-aside {
  border-right: 2px solid #dcdfe6;
}
.title {
  padding: 20px;
  text-align: center;
}

.el-header {
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  .right-content {
    width: 120px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .exit {
      cursor: pointer;
    }
  }
}

.el-main {
  padding: 0;
  background-color: #f3f4fa;
}
</style>
