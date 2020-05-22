<template>
    <div class="page-todo-item page" :class="{'page-todo-item--disabled': pageDisabled && $route.name === 'edit'}">
        <header class="page__header">
            <SectionHeader>
                <template v-if="$route.name === 'create'">
                    <UiBtn class="section-header__btn" theme="positive" size="medium" @click="saveTodo" :loading="saveLoading" :disabled="!title.length">Сохранить</UiBtn>
                </template>

                <!--                <template class="section-header__options" v-if="$route.name === 'edit'">-->
                <!--                    <UiBtn class="section-header__btn" theme="negative" size="medium" @click="removeTodo" :loading="removeLoading">Удалить заметку</UiBtn>-->
                <!--                    <UiBtn class="section-header__btn" theme="positive" size="medium" @click="togglePageDisabled(false)" :loading="editLoading" v-if="pageDisabled">Отредактировать</UiBtn>-->
                <!--                    <div class="section-header__options-btns" v-else>-->
                <!--                        <UiBtn class="section-header__btn" theme="positive" size="medium" @click="stGetTodoById($route.params.id)" :loading="editLoading" :disabled="!title.length">Удалить изменения</UiBtn>-->
                <!--                        <UiBtn class="section-header__btn" theme="positive" size="medium" @click="editTodo" :loading="editLoading" :disabled="!title.length">Сохранить</UiBtn>-->
                <!--                    </div>-->
                <!--                </template>-->
            </SectionHeader>
        </header>
        <main class="page__body">
            <div class="wrap">
                <div class="page-todo-item__content">
                    <div class="page-todo-item__title">
                        <UiInput class="page-todo-item__title-inp" v-model="title"/>
                    </div>
                    <transition-group appear name="list-complete" tag="ul" class="page-todo-item__list" v-if="items.length">
                        <li class="page-todo-item__list-item" v-for="(item, index) in items" :key="item.id">
                            <BlockNoteItem
                                checkbox
                                @input="stAddInfoToNote({index, info: $event})"
                                @delete="stRemoveNote(index)"
                                :value="item.value"
                                :checked="item.isChecked"
                            />
                        </li>
                    </transition-group>
                    <div v-else>Заметок нет :(</div>
                    <UiBtn class="page-todo-item__add-btn" @click="stCreateEmptyNote" circle theme="positive" icon="plus">
                        Добавить
                    </UiBtn>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import SectionHeader from '@/components/sections/header'
    import BlockNoteItem from '@/components/blocks/noteItem';

    export default {
        components: {
            SectionHeader,
            BlockNoteItem
        },
        data() {
            return {
                title: ''
            }
        },
        computed: {
            ...mapState('todo', ['items', 'pageDisabled', 'saveLoading'])
        },
        methods: {
            ...mapActions('todo', ['stRemoveNote', 'stAddInfoToNote', 'stAddTitle', 'stGetTodoById', 'stCreateEmptyNote', 'togglePageDisabled', 'save']),
            ...mapActions('message', ['message']),
            async saveTodo() {
                const data = await this.save()
                if (data) {

                    this.message(['positive', 'Новый Todo добавлен'])
                    this.$router.push({name: 'main'})
                }
                else {
                    this.message(['negative', 'Ошибка, попробуйте еще раз'])
                }
            }
        },
        watch: {
            title(val) {
                this.stAddTitle(val)
            }
        },
        async mounted() {
            this.togglePageDisabled(true)
            const id = this.$route.params.id
            if (id) {
                const response = await this.stGetTodoById(id)
                this.title = response.title
            }
        }
    }
</script>

<style scoped lang="scss">
    .page-todo-item {
        position: relative;
        &--disabled {
            &:before {
                content: '';
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba($color--base, 0.6);
                z-index: 9;
            }
        }
        &__title {
            padding: $gutter 0 $gutter * 2 0;
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
            position: relative;

            &-item {
                text-align: left;
                font-size: 16px;
                margin-bottom: $gutter / 2;
                display: block;
                width: 100%;
                box-sizing: border-box;
                transition-duration: 1s;
            }
        }

        &__add-btn {
            position: fixed !important;
            right: $gutter;
            bottom: $gutter
        }

        .list-complete-enter, .list-complete-leave-to
            /* .list-complete-leave-active до версии 2.1.8 */
        {
            opacity: 0;
            transform: translateY(30px);
            transition-duration: 0.3s;

            /deep/ .ui-btn__confirm {
                opacity: 0;
            }
        }

        .list-complete-leave-active {
            position: absolute;
        }
    }
</style>
