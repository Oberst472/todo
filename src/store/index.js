import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main'
import todo from './modules/todo'
import message from './modules/message'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        message,
        main,
        todo
    }
})
