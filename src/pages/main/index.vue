<template>
    <div class="view-main">
        <div class="wrap">
            <SectionItems :items="getItems" @removeTodo="removeTodo"/>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import SectionItems from './items'
    export default {
        components: {
            SectionItems
        },
        computed: {
            ...mapGetters('main', ['getItems'])
        },
        methods: {
            ...mapActions('main', ['stGetAllTodo']),
            ...mapActions('todo', ['remove']),
            ...mapActions('message', ['message']),
            async removeTodo(id) {
                const response = await this.remove(id)
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
    padding: $gutter * 2 0;
}
</style>
