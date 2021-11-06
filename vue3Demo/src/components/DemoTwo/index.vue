<template>
    <div>
        <p>
            <span>编辑</span>
            <ComponentDemo v-for="item in data" :key="item.id" :data="item" @select="dataSelectChange" />
        </p>
        <p>
            <span>已选择： </span>
            <span v-for="item in selectData" :key="item.id">{{item.value}},</span>
        </p>
    </div>
    <div v-if="false">1</div>
    <div v-else-if="2">2</div>
</template>

<script>
    import { defineComponent, reactive, computed } from 'vue'
    import ComponentDemo from '../ComponentDemo/index.vue'

    export default defineComponent({
        components: {
            ComponentDemo
        },
        setup () {
            const data = reactive([{
                id: 1,
                is: false,
                value: 'iphone',
            }, {
                id: 2,
                is: true,
                value: '华为',
            }, {
                id: 3,
                is: false,
                value: '小米',
            }, {
                id: 4,
                is: false,
                value: 'oppo',
            }])

            const dataSelectChange = (e) => {
                for (const iterator of data) {
                    if (e === iterator.id) {
                        iterator.is = !iterator.is
                    }
                }
            }

            const selectData = computed(() => {
                return data.filter(item => item.is)
            })

            return {
                data,
                selectData,
                dataSelectChange
            }
        }
    })
</script>

<style scoped>

</style>