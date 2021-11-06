<template>
    <div
        class="mantle-container"
        v-if="switch"
        @click="$emit('switchChange', false)"
    >
        {{ msg }}
    </div>
</template>

<script>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'

    export default defineComponent({
        components: {},
        props: {
            msg: {
                type: String,
                default: '',
            },
            switch: {
                type: Boolean,
                default: false
            }
        },
        setup (props, context) {
            
        }
    })
</script>

<style scoped>
.mantle-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 50px;
    font-weight: bold;
}
</style>