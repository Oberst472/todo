<template>
    <div class="view-main page">
        <header class="page__header">
            <SectionHeader>
                <UiBtn :to="{name: 'create'}" class="section-header__btn" size="medium" theme="positive">Создать</UiBtn>
            </SectionHeader>
        </header>
        <main class="page__body">
            <div class="wrap">
                <SectionItems :items="getItems" @removeTodo="removeTodo"/>
            </div>
        </main>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    import SectionHeader from '@/components/sections/header'
    import SectionItems from './items'

    export default {
        components: {
            SectionHeader,
            SectionItems
        },
        computed: {
            ...mapGetters('main', ['getItems'])
        },
        methods: {
            ...mapActions('main', ['stGetAllTodo']),
            ...mapActions('todo', ['stRemove']),
            ...mapActions('message', ['message']),
            async removeTodo(id) {
                const response = await this.stRemove(id);
                if (response) {
                    this.stGetAllTodo()
                    this.message(['positive', 'Todo удален'])
                } else {
                    this.message(['negative', 'Ошибка, попробуйте еще раз'])
                }

            }
        },
        mounted() {
            this.stGetAllTodo()
        }
    }
</script>

<style lang="scss" scoped>
</style>
