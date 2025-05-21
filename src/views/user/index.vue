<template>
  <BreadCrumb :name="name"></BreadCrumb>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BreadCrumb from '@/components/bread_crumb.vue'
const name = ref('用户管理')
// :name="name" 是单向数据流
// 前面的 name 是 prop 名称
// 后面的 name 是父组件中的数据源
// 数据只能从父组件流向子组件，不能反向修改
</script>

<style scoped></style>
