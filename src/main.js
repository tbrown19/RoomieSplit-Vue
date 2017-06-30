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


//Router
import router from './routes';

const app = new Vue({
    router,
    render: createEle => createEle(App)
}).$mount('#app');