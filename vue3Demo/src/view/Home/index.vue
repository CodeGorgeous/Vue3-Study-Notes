<template>
    <div>
        <label>用户名: <input type="text" v-model="userName"></label>
        <label>密码: <input type="password" v-model="userPassword"></label>
        <button @click="onLogin">登陆</button>
    </div>
</template>

<script>
    import { defineComponent, ref, toRefs } from 'vue'
    import { useStore } from 'vuex'

    export default defineComponent({
        components: {},
        setup (props, context) {
            const store = useStore()
            const user = ref({
                userName: '',
                userPassword: ''
            })

            const onLogin = () => {
                store.dispatch('user/signIn', {
                    userName: user.value.userName,
                    userPassword: user.value.userPassword
                })
            }

            return {
                ...toRefs(user.value),
                onLogin
            }
        }
    })
</script>

<style scoped>

</style>