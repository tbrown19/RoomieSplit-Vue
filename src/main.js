import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import 'element-ui/lib/theme-default/index.css';


//Vue uses
Vue.use(VeeValidate);
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

//Router
import router from './routes';

//Views
import App from './views/App.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';

//Create the store instance
import { store } from './store.js';

const app = new Vue({
    router, 
    store,
    render: createEle => createEle(App)
}).$mount('#app');

