<template>
    <div class="view-main">
        <div class="wrap">
            <SectionItems :items="items"/>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    import SectionItems from './items'
    export default {
        components: {
            SectionItems
        },
        computed: {
            ...mapState('main', ['items'])
        },
        methods: {
            ...mapActions('main', ['stGetAllTodo'])
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
