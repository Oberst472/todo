<template>
    <label class="ui-input">
        <input
            class="ui-input__inp"
            :placeholder="placeholder"
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
            },
            placeholder: {
                type: String,
                default: 'Введите название заметки'
            }
        }
    }
</script>

<style scoped lang="scss">
    .ui-input {
        flex-grow: 1;

        &__inp {
            box-sizing: border-box;
            display: block;
            width: 100%;
            height: 100%;
            padding: $gutter / 2;
            font-size: inherit;
            color: $color--text-light;
            border: 0;
            background-color: transparent;
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
