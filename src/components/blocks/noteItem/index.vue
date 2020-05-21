<template>
    <div class="block-note-item" :class="classes">
        <UiCheckbox class="block-note-item__checkbox" v-if="checkbox && info.value.length" v-model="info.isChecked"/>
        <UiInput class="block-note-item__input" v-model="info.value"/>
        <UiBtn
            size="small"
            theme="negative"
            confirm="Точно удалить?"
            confirm-position="left"
            @click="$emit('delete')"
            circle
            icon="trash"
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
            },
            checked: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                default: ''
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
                    'block-note-item--disabled': this.disabled,
                    'block-note-item--checked': this.info.isChecked
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
        },
        mounted() {
            this.info.isChecked = this.checked
            this.info.value = this.value
        }
    }
</script>

<style scoped lang="scss">
    .block-note-item {
        display: flex;
        align-items: center;
        background-color: $color--primary;
        border-radius: $gutter / 3;
        padding: $gutter / 3;
        transition-duration: 0.3s;
        &--checked {
            background-color: rgba($color--positive, 0.3);
            /deep/ .ui-input__inp {
                text-decoration: line-through;
            }
        }
        & > * {
            flex-shrink: 0;
        }
    }
</style>
