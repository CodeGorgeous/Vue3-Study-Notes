import Home from '../view/Home/index.vue'
import { defineAsyncComponent } from 'vue'
import nprogress from "nprogress"

export default [
    { path: "/", name: 'Home', component: Home },
    {
        path: "/about",
        name: 'About',
        component: () => import('../view/About/index.vue')
    },
]