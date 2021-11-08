import { createStore, createLogger } from 'vuex'
import user from './user' 

export default createStore({
    modules: {
        user,
    },
    plugins: [createLogger()]
})

