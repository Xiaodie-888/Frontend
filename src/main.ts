import { createApp } from 'vue'
// 导入pinia
import pinia from './stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入element plus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import router from './router'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus, {
    locale: zhCn,
})
// 调整链式

app.use(pinia)

import {useMenu} from "@/stores/menu";
const menuRouter = useMenu()
menuRouter.addRouter()


app.use(router).mount('#app')

