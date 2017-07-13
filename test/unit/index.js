import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';
Vue.use(Buefy);
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
    fieldsBagName: 'inputsBag', // Default is fields
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

Vue.config.productionTip = false;

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/);
srcContext.keys().forEach(srcContext);
