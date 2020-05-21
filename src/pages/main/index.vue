<template>
    <div class="view-main">
        <div class="wrap">
            <SectionItems :items="getItems" @removeTodo="remove($event)"/>
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
            ...mapActions('todo', ['remove'])
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
