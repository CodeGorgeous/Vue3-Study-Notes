# [Vue3](https://v3.cn.vuejs.org/)

## [Vite构建工具](https://cn.vitejs.dev/)

### 可以构建vue/react等项目

### 命令: pnpm create vite 快速搭建项目

## Vue3重大变化

- 创建Vue应用
    - Vue2
        - ```import Vue from 'vue' const app = new Vue();  app.$mount('#app')```
    - vue3
        - ```import { createApp } from 'vue' createApp(组件).mount(#app)```
- 组件内的this指向不同
    - vue2
        - 指向的是组件实例对象
    - vue3
        - 指向的是一个代理(Proxy(Es6版本后新增))
- 组件内使用setup()函数对功能进行更加清晰的划分
    -   ``` 
            export default defineComponent({
                setup() {
                    // setup函数在所有生命周期钩子前运行
                    // 内部this为undefined
                    // ref能够将数据变为响应式
                    let countRef = ref(0);
                    
                    const increase = () => {
                        countRef.value ++
                    }
                    // 减少
                    const decrease = () => {
                        countRef.value --
                    }

                    // 需要返回
                    return {
                        countRef,
                        increase,
                        decrease
                    }
                }
            })
        ```
- 生命周期
    - vue2的beforeDestroy和destroyed在vue3中变为beforeUnmount和unmounted
    - **Vue2生命周期图示** ![vue2生命周期](https://cn.vuejs.org/images/lifecycle.png)
    - **Vue3生命周期图示** ![vue3生命周期](https://v3.cn.vuejs.org/images/lifecycle.svg)

## setup(){}详解

- 运行时间节点
    - 在beforeCreate前运行
- 在setup内使用生命周期
    - 从vue库中导出onBeforeMount/onMounted/onBeforeUpdate/onUpdated/onBeforeUnmount/onUnmounted/onErrorCaptured/onRenderTracked/onRenderTriggered/onActivated/onDeactivated
    - 因为setup就是围绕**beforeCreated**和**created**所展开的, 所以本来在**beforeCreated**和**created**内写的内容可以直接放在setup内
    - ```onUpdated(() => {console.log('想做的事情)})```
- 在setup中响应式追踪数据变化
    - 从vue库中导出watchEffect
    - ```watchEffect(() => console.log(count.value))```
- 在setup中使用props
    - setup中第一个形参就是props, **注意: 这个形参是不能进行Es6解构的, 会丢失其响应式**
    - ```setup (props) {console.log(props)}```
- 在setup中使用计算属性
    - 从vue库中导出**computed**函数
    -   ```
            const newVal = computed(() => {
                return countRef.value + countRef.value
            })
        ```
