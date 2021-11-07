import { reactive, readonly, ref, computed, watch, toRef, toRefs } from 'vue'

window.state = reactive({
    a: 1,
    b: 2,
    c: {
        a: 1,
        b: 2
    }
})

window.state1 = readonly({
    a: 1,
    b: 2,
    c: {
        a: 1,
        b: 2
    }
})

window.state2 = ref(state)
console.log(state === state2.value) // true

window.state3 = ref(0)

window.state4 = computed(() => {
    console.log('重新执行')
    return state3.value + state.b
})

console.log(window.state4.value)

window.state5 = readonly(state2)

window.state6 = readonly(state)

function useUser() {

    const userOrigin = reactive({})

    const user = readonly(userOrigin)

    const setUserName = (name) => {
        userOrigin['userName'] = name
    }

    const setUserAge = (age) => {
        userOrigin['userAge'] = age
    }

    return {
        user,
        setUserName,
        setUserAge
    }
}

window.useUser = useUser

//

function useDebounce(obj, timer = 0) {
    const valueOrigin = reactive(obj)
    const value = readonly(valueOrigin)
    let time
    const setValue = (valObj) => {
        clearTimeout(time)
        time = setTimeout(() => {
            Object.assign(valueOrigin, valObj)
        }, timer)
    }

    return {
        value,
        setValue
    }
}

window.useDebounce = useDebounce

watch(state, (newVal, oldVal) => {
    console.log('state发生改变')
})

const obj = reactive({ a: 1, b: 2 })
window.aRef = toRef(obj, 'a') // {..., value: 1}

window.objRefs = toRefs(obj) // {a: {..., value: 1}, b: {..., value: 2}}