<template>
    <span>
        <input
            type="checkbox"
            name="select"
            :checked="data.is"
            :value="data.id"
            @change="$emit('select', data.id)"
        >
        <input
            type="text"
            v-model.trim="data.value"
        >
    </span>
</template>

<script>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'

    export default defineComponent({
        props: {
            data: {
                type: Object,
                required: true
            }
        }
    })
</script>

<style scoped>

</style>