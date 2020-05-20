<template>
    <div class="layout-main">
        <header class="layout-main__header">
            <SectionHeader/>
        </header>
        <main class="layout-main__body">
            <router-view/>
        </main>
    </div>
</template>

<script>
    import SectionHeader from '@/components/sections/header';
    export default {
        components: {
            SectionHeader
        }
    }
</script>

<style scoped lang="scss">
.layout-main {
    background-color: $color--base;
    min-width: 100%;
    &__header {
        position: sticky;
        top: 0;
        z-index: 10;
    }
}
</style>
