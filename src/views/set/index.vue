<template>
  <BreadCrumb :name="theme"></BreadCrumb>
  <!-- 外壳 -->
  <div class="common-wrapper">
    <!-- 内容 -->
    <div class="common-content">
      <div class="info-wrapper">
        <span>用户头像</span>
        <div class="info-content">
          <el-upload
            class="avatar-uploader"
            action="https://127.0.0.1:3007/user/uploadAvater"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>
      </div>
      <div class="info-wrapper">
        <span>用户账号：</span>
        <div class="info-content">
          <el-input v-model="userAccount" disabled></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BreadCrumb from '@/components/bread_crumb.vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { getUserInfo, bindAccount } from '@/api/user'

const userAccount = ref()

onMounted(async () => {
  let account = localStorage.getItem('account') as any
  const res = (await getUserInfo(account)) as any
  userAccount.value = res.account
})

const theme = ref('个人设置')

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = async (response, uploadFile) => {
  if (response.status == 0) {
    await bindAccount(userAccount.value, response.url)
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像必须是JPG格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像必须小于2MB!')
    return false
  }
  return true
}
</script>

<style scoped lang="scss">
// 账号信息外壳

.common-wrapper {
  padding: 0px 8px 8px 8px; // 内边距
  height: calc(100% - 38px); // 账号信息内容的高度，减去顶部导航栏的高度

  // 账号信息内容
  .common-content {
    height: 100%; // 内容高度占满外壳
    background: #fff; // 背景颜色

    .info-wrapper {
      display: flex;
      align-items: center;
      padding-left: 60px;
      padding-top: 24px;
      font-size: 14px;
    }
    // 账号信息内容
    .info-content {
      margin-left: 24px;
      margin-right: 16px;
    }
  }
}

:deep(.el-input) {
  width: 240px;
}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
