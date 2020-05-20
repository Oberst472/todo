export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    addItemIncrement(state, item) {
      state.items.push({ status: item[0], value: item[1] })
    },
    addItemDecrement(state) {
      state.items.splice(0, 1)
    }
  },
  getters: {},
  actions: {
    message({ commit }, item) {
      commit('addItemIncrement', item)
    },
    deleteMessage({ commit }) {
      commit('addItemDecrement')
    }
  }
}
