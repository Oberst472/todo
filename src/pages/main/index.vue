<template>
    <div class="view-main">
        <div class="wrap">
            <h1 class="view-main-title">Все заметки</h1>
            <SectionItems/>
        </div>
    </div>
</template>

<script>
    import SectionItems from './items'
    export default {
        components: {
            SectionItems
        }
    }
</script>

<style scoped lang="scss">

</style>
