<template>
    <div class="page-todo-item">
        <div class="wrap">
            <div class="page-todo-item__content">
                <div class="page-todo-item__title">
                    <UiInput class="page-todo-item__title-inp" v-model="title"/>
                </div>
                <transition-group name="list-complete" tag="ul" class="page-todo-item__list" v-if="items.length">
                    <li class="page-todo-item__list-item" v-for="(item, index) in items" :key="item.id">
                        <BlockNoteItem
                            checkbox
                            @input="stAddInfoToNote({index, info: $event})"
                            @delete="stRemoveNote(index)"
                            :value="item.value"
                            :checked="item.isChecked"
                        />
                    </li>
                </transition-group>
                <UiBtn class="page-todo-item__add-btn" @click="stCreateEmptyNote" circle theme="positive" icon="plus">
                    Добавить
                </UiBtn>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import BlockNoteItem from '@/components/blocks/noteItem';

    export default {
        components: {
            BlockNoteItem
        },
        data() {
            return {
                title: ''
            }
        },
        computed: {
            ...mapState('todo', ['items'])
        },
        methods: {
            ...mapActions('todo', ['stRemoveNote', 'stAddInfoToNote', 'stAddTitle', 'stGetTodoById', 'stCreateEmptyNote'])
        },
        watch: {
            title(val) {
                this.stAddTitle(val)
            }
        },
        async mounted() {
            const id = this.$route.params.id
            if (id) {
                const response = await this.stGetTodoById(id)
                this.title = response.title
            }
        }
    }
</script>

<style scoped lang="scss">
    .page-todo-item {
        &__title {
            padding: $gutter 0 $gutter * 2 0;
            display: flex;
            justify-content: center;

            &-inp {
                border-bottom: 1px solid rgba($color--text-light, 0.1);
                font-size: 20px;
                text-align: center;
            }
        }

        &__list {
            @include listReset;
            position: relative;

            &-item {
                text-align: left;
                font-size: 16px;
                margin-bottom: $gutter / 2;
                display: block;
                width: 100%;
                box-sizing: border-box;
                transition-duration: 1s;
            }
        }

        &__add-btn {
            position: fixed !important;
            right: $gutter;
            bottom: $gutter
        }

        .list-complete-enter, .list-complete-leave-to
            /* .list-complete-leave-active до версии 2.1.8 */
        {
            opacity: 0;
            transform: translateY(30px);
            transition-duration: 0.3s;

            /deep/ .ui-btn__confirm {
                opacity: 0;
            }
        }

        .list-complete-leave-active {
            position: absolute;
        }
    }
</style>
