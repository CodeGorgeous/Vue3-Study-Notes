<template>
    <div class="container">
        <router-link :to="{
            name: 'Home'
        }">
            Home
        </router-link>
        <router-link :to="{
            name: 'About'
        }">
            About
        </router-link>
    </div>
    <div>
        <router-view></router-view>
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