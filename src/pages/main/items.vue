<template>
    <ul class="section-items">
        <li class="section-items__item" v-for="(item, index) in 8" :key="index">
            <div class="section-items__item-header">
                <span class="section-items__item-count">{{ index }}</span>
                <h2 class="section-items__item-title">Заголовок пункта списка дел</h2>
                <button class="section-items__item-btn">Удалить</button>
                <button>Редактировать</button>
            </div>

            <ul class="section-items__item-short">
                <li class="section-items__item-short-item">Lorem ipsum dolor sit amet, consectetur.</li>
                <li class="section-items__item-short-item">Lorem ipsum dolor sit amet, consectetur.</li>
                <li class="section-items__item-short-item">Lorem ipsum dolor sit amet, consectetur.</li>
            </ul>
        </li>
    </ul>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss">
    @mixin listReset {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .section-items {
        @include listReset;

        &__item {
            outline: 1px solid red;
            @include md() {
                padding: $gutter / 2;
            }
            &-header {
                display: flex;
                @include md() {
                    flex-direction: row;
                    width: 100%;
                    align-items: center;
                }
            }
            &-count {
                margin-right: $gutter / 2;
            }
            &-title {
                margin-right: auto;
            }
            &-btn {}


            &-short {
                @include listReset;
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                &-item {
                }
            }
        }
    }
</style>
