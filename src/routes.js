import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component: require('./views/Home.vue')
    },

    {
        path: '/about',
        component: require('./views/About.vue')
    }
]

export default new VueRouter({
    routes,
    linkActiveClass: 'is-active'
})