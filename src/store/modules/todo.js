// eslint-disable-next-line no-unused-vars
import { apiCreateTodo, apiDeleteTodo, stApiGetTodoById, apiEditTodo } from '@/api/api'
import {randomString} from '@/utils/randomString'
export default {
    namespaced: true,
    state: {
        isLoading: false,
        removeLoading: false,
        saveLoading: false,
        getAllLoading: false,
        getByIdLoading: false,
        title: '',
        items: []
    },
    mutations: {
        setIsLoading(state, payload) {
            switch (payload[0]) {
                case 'save':
                    state.saveLoading = payload[1]
                    break
                case 'remove':
                    state.removeLoading = payload[1]
                    break
                case 'getAll':
                    state.getAllLoading = payload[1]
                    break
                case 'getById':
                    state.getByIdLoading = payload[1]
                    break
            }
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
            state.title = '';
            state.items = [];
        }
    },
    actions: {
        //добавить заголовок списка
        stAddTitle({commit}, payload) {
            commit('setTitle', payload)
        },
        //создать пустой элемент списка
        stCreateEmptyNote({commit}) {
            const newItem = {
                id: randomString(10),
                isChecked: false,
                value: ''
            }
            commit('setItemsIncrement', newItem)
        },
        //добавить информацию в элемент списка
        stAddInfoToNote({commit}, payload) {
            commit('setAddInfoToNote', payload)
        },
        //удалить элемент списка
        stRemoveNote({commit}, index) {
            commit('setItemsDecrement', index)
        },
        //сохранить список
        async save({state, commit, dispatch}) {
            commit('setIsLoading', ['save', true])
            const info = {
                id: randomString(10),
                title: state.title,
                items: state.items

            }
            const data = await apiCreateTodo(info)
            dispatch('reset')
            commit('setIsLoading', ['save', false])
            return Boolean(data)
        },
        async edit({state, commit, dispatch}, id) {
            commit('setIsLoading', ['edit', true])
            const info = {
                id,
                title: state.title,
                items: state.items

            }
            const data = await apiEditTodo(info)
            dispatch('reset')
            commit('setIsLoading', ['edit', false])
            return Boolean(data)
        },
        //получить определенный список по id
        async stGetTodoById({commit}, id) {
            commit('setIsLoading', ['getById', true])
            try {
                const data = await stApiGetTodoById(id)
                if (data) {
                    commit('setTitle', data.data.title)
                    commit('setItems', data.data.items)
                    commit('setIsLoading', ['getById', false])
                    return data.data
                } else {
                    commit('setIsLoading', ['getById', false])
                    return false
                }
            } catch (e) {
                console.log(e)
                commit('setIsLoading', ['getById', false])
                return false
            }
        },
        //удалить список по id
        async remove({commit, dispatch}, id) {
            commit('setIsLoading', ['remove', true])
            try {
                const data = await apiDeleteTodo(id)
                dispatch('main/stGetAllTodo', null, {root: true})
                commit('setIsLoading', ['remove', false])
                return Boolean(data)
            } catch (e) {
                commit('setIsLoading', ['remove', false])
                console.log(e)
            }
        },
        //обнулить стейт
        reset({commit}) {
            commit('resetState')
        }
    }
}
