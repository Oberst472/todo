<template>
    <label class="ui-input">
        <input
            class="ui-input__inp"
            placeholder="Введите название заметки"
            type="text" :value="value"
            @input="$emit('input', $event.target.value)">
    </label>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped lang="scss">
    .ui-input {
        flex-grow: 1;

        &__inp {
            width: 100%;
            height: 100%;
            display: block;
            box-sizing: border-box;
            background-color: transparent;
            border: 0;
            padding: $gutter / 2;
            color: $color--text-light;
            font-size: inherit;
            text-align: inherit;
            ::placeholder {
                color: $color--text-light !important;
            }
            &:focus {
                &::placeholder {
                    color: transparent;
                }
            }

        }
    }

</style>
