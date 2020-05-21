// eslint-disable-next-line no-unused-vars
import { apiCreateTodo, apiDeleteTodo, stApiGetTodoById } from '@/api/api'
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
        },
        resetState(state) {
            state.isLoading = false;
            state.title = '';
            state.items = [];
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
        async save({state, commit, dispatch}) {
            commit('setIsLoading', true)
            const info = {
                id: randomString(6),
                title: state.title,
                items: state.items

            }
            const data = await apiCreateTodo(info)
            dispatch('reset')
            return Boolean(data)
        },
        // eslint-disable-next-line no-unused-vars
        async stGetTodoById({commit, dispatch}, id) {
            commit('setIsLoading', true)
            try {
                const data = await stApiGetTodoById(id)
                if (data) {
                    commit('setTitle', data.data.title)
                    commit('setItems', data.data.items)
                    return data.data
                } else {
                    return false
                }
            } catch (e) {
                console.log(e)
                return false
            }
        },
        async remove({commit, dispatch}, id) {
            commit('setIsLoading', true)
            const data = await apiDeleteTodo(id)
            commit('setIsLoading', false)
            dispatch('main/stGetAllTodo', null, {root: true})
            return Boolean(data)
        },
        reset({commit}) {
            commit('resetState')
        }
    }
}
