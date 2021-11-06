import { defineAsyncComponent } from 'vue'
import Loading from '../components/DemoThree/Loading.vue'
import Error from '../components/DemoThree/Error.vue'

export function asyncComponent(callback) {
    return defineAsyncComponent({
        // 当加载完成
        loader: callback,
        // 加载中
        loadingComponent: Loading,
        errorComponent: Error
    })
}