import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from '../hxlvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    age: 10
  },
  getters: {
    myAge(state) {
      return state.age + 18;
    }
  },
  mutations: {
    syncAdd(state,payload) {
      state.age += payload;
    },
    syncMinus(state,payload) {
      state.age -= payload;
    }
  },
  actions: {
    asyncMinus({commit},payload){
      setTimeout(() => {
        commit('syncMinus',payload);
      }, 2000);
    }
  },
  modules: {
  }
})
