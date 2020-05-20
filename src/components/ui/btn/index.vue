<!--suppress SassScssResolvedByNameOnly -->
<template>
    <component
        :class="classes"
        :href="href"
        :is="tag"
        :target="href ? '_blank' : ''"
        :to="to"
        @click="$emit('click')"
        class="ui-btn"
    >
        <span class="ui-btn__loading" v-if="loading"></span>
        <span class="ui-btn__value" v-else><slot/></span>
    </component>
</template>

<script>
    export default {
        props: {
            theme: {
                type: String,
                default: 'primary'
            },
            size: {
                type: String,
                default: 'default'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            href: {
                type: String,
                default: ''
            },
            to: {
                type: Object,
                default: null
            }
        },
        computed: {
            classes() {
                return {
                    'ui-btn--disabled': this.disabled,
                    'ui-btn--loading': this.loading,
                    [`ui-btn--size-${this.size}`]: true,
                    [`ui-btn--theme-${this.theme}`]: true
                }
            },
            tag() {
                if (this.href) {
                    return 'a'
                } else if (this.to) {
                    return 'router-link'
                } else {
                    return 'button'
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .ui-btn {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        font-size: inherit;
        border: 0;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        user-select: none;
        transition: background-color 0.3s ease;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;

        &:active {
            opacity: 0.8;
        }

        &--theme {
            &-primary {
                color: $color--text-light;
                background-color: $color--primary;

                &:hover {
                    background-color: darken($color--primary, 10%);
                }
            }

            &-info {
                color: $color--text-light;
                background-color: $color--info;

                &:hover {
                    background-color: darken($color--info, 10%);
                }
            }

            &-positive {
                color: $color--text-light;
                background-color: $color--positive;

                &:hover {
                    background-color: darken($color--positive, 10%);
                }
            }

            &-negative {
                color: $color--text-light;
                background-color: $color--negative;

                &:hover {
                    background-color: darken($color--negative, 10%);
                }
            }
        }

        &--size {
            &-default {
                width: 100%;
                min-width: 100px;
                height: 50px;
                font-size: 14px;
                padding: $gutter / 2;

                .ui-btn__loading {
                    width: 20px;
                    height: 20px;
                    border-width: 3px;

                    &:before {
                        width: 4px;
                        height: 4px;
                        border: 3px solid currentColor;
                    }
                }
            }

            &-medium {
                width: auto;
                min-width: 100px;
                min-height: 40px;
                font-size: 14px;
                padding: 5px $gutter;

                .ui-btn__loading {
                    width: 20px;
                    height: 20px;
                    border-width: 2px;

                    &:before {
                        width: 4px;
                        height: 4px;
                        border: 2px solid currentColor;
                    }
                }
            }

            &-small {
                width: auto;
                min-width: 80px;
                min-height: 35px;
                font-size: 12px;
                padding: 5px $gutter / 3;

                .ui-btn__loading {
                    width: 12px;
                    height: 12px;
                    border-width: 2px;

                    &:before {
                        width: 2px;
                        height: 2px;
                        border: 2px solid currentColor;
                    }
                }
            }

            &-mini {
            }
        }

        &--disabled {
            opacity: 0.5;
            pointer-events: none;
        }

        &--loading {
            font-size: 0;
            opacity: 0.7;
            pointer-events: none;
        }

        &__value {
            pointer-events: none;
        }

        &__loading {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid transparent;
            border-top-color: currentColor;
            border-bottom-color: currentColor;
            border-radius: 50%;
            animation: spin 1.5s linear infinite;
            pointer-events: none;

            &:before {
                content: '';
                display: block;
                border-radius: 50%;
                animation: pulse 1s alternate ease-in-out infinite;
            }
        }

    }


    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes pulse {
        from {
            transform: scale(0.5);
        }
        to {
            transform: scale(1);
        }
    }

</style>
