import { apiCreateTodo } from '@/api/api'
import {randomString} from '@/utils/randomString'
export default {
    namespaced: true,
    state: {
        isLoading: false,
        title: '',
        items: []
    },
    mutations: {
        setIsLoading(state, payload) {
            state.isLoading = payload
        },
        setTitle(state, title) {
            state.title = title
        },
        setItems(state, items) {
            state.items = items
        },
        setItemsIncrement(state, payload) {
            state.items.push(payload)
        },
        setItemsDecrement(state, index) {
            state.items.splice(index, 1)
        },
        setAddInfoToNote(state, payload) {
            payload.info.id = state.items[payload.index].id
            state.items.splice(payload.index, 1, payload.info)
        }
    },
    actions: {
        stAddTitle({commit}, payload) {
            commit('setTitle', payload)
        },
        stCreateEmptyNote({commit}) {
            const newItem = {
                id: randomString(6),
                isChecked: false,
                value: ''
            }
            commit('setItemsIncrement', newItem)
        },
        stAddInfoToNote({commit}, payload) {
            commit('setAddInfoToNote', payload)
        },
        stRemoveNote({commit}, index) {
            commit('setItemsDecrement', index)
        },
        save({state}) {
            const info = {
                id: randomString(6),
                title: state.title,
                items: state.items

            }
            apiCreateTodo(info)
        }
    }
}
