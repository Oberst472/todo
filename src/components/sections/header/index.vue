<template>
    <section class="section-header">
        <div class="wrap">
            <div class="section-header__content">
                <UiBtn @click="$router.push({name: 'main'})" circle size="small" theme="accent" icon="home" v-if="$route.name !== 'main'" title="На главную">Назад</UiBtn>
                <h1 class="section-header__title">{{ $route.meta.title }}</h1>
                <div class="section-header__options" v-if="$route.name === 'main'">
                    <UiBtn class="section-header__btn" theme="positive" size="medium" :to="{name: 'create'}">Создать новый список</UiBtn>
                </div>

                <div class="section-header__options" v-if="$route.name === 'create'">
                    <UiBtn class="section-header__btn" theme="positive" size="medium" @click="saveTodo" :loading="saveLoading" :disabled="!title.length">Сохранить</UiBtn>
                </div>

                <div class="section-header__options" v-if="$route.name === 'edit'">
                    <UiBtn class="section-header__btn" theme="negative" size="medium" @click="removeTodo" :loading="removeLoading">Удалить заметку</UiBtn>
                    <UiBtn class="section-header__btn" theme="positive" size="medium" @click="editTodo" :loading="editLoading" :disabled="!title.length">Сохранить изменения</UiBtn>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
export default {
        computed: {
            ...mapState('todo', ['title', 'saveLoading', 'removeLoading', 'editLoading'])
        },
        methods: {
            ...mapActions('todo', ['stCreateEmptyNote', 'save', 'remove', 'edit']),
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
            },
            async editTodo() {
                const id = this.$route.params.id
                const data = await this.edit(id)
                if (data) {
                    this.message(['positive', 'Todo отредактирован'])
                    this.$router.push({name: 'main'})
                }
                else {
                    this.message(['negative', 'Ошибка, попробуйте еще раз'])
                }
            },
            async removeTodo() {
                const id = this.$route.params.id
                const response = await this.remove(id)
                if (response) {
                    this.message(['positive', 'Заметка удалена'])
                    this.$router.push({name: 'main'})
                }
                else {
                    this.message(['negative', 'Ошибка, попробуйте еще раз'])
                }
            }
        }
}
</script>

<style lang="scss" scoped>
    .section-header {
        background-color: darken($color--primary, 5%);
        &__title {
            @include adaptiveFont(15px, 33px);
            margin: 0;
            margin-left: $gutter / 2;
        }
        &__content {
            display: flex;
            align-items: center;
            @include md() {
                padding: $gutter / 2 0;
                justify-content: space-between;
            }
        }
        &__options {
            margin-left: auto;
            & > * {
                margin-left: $gutter / 2;
            }
        }
    }
</style>
