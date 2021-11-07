# [Vue3](https://v3.cn.vuejs.org/)

## [Vite构建工具](https://cn.vitejs.dev/)

### 可以构建vue/react等项目

### 命令: pnpm create vite 快速搭建项目

## Vue3重大变化

- 创建Vue应用
    - Vue2
        - ```import Vue from 'vue' const app = new Vue();  app.$mount('#app')```
    - vue3
        - ```import { createApp } from 'vue' createApp(组件).mount(#app)```
- 组件内的this指向不同
    - vue2
        - 指向的是组件实例对象
    - vue3
        - 指向的是一个代理(Proxy(Es6版本后新增))
- 组件内使用setup()函数对功能进行更加清晰的划分
    -   ``` 
            export default defineComponent({
                setup() {
                    // setup函数在所有生命周期钩子前运行
                    // 内部this为undefined
                    // ref能够将数据变为响应式
                    let countRef = ref(0);
                    
                    const increase = () => {
                        countRef.value ++
                    }
                    // 减少
                    const decrease = () => {
                        countRef.value --
                    }

                    // 需要返回
                    return {
                        countRef,
                        increase,
                        decrease
                    }
                }
            })
        ```
- 生命周期
    - vue2的beforeDestroy和destroyed在vue3中变为beforeUnmount和unmounted
    - vue3新增生命周期renderTracked和renderTriggered
    - renderTracked
        - 收集依赖时会触发, 每有一个依赖被收集就会触发一次, 参数e是一个对象, 其内含有该次所收集的依赖数据
    - renderTriggered
        - 当依赖发生改变时会触发, 每个依赖改变就会触发一次, 参数e是一个对象, 其内含有该次所改变的依赖
    - **Vue2生命周期图示** ![vue2生命周期](https://cn.vuejs.org/images/lifecycle.png)
    - **Vue3生命周期图示** ![vue3生命周期](https://v3.cn.vuejs.org/images/lifecycle.svg)
- v-model
    - vue2中v-model和.sync都能够实现数据双向绑定, 其两者功能有重复点
    - vue3中只保留了v-model并对其进行了改变, 舍弃了.sync
        - v-model实现原理
            -   ```
                    // Parent.vue
                    <MyComponent v-model="value"/>
                    // 具体写法:
                    <MyComponent
                        :modelValue="value"
                        @update:modelValue="value = $event"
                    />
                    // 如果相对model的名字/事件名字进行改变
                    // 这样写的.trim需要在组件内props参数接受一个titleModifiers, 没有自定义名称时为modelModifiers是一个对象
                    <MyComponent v-model:title.trim="value"/>
                    <MyComponent
                        :title="value"
                        @update:title="value = $event"
                    />
                ```
        - 这样可以作为.sync的替代也可以允许我们在自定义组件上有多个v-model
        - v-model可以进行添加自定义修饰符
- 模板内可以有着多个根节点
- defineAsyncComponent
    - 用于处理异步组件
    -   ```
            // 自己非常简单抽离的一个处理异步的函数
            import { defineAsyncComponent } from 'vue'
            import Loading from '../components/DemoThree/Loading.vue'
            import Error from '../components/DemoThree/Error.vue'
            // callback必须返回一个promise
            export function asyncComponent(callback) {
                return defineAsyncComponent({
                    // 当加载完成
                    loader: callback,
                    // 加载中
                    loadingComponent: Loading,
                    errorComponent: Error
                })
            }
        ```
- Suspense组件
    - 和defineAsyncComponent有着类似的作用
    - 提供了两个插槽(default和fallback), default用于放置用于异步加载的组件, fallback用于处理加载异步组件时显示的加载组件
    -   ```
            <template>
                <suspense>
                    <template #default>
                    <todo-list />
                    </template>
                    <template #fallback>
                    <div>
                        Loading...
                    </div>
                    </template>
                </suspense>
            </template>
        ```
- reactivity api
    - 数据响应式api
    - ```import { reactive, readonly, ref, computed } from 'vue'```
    - reactive
        - 深度代理对象
        - 只能代理对象
        - ```const val = reactive({})```
    - readonly
        - 深度代理对象, 但该对象为只读
        - 只能代理对象
        - ```const val = readonly({})```
    - ref
        - 代理任何数据
        - 如果代理的为对象则ref会通过reactive进行代理, 如果是已经代理的数据则直接使用代理
        - ```const val = ref(0)```
        - {..., value: xxx}
    - computed
        - 根据函数内依赖的数据, 如果数据发生变化并重新运行该函数, 会得到一个响应式数据
        - ```const val = computed(() => a + b)```
        - {..., value: xxx}
    - watchEffect
        - 监控函数内依赖值发生变化, 则该函数会重新运行
        - ```watchEffect(() => {console.log(a, b)})```
        - 在这个例子中只有当a或者b的值发生变化时该函数才会重新运行
    - watch
        - 能够能加具体的监听某个值是否发生变化
        -   ```
                // 监听单个数据
                // 侦听一个 getter
                const state = reactive({ count: 0 })
                watch(() => state.count, (count, prevCount) => {
                        /* ... */
                    }
                )

                // 直接侦听一个 ref
                const count = ref(0)
                watch(count, (count, prevCount) => {
                    /* ... */
                })
                // 监听多个数据
                watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
                    /* ... */
                })
            ```
    - isProxy
        - 判断数据是否由reactive/readonly所创建的代理
    - isReactive
        - 判断数据是否由reactive所创建的代理
    - isReadonly
        - 判断数据是否由readonly所创建的代理
    - isRef
        - 判断数据是否由ref所创建的代理
    - unref
        - 当不清楚value是值还是本身是值时使用
        - 原理: ```isRef(val) ? val.value : val```
    - toRef
        - 得到某个响应式对象的ref格式
        -   ```
                const obj = reactive({ a: 1, b: 2 })
                const aRef = toRef(obj, 'a') // {..., value: 1}
            ```
    - toRefs
        - 将某个响应式对象全部转换为ref格式
        -   ```
                const obj = reactive({ a: 1, b: 2 })
                const objRefs = toRefs(obj) // {a: {..., value: 1}, b: {..., value: 2}}
            ```
- composition api


## setup(){}
- **composition api**
- 运行时间节点
    - 在beforeCreate前运行
- 在setup内使用生命周期
    - 从vue库中导出onBeforeMount/onMounted/onBeforeUpdate/onUpdated/onBeforeUnmount/onUnmounted/onErrorCaptured/onRenderTracked/onRenderTriggered/onActivated/onDeactivated
    - 因为setup就是围绕**beforeCreated**和**created**所展开的, 所以本来在**beforeCreated**和**created**内写的内容可以直接放在setup内
    - ```onUpdated(() => {console.log('想做的事情)})```
- 在setup中响应式追踪数据变化
    - 从vue库中导出watchEffect
    - ```watchEffect(() => console.log(count.value))```
- 在setup中使用props
    - setup中第一个形参就是props, **注意: 这个形参是不能进行Es6解构的, 会丢失其响应式**
    - ```setup (props) {console.log(props)}```
- 在setup中使用计算属性
    - 从vue库中导出**computed**函数
    -   ```
            const newVal = computed(() => {
                return countRef.value + countRef.value
            })
        ```
- 在setup中抛出事件
    - setup中第二个参数就是context对象, 该对象内还有emit属性, 用于抛出事件, 该对象内还由slots、attrs
    - ```setup (props, context) {console.log(context)}```

## Vite

- ### 与vue-cli的区别
    - vue-cli是使用webpack进行打包然后才能够进行查看页面, 每次依赖项发生变动时都需要重新打包一次
    - vite使用了另一种方式, 不在开始时进行打包, 只启动了一个服务器并把index.html发送, 并在需要哪些文件时, vite对其进行实时编译并发送给浏览器, 对其依赖的文件进行发送请求, 请求其依赖的文件实时编译后的资源, 不需要并不对其进行任何操作。 在改动一个模块后仅需要对其进行重新请求资源即可, 另外由于vite利用的是ESModule模块化, 因此在代码中不可以使用ComponentJs模块化

## Vue3对于效率的提升

- 静态提升
    - 静态节点提升
        - vue2打包模板页面时对于一些不会变化的节点仍对其每一次渲染都会运行一次```render () { createElement('div', null, 'Hello World') }```,
        在vue3中则对其进行了优化, ```const vNodeDiv = _createElementVNode('div', null, 'Hello World'); render () { vNodeDiv }```, 这样对于一些不会变动的节点的运行编译效率就会大大提升, 省去许多编译静态节点的时间
    - 静态属性提升
        - vue2中对于静态属性同静态节点一致
        - vue3中也对于静态属性进行了单独的抽离, 并不会每一次都运行, ```const vNodeDivAttr = { class: 'container', id: 'bar' } render () { _createElementBlock('div', vNodeDivAttr, 'Hello World') }```
- 预字符串化
    - 在连续且静态的节点达到10个(**数量可能会随着版本迭代所改动**)vue才会采用预字符串化进行编译, 在小于10个则直接使用的是静态节点提升
    - vue2版本是编译为一大堆的
    - vue3中遇到大量且连续的静态内容, 会将其编译为一个字符串
    -   ```
            // 连续且静态的节点达到10个
            <div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
            </div>

            // 预字符串化
            const _hoisted_1 = /*#__PURE__*/_createStaticVNode("<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>10</div>", 10)
            
            // 连续且静态的节点未达到10个
            const _hoisted_1 = /*#__PURE__*/_createElementVNode("div", null, "1", -1 /* HOISTED */)
            // 此处省略...
            const _hoisted_9 = /*#__PURE__*/_createElementVNode("div", null, "9", -1 /* HOISTED */)
            const _hoisted_10 = [_hoisted_1,_hoisted_2,_hoisted_3,_hoisted_4,_hoisted_5,_hoisted_6,_hoisted_7,_hoisted_8,_hoisted_9]
        ```
- 缓存事件处理函数
    - vue3对于自身不会变化的节点所携带的事件会对其进行缓存
    -   ```
            function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
                return (_openBlock(), _createElementBlock("div", null, [
                    _createElementVNode("button", {
                    // 缓存事件放入_cache数组中
                    onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.increase && _ctx.increase(...args)))}, "增加"),
                    _createElementVNode("h1", null, _toDisplayString(_ctx.countRef), 1 /* TEXT */),
                    _createElementVNode("button", {
                    onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.decrease && _ctx.decrease(...args)))}, "减少"),
                    _createCommentVNode(" <DemoOne /> ")
                ]))
            }
        ```
- 虚拟树对比
    - vue3编译时会对动态的内容进行标记, ```_createElementVNode("h1", null, _toDisplayString(_ctx.countRef), 1 /* TEXT */)```, 此处的**1**表示该节点是动态的节点(ps: 该数字所携带的意思并未清楚),  在更新对比虚拟树时跳过静态节点, 直接对比动态节点的更新变化, 这个动态节点称之为Block节点, 对比指的时找到block节点进行对比
- 单独节点对比
    - 根据Block节点的标记进行单独节点的对比, 例如``` _createElementVNode("h1", {class: _normalizeClass(_ctx.countRef)}, _toDisplayString(_ctx.countRef), 3 /* TEXT, CLASS */),```, 其中```/* TEXT, CLASS */```就会记录会动态的项

## 为什么在vue3中取消了vue构造函数

- 原因
    - 便于页面多个vue应用, vue2中使用插件, 插件就会影响到全部的vue应用, vue3中则可以进行分开处理
    - vue2集成过多的功能, 不利于tree shaking优化打包体积(按需加载)

## 数据响应式

- vue2
    - Object.defineProperty
    - 需要递归其对象所有的属性进行设置其响应式
- vue3
    - Proxy
    - 无需递归, 每次对数据的操作都必然会经过代理的get/set, 对于数据的访问是动态的
    - Proxy可以监控到成员的更改
    - Proxy的效率比Object.defineProperty更高
