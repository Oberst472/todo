<template>
    <section class="section-header">
        <div class="wrap">
            <div class="section-header__content">
                <h1 class="section-header__title">Все заметки</h1>
                <UiBtn class="section-header__btn" theme="positive" size="medium">Добавить</UiBtn>
            </div>
        </div>
    </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
    .section-header {
        background-color: darken($color--primary, 5%);
        &__title {
            @include adaptiveFont(15px, 33px);
            margin: 0;
        }
        &__content {
            display: flex;
            @include md() {
                padding: $gutter / 2 0;
                justify-content: space-between;
            }
        }
    }
</style>
