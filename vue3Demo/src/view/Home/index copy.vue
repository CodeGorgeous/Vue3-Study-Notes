<template>
    <div>
        <div class="item-box">
            区域1
            <Mantle msg="这是一个朦层" :switch="switch" @switchChange="switchChange"/>
            <button
                @click="changeMantle"
            >打开朦层</button>
        </div>
        <div class="item-box">
            区域2</div>
        <div class="item-box">
            区域3
            <Block3 />
        </div>
        <div class="item-box">
            区域4
        </div>
        <div class="item-box">
            区域5
            <Block5 />
        </div>
        <div class="item-box">
            区域6
        </div>
        <DemoThree />
    </div>
</template>

<script>
    import { defineComponent, ref, defineAsyncComponent } from 'vue'
    import DemoThree from '../../components/DemoThree/index.vue'
    import Mantle from '../../components/DemoThree/Mantle.vue'
    import { asyncComponent } from '../../utils/tools'

    // 异步组件处理
    // const Block3 = defineAsyncComponent({
    //     // 当加载完成
    //     loader: () => {
    //         return new Promise((resolve, reject) => {
    //             setTimeout(() => {
    //                 if (Math.random() > 0.5) return resolve(import("../../components/DemoThree/Block3.vue"))
    //                 return reject('组件加载失败')
    //             }, 3000)
    //         })
    //     },
    //     // 加载中
    //     loadingComponent: Loading,
    //     errorComponent: Error
    // })

    const Block3 = asyncComponent(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.5) return resolve(import("../../components/DemoThree/Block3.vue"))
                return reject('组件加载失败')
            }, 3000)
        })
    })

    const Block5 = asyncComponent(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.5) return resolve(import("../../components/DemoThree/Block5.vue"))
                return reject('组件加载失败')
            }, 4000)
        })
    })

    export default defineComponent({
        components: {
            DemoThree,
            Mantle,
            Block3,
            Block5
        },
        setup () {

            let switchLock = ref(false)

            const changeMantle = () => {
                switchLock.value = true
            }

            const switchChange = (val) => {
                switchLock.value = val
            }

            return {
                switch: switchLock,
                changeMantle,
                switchChange
            }
        }
    })
</script>

<style scoped>
.item-box {
    display: inline-block;
    margin: 20px;
    width: 300px;
    height: 300px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid black;
    overflow: hidden;
}
</style>