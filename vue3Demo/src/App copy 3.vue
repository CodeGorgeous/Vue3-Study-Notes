<template>
    <div class="container">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
    </div>
    <div>
        <router-view />
    </div>
</template>

<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        components: {
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