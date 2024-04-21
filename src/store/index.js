import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userData: {}
  },
  mutations: {
    savePayload (state, payload, userData) {
      state.token = payload
      state.userData = userData
    },
    removePayload (state) {
      state.token = ''
      state.userData = {}
    }
  },
  actions: {
    dispatchPayload (store, payload, userData) {
      store.commit('savePayload', payload, userData)
    },
    removeUserData (store) {
      store.commit('removePayload')
    }
  },
  modules: {
  }
})
