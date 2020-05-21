<template>
    <div class="page-todo-item">
        <div class="wrap">
            <div class="page-todo-item__content">
                <div class="page-todo-item__title">
                    <UiInput class="page-todo-item__title-inp"/>
                </div>
                <transition-group name="list" tag="ul" class="page-todo-item__list" v-if="items.length">
                    <li class="page-todo-item__list-item" v-for="(item, index) in items" :key="`item-${item.value}`">
                        <BlockNoteItem checkbox @input="addInfo({index, info: $event})" @delete="delItem(index)"/>
                    </li>
                </transition-group>
                <UiBtn size="medium" theme="info" @click="addItem">Добавить пункт</UiBtn>
            </div>
        </div>
    </div>
</template>

<script>
    import BlockNoteItem from '@/components/blocks/noteItem';
    export default {
        components: {
            BlockNoteItem
        },
        data() {
            return {
                title: '',
                items: []
            }
        },
        methods: {
            addItem() {
                const newItem = {
                    isChecked: false,
                    value: ''
                }
                this.items.push(newItem)
            },
            addInfo(val) {
                this.items.splice(val.index, 1, val.info)
            },
            delItem(index) {
                this.items.splice(index, 1)
            }
        }
    }
</script>

<style scoped lang="scss">
.page-todo-item {
    &__title {
        padding: $gutter * 2 0;
        display: flex;
        justify-content: center;
        &-inp {
            border-bottom: 1px solid rgba($color--text-light, 0.1);
            font-size: 20px;
            text-align: center;
        }
    }
    &__list {
        @include listReset;
        &-item {
            text-align: left;
            font-size: 14px;
            border-radius: $gutter / 3;
            background-color: $color--primary;
            padding: $gutter / 3;
            margin-bottom: $gutter / 2;
        }
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
    }
}
</style>
