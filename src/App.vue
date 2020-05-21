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
</style>
