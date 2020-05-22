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
                    name: 'create',
                    components: {
                        default: require('./pages/detailed').default
                    },
                    meta: {
                        title: `Создать`
                    }
                },
                {
                    path: '/edit/:id',
                    name: 'edit',
                    components: {
                        default: require('./pages/detailed').default
                    },
                    meta: {
                        title: `Редактировать`
                    }
                }
            ]
        }
    ]
})
