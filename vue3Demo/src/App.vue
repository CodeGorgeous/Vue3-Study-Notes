<template>
    <div>
        <button @click="increase">增加</button>
        <h1>{{countRef}}</h1>
        <button @click="decrease">减少</button>
        <DemoOne />
    </div>
</template>

<script>
    import {defineComponent, ref, watchEffect, computed, onMounted, onUpdated, onBeforeUpdate } from 'vue'
    import DemoOne from './components/DemoOne/index.vue'

    export default defineComponent({
        components: {
            DemoOne
        },
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

            // watchEffect监控副作用
            watchEffect(async () => {
                // 受到限制, 必须里面使用到响应式的数据才会运行该函数
                console.log('执行:' + countRef.value)
                const result = await fetch('http://localhost:2550/api/user?uid=27f723').then(resp => {
                    return resp.json()
                })
                console.log(result)
            })

            const newVal = computed(() => {
                return countRef.value + countRef.value
            })

            // 组件挂载完成的生命周期
            // 组件挂载
            onMounted(() => {
                console.log('组件挂载完毕')
            })
            // 组件数据即将变化
            onBeforeUpdate(() => {
                console.log('组件数据即将变化')
            })
            // 组件数据更新
            onUpdated(() => {
                console.log('组件数据发生变化', newVal.value)
            })
            // 
            // 需要返回
            return {
                countRef,
                increase,
                decrease
            }
        }
    })
</script>

<style scoped>

</style>