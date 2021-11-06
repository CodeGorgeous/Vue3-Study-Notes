<template>
    <div class="container">
        组件发生错误
    </div>
</template>

<script>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'

    export default defineComponent({
        components: {},
        props: {},
        setup (props, context) {
            
        }
    })
</script>

<style scoped>
.container {
    font-size: 20px;
    color: red;
}
</style>