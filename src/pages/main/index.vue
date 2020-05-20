<template>
    <div class="view-main">
        <div class="wrap">
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
.view-main {
    padding: $gutter * 2 0;
}
</style>
