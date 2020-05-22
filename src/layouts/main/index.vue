<template>
    <div class="layout-main">
        <!--        <header class="layout-main__header">-->
        <!--            <SectionHeader/>-->
        <!--        </header>-->
        <router-view/>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped lang="scss">
.layout-main {
    width: 100%;
    min-height: 100%;
    display: flex;
}
</style>
