<template>
    <div class="layout-main">
        <transition name="layout-fade" mode="out-in" appear>
            <router-view/>
        </transition>
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
