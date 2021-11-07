<template>
    <div class="img-container">
        <Bar1 :data="gdp" class="bar1-container"/>
    </div>
    <div class="input-container">
        <InputBlock v-for="item in gdp" :data="item" :key="item.id"/>
    </div>
</template>

<script>
    import { defineComponent, reactive, toRefs, ref, watchEffect, watch } from 'vue'
    import InputBlock from './InputBlock.vue'
    import Bar1 from './Bar1.vue'
    import Bar2 from './Bar2.vue'

    export default defineComponent({
        components: {
            InputBlock,
            Bar1,
            Bar2
        },
        props: {},
        setup (props, context) {
            const gdp = ref([])
            const fetchData = async () => {
                gdp.value = await fetch('http://localhost:2550/api/gdp')
                                    .then(resp => resp.json())
                                    .then(resp => resp.data)
            }

            fetchData()
            return {
                gdp
            }
        }
    })
</script>

<style scoped>
.img-container {
}

.bar1-container {
    display: inline-block;
    padding: 20px 40px;
    margin: 20px 0;
    border: 1px solid black;
}

.input-container {
    border: 1px solid black;
    display: inline-block;
    padding: 10px;
    border-radius: 20px;
}

</style>