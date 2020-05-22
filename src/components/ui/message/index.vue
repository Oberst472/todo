<template>
    <div class="ui-message">
        <div class="ui-message__items">
            <transition-group name="list">
                <div class="ui-message__item" :class="`ui-message__item--${item.status}`" v-for="(item, index) in items" :key="`item-${index}`">
                    {{ item.value }}
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {
                timeout: ''
            }
        },
        computed: {
            ...mapState('message', ['items'])
        },
        methods: {
            ...mapActions('message', ['deleteMessage'])
        },
        watch: {
            items(val) {
                if (val.length) {
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        this.deleteMessage()
                    }, 1500)
                } else {
                    clearTimeout(this.timeout)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .ui-message {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 50;
        width: 300px;
        height: 100vh;
        overflow: hidden;
        pointer-events: none;

        &__items {
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
            height: 100%;
        }

        &__item {
            box-sizing: border-box;
            display: inline-flex;
            justify-content: center;
            width: 100%;
            min-height: 10px;
            margin-top: $gutter / 3;
            padding: $gutter / 3;

            font-size: 12px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            text-align: center;
            @include md() {
                min-height: 80px;
                margin-top: $gutter / 2;
                padding: $gutter;
                font-size: 14px;
            }

            &--positive {
                background-color: $color--positive;
                color: $color--text-light
            }

            &--negative {
                background-color: $color--negative;
                color: $color--text-light
            }
        }

        .list-enter-active, .list-leave-active {
            transition: all 1s ease;
        }

        .list-enter, .list-leave-to {
            opacity: 0;
            transform: translateX(-150px);
        }
    }
</style>
