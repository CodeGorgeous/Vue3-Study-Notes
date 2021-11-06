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
        </div>
        <div class="item-box">
            区域4
        </div>
        <div class="item-box">
            区域5
        </div>
        <div class="item-box">
            区域6
        </div>
        <DemoThree />
    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    import DemoThree from '../../components/DemoThree/index.vue'
    import Mantle from '../../components/DemoThree/Mantle.vue'

    export default defineComponent({
        components: {
            DemoThree,
            Mantle
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
}
</style>