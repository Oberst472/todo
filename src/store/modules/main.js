import { apiAllTodo } from '@/api/api'

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
        }
    },
    getters: {
        getItems(state) {
            return state.items.reverse()
        }
    },
    actions: {
        //получить все тудушки
        async stGetAllTodo({ commit }) {
            console.log(66)
            commit('setIsLoading', true)
            try {
                const data = await apiAllTodo()
                console.log(data.data)
                commit('setIsLoading', false)
                commit('setItems', data.data)
                return !!data
            } catch (e) {
                console.error(e)
                commit('setIsLoading', false)
                return false
            }
        }
    }
}
