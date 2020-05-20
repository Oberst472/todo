<template>
    <div class="layout-main">
        <header class="layout-header">
            <SectionHeader/>
        </header>
        <main class="layout-main">
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
    width: 100%;
}
</style>
