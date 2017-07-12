// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false;

import {
    table,
    TableColumn,
    Form,
    FormItem,
    menu,
    MenuItem,
    Tooltip,
    row,
    col
} from 'element-ui';
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

// Vee validate configuration must be changed so it can properly interact with element ui
const config = {
    errorBagName: 'errors', // change if property conflicts.
    fieldsBagName: 'inputs ', // Default is fields
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

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
});
