import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from '../hxlvuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 10
  },
  getters: {
    tenCount(state) {
      return state.count * 10;
    }
  },
  mutations: {
    syncAdd(state, payload) {
      state.count += payload;
    },
    syncMinus(state,payload){
      state.count -= payload;
    }
  },
  actions: {
    asyncMinus({commit,dispatch},payload){
      console.log(dispatch);
      setTimeout(() => {
        commit('syncMinus',payload)
      }, 1000);
    }
  },
  // modules: {
  // }
})
