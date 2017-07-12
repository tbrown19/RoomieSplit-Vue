// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import {table, TableColumn, Form, FormItem, menu, MenuItem, Tooltip, row, col} from 'element-ui'
Vue.use(table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(menu)
Vue.use(MenuItem)
Vue.use(Tooltip)
Vue.use(row)
Vue.use(col)
import 'element-ui/lib/theme-default/index.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
