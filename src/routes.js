import VueRouter from 'vue-router';

let routes = [{
        path: '/about',
        component: require('./views/About.vue'),
        meta: {title: 'Roomie Split - About'}
    },

    {
        path: '/explanation',
        component: require('./views/Explanation.vue'),
        meta: {title: 'Roomie Split - Explanation'}
    },

    {
        path: '/',
        component: require('./views/Home.vue'),
        meta: {title: 'Roomie Split - Home'}
    },

    {
        path: '/calculator/:configId',
        name: 'calculator',
        component: require('./views/Calculator.vue'),
        meta: {title: 'Roomie Split - Calculator'}
    }
]


export default new VueRouter({
    mode: 'history',
    routes,
})