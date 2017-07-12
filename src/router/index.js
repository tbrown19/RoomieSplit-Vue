import Vue from 'vue';
import Router from 'vue-router';

// Import Views
import Home from '@/views/Home';
import Explanation from '@/views/Explanation';
import About from '@/views/About';
import Calculator from '@/views/Calculator';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                title: 'Roomie Split - Home'
            }
        },

        {
            path: '/explanation',
            name: 'explanation',
            component: Explanation,
            meta: {
                title: 'Roomie Split - Explanation'
            }
        },

        {
            path: '/about',
            name: 'about',
            component: About,
            meta: {
                title: 'Roomie Split - About'
            }
        },

        {
            path: '/calculator/:configId',
            name: 'calculator',
            component: Calculator,
            meta: {
                title: 'Roomie Split - Calculator'
            }
        }
    ]
});
