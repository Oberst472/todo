<template>
    <div class="ui-message">
        <div class="ui-message__items">
            <transition-group name="list">
                <div class="ui-message__item" :class="`ui-message__item--${item.status}`" v-for="(item, index) in items" :key="`item-${index}`">
                    {{ item.value }}
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      timeout: ''
    }
  },
  computed: {
    ...mapState('message', ['items'])
  },
  methods: {
    ...mapActions('message', ['deleteMessage'])
  },
  watch: {
    items(val) {
      if (val.length) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.deleteMessage()
        }, 2000)
      } else {
        clearTimeout(this.timeout)
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .ui-message {
        position: fixed;
        right: 0;
        bottom: 0;
        width: 300px;
        height: 100vh;
        z-index: 50;
        overflow: hidden;
        pointer-events: none;

        &__items {
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: flex-start;
        }

        &__item {
            margin-bottom: $gutter / 2;
            width: 100%;
            padding: $gutter;
            display: inline-flex;
            justify-content: center;
            text-align: center;
            min-height: 80px;
            box-sizing: border-box;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            &--positive {
                background-color: $color--positive;
                color: $color--text-light
            }
            &--negative {
                background-color: $color--negative;
                color: $color--text-light
            }
        }
        .list-enter-active, .list-leave-active {
            transition: all 1s ease;
        }
        .list-enter, .list-leave-to {
            opacity: 0;
            transform: translateX(150px);
        }
    }
</style>
