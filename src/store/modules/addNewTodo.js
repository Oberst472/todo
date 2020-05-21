// import { apiAllTodo } from '@/api/api'
import {randomString} from '@/utils/randomString'
export default {
    namespaced: true,
    state: {
        isLoading: false,
        items: []
    },
    mutations: {
        setIsLoading(state, payload) {
            state.isLoading = payload
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
        }
    }
}
