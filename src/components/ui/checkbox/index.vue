<template>
    <label class="ui-checkbox" :class="{'ui-checkbox--checked': checked}">
        <input class="ui-checkbox__inp" :checked="checked" @change="$emit('change', $event.target.checked)" type="checkbox">
        <span class="ui-checkbox__mark"></span>
    </label>
</template>

<script>
    export default {
        model: {
            prop: 'checked',
            event: 'change'
        },
        props: {
            checked: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ui-checkbox {
        position: relative;

        width: 20px;
        height: 20px;
        border-radius: 3px;
        background-color: #fff;
        &__inp {
            display: none;

            &:checked {
                & + .ui-checkbox__mark {
                    opacity: 1;
                }
            }
        }
        @include lg() {
            cursor: pointer;
        }

        &__mark {
            content: '';
            position: absolute;
            top: -1px;
            left: 5px;
            width: 7px;
            height: 12px;
            opacity: 0;
            border: 2px solid $color--positive;
            border-top-color: transparent;
            border-left-color: transparent;
            transition-duration: 0.3s;
            transform: rotate(45deg);
        }
    }
</style>
