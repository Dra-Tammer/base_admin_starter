import {createApp} from 'vue'
import {createPinia} from "pinia";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// vue本质上是一个单页面应用，用户在哪刷新页面都是刷新index.html
import {useUserStore} from "@/store/user";

const pinia = createPinia()
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.use(pinia)

// 页面刷新时更新用户的信息
const userStore = useUserStore()
const {verifyAuth} = userStore
await verifyAuth()
app.use(router)
app.use(ElementPlus)

app.mount('#app')
