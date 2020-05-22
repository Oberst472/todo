<template>
    <div class="view-main page">
        <header class="page__header">
            <SectionHeader>
                <UiBtn class="section-header__btn" theme="positive" size="medium" :to="{name: 'create'}">Создать новый список</UiBtn>
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
    import {mapGetters, mapActions} from 'vuex'
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
                const response = await this.stRemove(id)
                response ?
                    this.message(['positive', 'Todo удален']) :
                    this.message(['negative', 'Ошибка, попробуйте еще раз'])

            }
        },
        mounted() {
            this.stGetAllTodo()
        }
    }
</script>

<style scoped lang="scss">
.view-main {
    //padding: $gutter * 2 0;
}
</style>
