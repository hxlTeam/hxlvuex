import Vue from 'vue'
import Vuex from '../hxlvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    age: 18
  },
  getters: {
    myAge(state) {
      console.log(state);
      return state.age + 10;
    }
  },
  mutations: {
    syncAdd(state,payload){
      state.age += payload; // 81:40
    }
  },
  actions: {
  },
  modules: {
  }
})
