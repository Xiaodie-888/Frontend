<template>
  <BreadCrumb :name='name'></BreadCrumb>
  <div class="common-wrapper">
    <div class="common-content">
<!--      表格头部-->
      <div class="table-header">
        <!--        表格上方左部分-->
        <div class="left-header">
          <!--          账号搜素框-->
          <el-input
              v-model="userAccount"
              class="w-50 m-2 distance"
              placeholder="输入账号进行搜索"
              :suffix-icon="Search"
              @change="searchByAccount"
          />
          <!--          部门下拉框-->
          <el-select class="distance"
                     v-model="department"
                     placeholder="请选择部门"
                     clearable
                     @change="searchByDepartment"
                     @clear="clearOperation">
            <el-option v-for="item in departmentData"
                       :key="item" :label="item"
                       :value="item"/>
          </el-select>
          <!--          状态单选框-->
            <el-radio-group v-model="userStatus"
                            class="ml-4 distance"
                            @change="searchByStatus">
              <el-radio label="1">冻结</el-radio>
              <el-radio label="0">正常</el-radio>
            </el-radio-group>
        </div>
        <!--        表格上方右部分-->
        <div class="right-header">
          <el-button type="primary" @click="getAllUser">所有用户</el-button>
        </div>
      </div>
      <!--      表格区域-->
      <div class="table-content">
        <el-table :data="tableData"
                  style="width: 100%"
                  border
                  @row-dblclick='editUser'>
          <el-table-column type="index" width="50"/>
          <el-table-column prop="account" label="账号" width="100"/>
          <el-table-column prop="name" label="姓名"/>
          <el-table-column prop="age" label="年龄"/>
          <el-table-column prop="sex" label="性别"/>
          <el-table-column prop="department" label="部门"/>
          <el-table-column prop="position" label="职位"/>
          <el-table-column prop="email" label="邮箱" width="150"/>
          <el-table-column prop="status" label="状态">
            <template #default="{row}">
                <el-tag v-if="row.status=='1'" class="ml-2">冻结</el-tag>
                <el-tag class="ml-2" type="success" v-else>正常</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="150">
            <template #default="{row}">
              <div>{{ row.create_time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="update_time" label="更新时间" width="150">
            <template #default="{row}">
              <div>{{ row.update_time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{row}">
              <div class="button-content">
                <el-button type="primary" @click="banUserById(row.id)"
                           :disabled='row.status==1'>冻结
                </el-button>
                <el-button type="success" @click="actUserById(row.id)"
                           :disabled='row.status==0'>解冻
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="table-footer">
        <el-pagination :current-page="paginationData.currentPage"
                       :pager-count="7"
                       :page-count="paginationData.pageCount"
                       @current-change="changePage"
                       layout="prev, pager, next"
        />
      </div>
    </div>
  </div>
  <UserInfo ref="userInfo" @success="renderThisPage"></UserInfo>
</template>

<script lang="ts" setup>
import {
  ref, reactive, onBeforeUnmount
} from 'vue'
import {Search} from '@element-plus/icons-vue'
import BreadCrumb from '@/components/bread_crumb.vue'
import UserInfo from './components/user_info.vue'
import {getUserListForPage,getUserLength,banUser,thawUser,
  getUserInfo,getUserByDepartment,UserLengthForDepartment,
  UserLengthForStatus,getStatusUserList} from '@/api/user'
import { bus } from "@/utils/mitt"

// 面包屑参数
const name = ref('用户管理')
// 搜索框的modelValue
const userAccount = ref<number | null>()
// 表格内容
const tableData = ref<object[]>([])

// 默认获取第一页的数据
const getFirstPageList = async () => {
  tableData.value = await getUserListForPage(1) as any
}
getFirstPageList()

// 重新渲染当前页码的数据
const renderThisPage = async () => {
  tableData.value = await
      getUserListForPage(paginationData.currentPage) as any
}

// 通过账号进行搜索
const searchByAccount = async () => {
  tableData.value = await getUserInfo(userAccount.value as number) as any
}
// 部门数据
const departmentData = ref(['人事部','产品部'])
// 根据部门获取用户
const department = ref()
const searchByDepartment = async () => {
  const res = await UserLengthForDepartment(department.value) as any
  paginationData.pageCount = Math.ceil(res.length / 10) // 获取总页数
  tableData.value = await getUserByDepartment(1,department.value) as any // 默认返回第一页数据
  if(paginationData.currentPage!==1){
    tableData.value = await
        getUserByDepartment(paginationData.currentPage,department.value) as any // 默认返回第一页数据
  }
}
// 清空选项
const clearOperation = () => {
  getFirstPageList()
}

// 分页数据
const paginationData = reactive({
  // 总页数
  pageCount: 1,
  // 当前所处页数
  currentPage: 1,
})
// 返回用户长度得出页数
const returnUserLength = async  () => {
  const res = await getUserLength() as any
  // console.log(res.length)
  paginationData.pageCount = Math.ceil(res.length / 10)
}
returnUserLength()

// 监听换页
const changePage = async (value: number) => {
  paginationData.currentPage = value
  tableData.value = await getUserListForPage(value) as any
}

const userStatus = ref<number | null>()

// 筛选不同状态用户
const searchByStatus = async () => {
  const res = await
      UserLengthForStatus(userStatus.value as number) as any
  paginationData.pageCount = Math.ceil(res.length / 10)
  tableData.value = await
      getStatusUserList(1,userStatus.value as number) as any
  if(paginationData.currentPage!==1){
    tableData.value = await
        getStatusUserList(paginationData.currentPage,
            userStatus.value as number) as any
  }
}


// 冻结用户
const banUserById = async (id: number) => {
  const res = await banUser(id)
  if (res.status == 0) {
    tableData.value = await
        getUserListForPage(paginationData.currentPage) as any
  }
}


// 解冻用户 少async
const actUserById = async (id: number) => {
  const res = await thawUser(id)
  if (res.status == 0) {
    tableData.value = await
        getUserListForPage(paginationData.currentPage) as any
  }
}

const getAllUser = () =>{
  if(userAccount.value) userAccount.value = null
  if(userStatus.value) userStatus.value = null
  if(department.value) department.value = null
  // 请求逻辑
  getFirstPageList()
  returnUserLength()
}

const userInfo = ref()
// 双击进入编辑用户页面
const editUser = (row:any) =>{
  bus.emit('info',row)
  userInfo.value.open()
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/common.scss';

.table-header{
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
}
.distance{
  margin: 0 10px;
}
//表格区域
.table-content{
  padding: 0px 10px;
}
//底部分页
.table-footer{
  display: flex;
  justify-content: flex-end;
  margin: 10px 10px 0 0;
}

:deep(.el-input){
  width: 240px;
}
</style>
