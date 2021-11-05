<template>
    <div>
        <p>
            <span>编辑</span>
            <span v-for="item in data" :key="item.id">
                <input
                    type="checkbox"
                    name="select"
                    :value="item.id"
                    @change="dataSelectChange"
                >
                <input
                    type="text"
                    v-model="item.value"
                >
            </span>
        </p>
        <p>
            <span>已选择</span>
            <span v-for="item in data" :key="item.id">{{item.is ? item.value + ',' : ''}}</span>
        </p>
    </div>
</template>

<script>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'

    export default defineComponent({
        components: {},
        setup () {
            const data = reactive([{
                id: 1,
                is: false,
                value: 'iphone',
            }, {
                id: 2,
                is: false,
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
                    if (e.target._value === iterator.id) {
                        iterator.is = !iterator.is
                    }
                }
            }

            return {
                data,
                dataSelectChange
            }
        }
    })
</script>

<style scoped>

</style>