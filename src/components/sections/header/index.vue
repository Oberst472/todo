<template>
    <section class="section-header">
        <div class="wrap">
            <div class="section-header__content">
                <h1 class="section-header__title">{{ $route.meta.title }}</h1>
                <div class="section-header__options" v-if="$route.name === 'main'">
                    <UiBtn class="section-header__btn" theme="positive" size="medium" :to="{name: 'addNewTodo'}">Создать новый список</UiBtn>
                </div>

                <div class="section-header__options" v-if="$route.name === 'addNewTodo'">
                    <UiBtn class="section-header__btn" theme="positive" size="medium" @click="stCreateEmptyNote">Создать новую заметку</UiBtn>
                    <UiBtn class="section-header__btn" theme="positive" size="medium" @click="saveTodo" :loading="isLoading">Сохранить</UiBtn>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
export default {
        computed: {
            ...mapState('addNewTodo', ['isLoading'])
        },
        methods: {
            ...mapActions('addNewTodo', ['stCreateEmptyNote', 'save']),
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
        }
}
</script>

<style lang="scss" scoped>
    .section-header {
        background-color: darken($color--primary, 5%);
        &__title {
            @include adaptiveFont(15px, 33px);
            margin: 0;
        }
        &__content {
            display: flex;
            @include md() {
                padding: $gutter / 2 0;
                justify-content: space-between;
            }
        }
        &__options {
            & > * {
                margin-left: $gutter / 2;
            }
        }
    }
</style>
