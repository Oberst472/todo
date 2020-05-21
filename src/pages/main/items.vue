<template>
    <ul class="section-items">
        <li :key="item.id" class="section-items__item" v-for="(item, index) in items">
            <div class="section-items__item-header">
                <span class="section-items__item-count">{{ index + 1 }}</span>
                <h2 class="section-items__item-title">{{ item.title }}</h2>
                <UiBtn class="section-items__item-btn" theme="info" size="small">Редактировать</UiBtn>
                <UiBtn class="section-items__item-btn" theme="negative" size="small" confirm="Вы уверены?" confirm-position="left">Удалить</UiBtn>
            </div>

            <ul class="section-items__item-short" v-if="item.items.length">
                <li class="section-items__item-short-item" v-if="item.items[0].title">{{ item.items[0].title }}</li>
                <li class="section-items__item-short-item" v-if="item.items[0].title">{{ item.items[1].title }}</li>
                <li class="section-items__item-short-item" v-if="item.items[0].title">{{ item.items[2].title }}</li>
            </ul>
            <span v-else>В этой заметке ничего нет :(</span>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            items: {
                type: Array,
                default: () => {
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .section-items {
        @include listReset;

        &__item {
            position: relative;
            padding: $gutter / 3;
            border-radius: $gutter / 3;
            background-color: $color--primary;
            overflow: hidden;
            @include md() {
                padding: $gutter / 2;
            }
            @include lg() {
                padding: $gutter;
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
                position: absolute;
                top: 0;
                left: 0;
                background-color: $color--base;
                width: 30px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-right: 2px;
                padding-bottom: 2px;
                line-height: 1;

                border-bottom-right-radius: $gutter / 2;
            }

            &-title {
                margin-right: auto;
            }

            &-btn {
                margin-left: $gutter / 2;
            }


            &-short {
                @include listReset;
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                &-item {
                }
            }

            & + & {
                margin-top: $gutter;
            }

            &:before {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 70%;
                background-image: linear-gradient(to top, $color--primary, transparent);
            }
        }
    }
</style>
