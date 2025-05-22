<template>
  <BreadCrumb :name='name'></BreadCrumb>
  <!-- 外壳 -->
  <div class="common-wrapper">
    <!-- 内容 -->
    <div class="common-content">

      <div class="info-wrapper">
        <span>用户头像：</span>
<!--        <el-upload> 标签内-->
        <div class="info-content">
          <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="userStore.imageUrl" :src="userStore.imageUrl" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </div>
      </div>
      <div class="info-wrapper">
        <span>用户账号：</span>
        <div class="info-content">
          <el-input v-model="userAccount" disabled></el-input>
        </div>
      </div>
      <div class="info-wrapper">
        <span>用户密码：</span>
        <div class="info-content">
          <el-button type="primary" @click="openChangePassword">修改密码</el-button>
        </div>
      </div>
      <div class="info-wrapper">
        <span>用户姓名：</span>
        <div class="info-content">
          <el-input v-model="userName"></el-input>
        </div>
          <el-button type="primary" @click="saveName">保存</el-button>
      </div>
      <div class="info-wrapper">
        <span>用户年龄：</span>
        <div class="info-content">
          <el-input v-model="userAge"></el-input>
        </div>
        <el-button type="primary" @click="saveAge">保存</el-button>
      </div>
      <div class="info-wrapper">
        <span>用户性别：</span>
        <div class="info-content">
          <el-select v-model="userSex" placeholder="选择性别">
            <el-option label="男" value="男"/>
            <el-option label="女" value="女"/>
          </el-select>
        </div>
          <el-button type="primary" @click="saveSex">保存</el-button>
      </div>
      <div class="info-wrapper">
        <span>用户职位：</span>
        <div class="info-content">
          <el-input v-model="userPosition" disabled></el-input>
        </div>
      </div>
      <div class="info-wrapper">
        <span>用户部门：</span>
        <div class="info-content">
          <el-input v-model="userDepartment" disabled></el-input>
        </div>
      </div>
      <div class="info-wrapper">
        <span>用户邮箱：</span>
        <div class="info-content">
          <el-input v-model="userEmail"></el-input>
        </div>
        <div class="save-button">
          <el-button type="primary" @click="saveEmail">保存</el-button>
        </div>
      </div>

    </div>
  </div>
  <!-- 取消按钮 -->
    <change ref="handleDialog"></change>
</template>

<script lang='ts' setup>
import {
  onMounted,
  ref,
} from 'vue'
import BreadCrumb from '@/components/bread_crumb.vue'
import { useUserInfo } from '@/stores/user' // 导入Store

import {
  ElInput
} from 'element-plus'
import {
  ElMessage
} from 'element-plus'
import {
  Plus
} from '@element-plus/icons-vue'
import change from './components/change_password.vue'
import type {UploadProps} from 'element-plus'
import { bindAccount, getUserInfo,changeName,changeSex,changeAge  } from '@/api/user' // 导入接口
onMounted(async () => {
  let account = localStorage.getItem('account') as any // 类型断言
  const res = await getUserInfo(account) as any
  console.log(res)
  userId.value = res.id as number
  userAccount.value = res.account as number
  userName.value = res.name as string
  userAccount.value = res.account as number
  userSex.value = res.sex as string
userAge.value = res.age as number
})
const userStore = useUserInfo()

const userId = ref()
const imageUrl = ref()

const uploadUrl = ref(`${import.meta.env.VITE_API_BASEURL}/user/uploadAvatar`)

const handleDialog = ref()

// 面包屑参数
const name = ref('个人设置')


const userAccount = ref()
const userDepartment = ref()
const userPosition = ref()
// 头像上传成功的函数 response回应
const handleAvatarSuccess: UploadProps['onSuccess'] = async (
    response,
    uploadFile
) => {
// res.send返回的status为0
  if (response.status == 0) {
// 传入账号和图片地址
    userStore.$patch({
      imageUrl: response.url
    })
    imageUrl.value = response.url
    await bindAccount(userAccount.value as number, response.url)
  }
}

// 头像上传之前的函数
const beforeAvatarUpload = (rawFile: any) => {
  console.log(rawFile)
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像必须是jpg格式！')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像必须小于2MB!')
    return false
  }
  return true
}
// 打开密码弹窗
const openChangePassword = () => {
  handleDialog.value.open()
}
// 保存姓名
const userName = ref()
const saveName = async () => {
  const res = await changeName(userName.value,userId.value)
  console.log(res)
}
// 保存年龄
const userAge = ref()
const saveAge = async () => {
  const res = await changeAge(userAge.value,userId.value)
  console.log(res)
}

// 保存性别
const userSex = ref()
const saveSex = async () =>  {
  const res = await changeSex(userSex.value, userId.value) // 只保留await语句
  console.log(res)
}

const userEmail = ref<string | null>()
// 保存邮箱
const saveEmail = () => {
  // const res = await changeEmail(userData.email, localStorage.getItem('id') as unknown as number)
  // if (res.status == 0) {
  //   ElMessage({
  //     message: '修改成功',
  //     type: 'success',
  //   })
  // } else {
  //   ElMessage.error('修改邮箱失败，请重新输入！')
  // }
}

</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';

    // 账号信息外壳
    .info-wrapper {
      display: flex;
      align-items: center;
      padding-left: 60px;
      padding-top: 24px;
      font-size: 14px;

      // 账号信息内容
      .info-content {
        margin-left: 24px;
        margin-right: 16px;
      }
    }



// 上传头像
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

// 输入框的长度
:deep(.el-input) {
  width: 240px;
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
