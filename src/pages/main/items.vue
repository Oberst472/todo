<template>
    <ul class="section-items" v-if="items.length">
        <li :key="item.id" class="section-items__item" v-for="(item, index) in items">
            <div class="section-items__item-header">
                <span class="section-items__item-count">{{ index + 1 }}</span>
                <h2 class="section-items__item-title">{{ item.title }}</h2>
                <UiBtn :to="{name: 'edit', params: {id: item.id, info: item}}" circle class="section-items__item-btn" icon="edit" size="small" theme="info" title="Редактировать">
                    Редактировать
                </UiBtn>
                <UiBtn @click="$emit('removeTodo', item.id)" circle class="section-items__item-btn" confirm="Вы уверены?" confirm-position="left" icon="trash" size="small" theme="negative" title="Удалить">
                    Удалить
                </UiBtn>
            </div>

            <ul class="section-items__item-short" v-if="item.items.length">
                <li class="section-items__item-short-item" v-for="(item, index) in item.items" :key="index">
                    <UiCheckbox class="section-items__item-short-checkbox" v-model="item.isChecked"/>
                    <span>{{ item.value || 'Пустая заметка' }}</span>
                </li>
            </ul>
            <div class="section-items__item-text" v-else>В этой заметке ничего нет :(</div>
        </li>
    </ul>
    <div v-else>Нет списков =(</div>
</template>

<script>
    export default {
        components: {},
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
            min-height: 130px;
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
                @include adaptiveFont(14px, 18px)
                margin-right: auto;
                padding-left: $gutter;
                text-align: left;
            }

            &-btn {
                flex-shrink: 0;
                margin-left: $gutter / 2;
            }


            &-short {
                @include listReset;
                display: flex;
                align-items: flex-start;
                flex-direction: column;

                &-item {
                    @include adaptiveFont(12px, 14px);
                    display: flex;
                    align-items: flex-end;
                    margin-bottom: $gutter / 6;
                    line-height: 1;

                    &:nth-of-type(n + 4) {
                        display: none;
                    }
                }

                &-checkbox {
                    margin-right: 10px;
                }
            }

            &-text {
                text-align: left;
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
                z-index: 2;
                background-image: linear-gradient(to top, $color--primary, transparent);
            }
        }
    }

    .list-complete-enter, .list-complete-leave-to
    {
        opacity: 0;
        transition-duration: 10s;
        transform: translateY(30px);
        /deep/ .ui-btn__confirm {
            opacity: 0;
        }
    }

    .list-complete-leave-active {
        position: absolute;
    }
</style>
