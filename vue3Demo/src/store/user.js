import router from '../route/index'

export default {
    namespaced: true,
    state: {
        userName: '',
        userPassword: '',
        isLogin: false
    },
    mutations: {
        setUser(state, payload) {
            state.userName = payload.userName
            state.userPassword = payload.userPassword
            state.isLogin = true
        },
        clearUser(state, payload) {
            state.userName = ''
            state.userPassword = ''
            state.isLogin = false
        }
    },
    actions: {
        signIn(store, payload) {
            store.commit('setUser', payload)
        },
        signOut(store, payload) {
            store.commit('clearUser')
            router.push({
                path: '/'
            })   
        }
    }
}