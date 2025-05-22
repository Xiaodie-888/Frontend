<template>
  <BreadCrumb :name='name'></BreadCrumb>
  <!-- 外壳 -->
  <div class="common-wrapper">
    <!-- 内容 -->
    <div class="common-content">
      <div class="login-week"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref
} from 'vue'
import BreadCrumb from "@/components/bread_crumb.vue";
import { getDayAndNumber } from "@/api/login_log"
import * as echarts from 'echarts';

onMounted(()=>{
  loginWeek()
})
// 面包屑参数
const name = ref('统计模块')

// 消息每日总量图
const loginWeek = async () => {
  const loginData = echarts.init(document.querySelector('.login-week') as HTMLElement)
  loginData.showLoading()
  let data = await getDayAndNumber() as any
  console.log(data)
  loginData.hideLoading()
  loginData.setOption({
    xAxis: {
      type: 'category',
      data: data.week,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data:data.number,
        type: 'line'
      }
    ]
  })
}
</script>


<style scoped lang="scss">
@import '@/assets/css/common.scss';

.login-week{
  width: 1000px;
  height: 300px;
}
</style>