<template>
    <section class="section-header" :class="`section-header-${$route.name}`">
        <div class="wrap">
            <div class="section-header__content">
                <UiBtn @click="$router.push({name: 'main'})" circle size="small" theme="accent" icon="home" v-if="$route.name !== 'main'" title="На главную">
                    Назад
                </UiBtn>
                <h1 class="section-header__title">{{ $route.meta.title }}</h1>
                <div class="section-header__options">
                    <slot/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .section-header {
        background-color: darken($color--primary, 5%);

        &__title {
            @include adaptiveFont(15px, 20px);
            margin: 0 0 0 $gutter / 2;
        }

        &__content {
            padding: $gutter / 2 0;
            display: flex;
            align-items: center;
            @include md() {
                padding: $gutter / 2 0;
                justify-content: space-between;
            }
        }

        &__options {
            margin-left: auto;
            display: flex;

            & > * {
                @include md() {
                    margin-left: $gutter / 2;
                }
            }
        }

        &-edit {
            .section-header__content {
                flex-wrap: wrap;
                justify-content: space-between;
            }

            .section-header__options {
                width: 100%;
                display: flex;
                justify-content: space-between;
                margin-top: $gutter / 3;
                @include md() {
                    width: auto;
                    margin-top: 0;
                }
            }

            .section-header__btn {
                font-size: 10px;
                @include sm() {
                    font-size: 12px;
                }
                @include md() {
                    margin: 0 0 0 $gutter / 3;
                }
            }
        }
    }
</style>
