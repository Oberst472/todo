// eslint-disable-next-line no-unused-vars
import {apiCreateTodo, apiDeleteTodo, apiEditTodo, stApiGetTodoById} from '@/api/api'

export default {
    namespaced: true,
    state: {
        isLoading: false,
        removeLoading: false,
        saveLoading: false,
        getAllLoading: false,
        getByIdLoading: false,
        pageDisabled: true
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
        setPageDisabled(state, payload) {
            state.pageDisabled = payload
        }
    },
    actions: {
        async stSave({commit}, info) {
            commit('setIsLoading', ['save', true])
            const data = await apiCreateTodo(info)
            commit('setIsLoading', ['save', false])
            return Boolean(data)
        },
        async stEdit({commit}, info) {
            commit('setIsLoading', ['edit', true])
            const data = await apiEditTodo(info)
            commit('setIsLoading', ['edit', false])
            return Boolean(data)
        },
        async stGetTodoById({commit}, id) {
            commit('setIsLoading', ['getById', true])
            try {
                const data = await stApiGetTodoById(id)
                if (data) {
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
        async stRemove({commit}, id) {
            commit('setIsLoading', ['remove', true])
            try {
                const data = await apiDeleteTodo(id)
                commit('setIsLoading', ['remove', false])
                return Boolean(data)
            } catch (e) {
                commit('setIsLoading', ['remove', false])
                console.log(e)
            }
        },
        togglePageDisabled({commit}, payload) {
            commit('setPageDisabled', payload)
        }
    }
}
