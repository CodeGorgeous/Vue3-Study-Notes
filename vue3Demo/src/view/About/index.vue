<template>
    <div class="container">
        Hello {{user.userName}}!
        <button v-if="user.isLogin" @click="signOut">登出</button>
    </div>
</template>

<script>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import { useStore } from 'vuex'

    export default defineComponent({
        name: 'About',
        components: {},
        props: {},
        setup (props, context) {
            const store = useStore()

            const signOut = () => {
                store.dispatch('user/signOut')
            }

            return {
                user: store.state.user,
                signOut
            }
        }
    })
</script>

<style scoped>
.container {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
}
</style>