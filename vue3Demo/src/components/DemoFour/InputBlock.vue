<template>
    <span class="container">
        <span>{{data.gdpName}}: </span>
        <input class="input" type="number" step="0.001" min="0" v-model="data.gdpValue">
    </span>
</template>

<script>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'

    export default defineComponent({
        components: {},
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        setup (props, context) {
            
            return {
                
            }
        }
    })
</script>

<style scoped>
.container {
    margin: 0 5px;
}

.input {
    width: 70px;
}
</style>