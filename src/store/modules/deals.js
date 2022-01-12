import axios from 'axios'

export const namespaced = true

export const state = {
  dataStatus: '',
  error: '',
  data: [],
  loadingData: true
}

export const mutations = {
  GET_DATA_STATUS (state) {
    state.dataStatus = 'loading'
  },

  DATA_SUCCESS (state, data) {
    state.data = data
    state.loadingData = false
    state.dataStatus = 'success'
    state.error = ''
  },

  DATA_ERROR (state, err) {
    state.dataStatus = 'error'
    state.error = err
  }

}

export const getters = {
  //
}

export const actions = {
  getProducts ({ commit }) {
    commit('GET_DATA_STATUS')
    return axios
      .get('products/best-selling-products-by-subcategory')
      .then(response => {
        commit('DATA_SUCCESS', response.data)
      })
      .catch(err => {
        commit('DATA_ERROR', err)
      })
  }

}
