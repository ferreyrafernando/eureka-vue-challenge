import Vue from 'vue'
import Vuex from 'vuex'
import * as deals from './modules/deals.js'

Vue.use(Vuex)

export const namespaced = true

const store = new Vuex.Store({
  modules: {
    deals
  }
})

export default store
