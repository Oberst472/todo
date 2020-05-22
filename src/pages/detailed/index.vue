<template>
    <div :class="[{'page-todo-item--disabled': pageDisabled && $route.name === 'edit'}]" class="page-todo-item page">
        <header class="page__header">
            <SectionHeader>
                <template v-if="$route.name === 'create'">
                    <UiBtn :disabled="!info.title.length" :loading="saveLoading" @click="saveTodo('create')" class="section-header__btn" size="medium" theme="positive">
                        Сохранить
                    </UiBtn>
                </template>

                <template v-if="$route.name === 'edit'">
                    <UiBtn :confirm-position="isDesktop ? 'bottom' : 'right'" :loading="removeLoading" @click="removeTodo" class="section-header__btn" confirm="Удалить список?" size="medium" theme="negative">
                        Удалить
                    </UiBtn>
                    <UiBtn :loading="editLoading" @click="togglePageDisabled(false)" class="section-header__btn" size="medium" theme="positive" v-if="pageDisabled">
                        Редактировать
                    </UiBtn>
                    <UiBtn :disabled="!info.title.length" @click="getTodoById" class="section-header__btn" confirm="Удалить внесенные изменения?" confirm-position="bottom" size="medium" theme="positive" v-if="!pageDisabled">
                        Отменить
                    </UiBtn>
                    <UiBtn :disabled="!info.title.length" :loading="editLoading" @click="saveTodo('edit')" class="section-header__btn" size="medium" theme="positive" v-if="!pageDisabled">
                        Сохранить
                    </UiBtn>
                </template>
            </SectionHeader>
        </header>
        <main class="page__body">
            <div class="wrap">
                <div class="page-todo-item__content">
                    <div class="page-todo-item__title">
                        <UiInput class="page-todo-item__title-inp" placeholder="Введите название списка" v-model="info.title"/>
                    </div>
                    <transition-group appear name="list-complete" tag="ul" class="page-todo-item__list" v-if="info.items.length">
                        <li class="page-todo-item__list-item" v-for="(item, index) in info.items" :key="item.id">
                            <BlockNoteItem
                                checkbox
                                @input="addInfoToNote({index, info: $event})"
                                @delete="removeNote(index)"
                                :value="item.value"
                                :checked="item.isChecked"
                            />
                        </li>
                    </transition-group>
                    <div class="page-todo-item__mock-text" v-else>Нет заметок :(</div>
                    <UiBtn class="page-todo-item__add-btn" @click="createEmptyNote" circle theme="positive" icon="plus">
                        Добавить
                    </UiBtn>
                </div>
            </div>
        </main>
        <UiLoading v-if="isLoading && $route.name === 'edit'"/>
    </div>
</template>

<script>
    import {randomString} from '@/utils/randomString'
    import {media} from '@/utils/media'
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
                isLoading: true,
                isDesktop: false,
                info: {
                    title: '',
                    items: []
                }
            }
        },
        computed: {
            ...mapState('todo', ['items', 'pageDisabled', 'saveLoading', 'editLoading', 'removeLoading'])
        },
        methods: {
            ...mapActions('todo', ['stGetTodoById', 'togglePageDisabled', 'stSave', 'stEdit', 'stRemove']),
            ...mapActions('message', ['message']),
            createEmptyNote() {
                const items = this.info.items
                const newItem = {
                    id: randomString(10),
                    isChecked: false,
                    value: ''
                }
                items.push(newItem)
            },
            addInfoToNote({index, info}) {
                const items = this.info.items
                info.id = items[index].id
                items.splice(index, 1, info)
            },
            removeNote(index) {
                this.info.items.splice(index, 1)
            },
            async saveTodo(payload) {
                if (payload === 'create') {
                    this.info.id = randomString(14)
                    const data = await this.stSave(this.info)
                    if (data) {
                        this.message(['positive', 'Новый список добавлен']);
                        this.$router.push({name: 'main'})
                    } else {
                        this.message(['negative', 'Ошибка, попробуйте еще раз'])
                    }
                } else {
                    const data = await this.stEdit(this.info)
                    if (data) {
                        this.message(['positive', 'Список обновлен']);
                        this.$router.push({name: 'main'})
                    } else {
                        this.message(['negative', 'Ошибка, попробуйте еще раз'])
                    }
                }
            },
            async getTodoById() {
                this.isLoading = true;
                const id = this.$route.params.id
                if (id) {
                    this.info.items = [];
                    const response = await this.stGetTodoById(id)
                    this.info = response
                    this.isLoading = false
                }
            },
            async removeTodo() {
                const id = this.$route.params.id
                const response = await this.stRemove(id)
                if (response) {
                    this.message(['positive', 'Todo удален'])
                    this.$router.push({name: 'main'})
                } else {
                    this.message(['negative', 'Ошибка, попробуйте еще раз'])
                }
            }
        },
        async mounted() {
            this.isDesktop = media('md', 'min');
            window.onresize = () => {
                this.isDesktop = media('md', 'min')
            };
            this.togglePageDisabled(true)
            await this.getTodoById()
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
                top: 0;
                left: 0;
                z-index: 9;
                width: 100%;
                height: 100%;
                background-color: rgba($color--base, 0.6);
            }
        }

        &__title {
            display: flex;
            justify-content: center;
            padding: 0 0 $gutter 0;
            @include md() {
                padding: $gutter 0 $gutter * 2 0;
            }

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

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        &__add-btn {
            position: fixed !important;
            right: $gutter;
            bottom: $gutter
        }

        &__mock-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .list-complete-enter, .list-complete-leave-to {
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
