import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '',
            component: require('./layouts/main').default,
            children: [
                {
                    path: '/',
                    name: 'main',
                    components: {
                        default: require('./pages/main').default
                    }
                },
                {
                    path: '/add',
                    name: 'addNewTodo',
                    components: {
                        default: require('./pages/addNewTodo').default
                    }
                }
            ]
        }
    ]
})
