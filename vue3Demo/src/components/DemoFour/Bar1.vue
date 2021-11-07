<template>
    <div>
        <div v-for="item in data" :key="item.id" class="container">
            <span class="name">{{item.gdpName}}</span>
            <span
                class="span"
                :style="{
                    width: item.gdpValue * 10 + 'px',
                    background: `rgb(${getRandom()}, ${getRandom()}, ${getRandom()})`
                }"
            ></span>
            <span>{{item.gdpValue}}万亿</span>
        </div>
    </div>
</template>

<script>
    import { defineComponent, reactive, toRefs, ref, watchEffect, watch } from 'vue'

    export default defineComponent({
        components: {},
        props: {
            data: {
                type: Array,
                required: true
            }
        },
        setup (props, context) {
            
            const getRandom = () => {
                return Math.floor(Math.random() * 255)
            }

            return {
                getRandom
            }
        }
    })
</script>

<style scoped>
.container {
    height: 20px;
    text-align: left;
    margin: 5px 0;
}

.name {
    padding-right: 10px;
    margin-right: 10px;
}

.span {
    border-left: 2px solid black;
    display: inline-block;
    height: 20px;
    transition: all 1s;
}

</style>