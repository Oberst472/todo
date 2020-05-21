<template>
    <div class="ui-todo-item" :class="classes">
        <UiCheckbox v-if="checkbox && info.value.length" v-model="info.isChecked"/>
        <UiInput v-model="info.value"/>
        <UiBtn
            size="small"
            theme="negative"
            confirm="Точно удалить?"
            confirm-position="left"
            @click="$emit('delete')"
        >
            Удалить
        </UiBtn>
    </div>
</template>

<script>
    export default {
        props: {
            size: {
                type: String,
                default: 'default'
            },
            checkbox: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                info: {
                    isChecked: false,
                    value: ''
                }
            }
        },
        computed: {
            classes() {
                return {
                    'ui-todo-item--disabled': this.disabled,
                    [`ui-todo-item--size-${this.size}`]: true
                }
            }
        },
        watch: {
            info: {
                handler(val) {
                    this.$emit('input', val)
                },
                deep: true
            }
        }
    }
</script>

<style scoped lang="scss">
    .ui-todo-item {
        display: flex;
        align-items: center;
        & > * {
            flex-shrink: 0;
        }
    }
</style>
