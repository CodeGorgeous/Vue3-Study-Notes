<template>
    <div class="container">
        Hello
        <DemoFour />
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    import DemoFour from './components/DemoFour/index.vue'

    export default defineComponent({
        components: {
            DemoFour
        },
        setup () {
        }
    })
</script>

<style scoped>
.container {
    text-align: center;
}
</style>