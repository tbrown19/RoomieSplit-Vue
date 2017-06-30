import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router';
Vue.use(ElementUI);


Vue.use(VueRouter);

//Views
import App from './views/App.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';

const router = new VueRouter({
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
    },

    {
        path: '/about',
        name: 'about',
        component: About
    },
    ]
});

const app = new Vue({
    router,
    render: createEle => createEle(App)
}).$mount('#app');