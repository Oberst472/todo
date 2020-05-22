<template>
    <div id="app" class="main">
        <router-view/>
        <UiMessage class="view-main__message"/>
    </div>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style lang="scss">
    .main {
        display: flex;
        width: 100%;
        height: 100%;
    }
    .page {
        width: 100%;
        &__header {
            position: sticky;
            top: 0;
            z-index: 10;
        }
        &__body {
            padding: $gutter 0;
            background-color: $color--base;
        }
    }
</style>
