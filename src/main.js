// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify'
import store from '@/store'

import axios from 'axios'
import capitalizeFirst from '@stdlib/string-startcase'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'https://kabsa.yallababy.com/api/v1/'
axios.defaults.headers.common['secretKey'] = '1DIPIkKeq8'

Vue.config.productionTip = false

Vue.filter('capitalizeFirst', capitalizeFirst)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  components: { App },
  template: '<App/>'
})
