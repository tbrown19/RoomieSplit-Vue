import VueRouter from 'vue-router';

let routes = [{
        path: '/about',
        component: require('./views/About.vue')
    },

    {
        path: '/explanation',
        component: require('./views/Explanation.vue')
    },

    {
        path: '/',
        component: require('./views/Home.vue')
    },

    {
        path: '/calculator',
        component: require('./views/Calculator.vue')
    }
]

export default new VueRouter({
    mode: 'history',
    routes,
})