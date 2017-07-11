import Vue from 'vue'
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import VueFire from 'vuefire';



//Vue uses
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueFire);


//Element UI Related imports and uses
import {table, TableColumn, Form, FormItem, menu, MenuItem, Tooltip, row, col} from 'element-ui'
Vue.use(table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(menu);
Vue.use(MenuItem);
Vue.use(Tooltip);
Vue.use(row);
Vue.use(col);
import 'element-ui/lib/theme-default/index.css';


//Router
import router from './routes';

//Views
import App from './views/App.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';

//Create the store instance
import {
    store
} from './store.js';


//Vee validate configuration must be changed so it can properly interact with element ui
const config = {
    errorBagName: 'errors', // change if property conflicts.
    fieldsBagName: 'inputs ', //Default is fields
    delay: 0,
    locale: 'en',
    dictionary: null,
    strict: true,
    enableAutoClasses: false,
    classNames: {
        touched: 'touched', // the control has been blurred
        untouched: 'untouched', // the control hasn't been blurred
        valid: 'valid', // model is valid
        invalid: 'invalid', // model is invalid
        pristine: 'pristine', // control has not been interacted with
        dirty: 'dirty' // control has been interacted with
    },
    events: 'input|blur',
    inject: true
};
Vue.use(VeeValidate, config);


router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

const app = new Vue({
    router,
    store,
    render: createEle => createEle(App)
}).$mount('#app');

