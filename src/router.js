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
                    },
                    meta: {
                        title: `Все списки дел`
                    }
                },
                {
                    path: '/create',
                    name: 'createTodo',
                    components: {
                        default: require('./pages/addNewTodo').default
                    },
                    meta: {
                        title: `Новый список`
                    }
                },
                {
                    path: '/edit/:id',
                    name: 'editTodo',
                    components: {
                        default: require('./pages/editTodo').default
                    },
                    meta: {
                        title: `Редактировать заметку`
                    }
                }
            ]
        }
    ]
})
