import { createRouter, createWebHistory } from 'vue-router'
import routes from './route'
import store from '../store/index'

const router = createRouter({
    history: createWebHistory(), // 新版本配置路由模式
    routes
})

router.beforeEach((to, from, next) => {
    // 如果当前没有登陆并且想要进入about界面则阻止
    if (!store.state.user.isLogin && to.path === '/about') {
        console.log('请先进行登陆')
        return next({
            path: '/'
        })
    }
    next()
})

export default router