import Home from '../view/Home/index.vue'
import About from '../view/About/index.vue'
import { defineAsyncComponent } from 'vue'
import nprogress from "nprogress"

export default [
    { path: "/", component: Home },
    {
        path: "/about",
        component: defineAsyncComponent({
            loader: () => {
                nprogress.start()
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(About)
                        nprogress.done()
                    }, 2000)
                })
            }
        })
    },
]