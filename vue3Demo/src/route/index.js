import { createRouter, createWebHistory } from 'vue-router'
import routes from './route'

export default createRouter({
    history: createWebHistory(), // 新版本配置路由模式
    routes
})