import Vue from 'vue'
import Vuex from '../hxlvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    age: 18
  },
  getters: {
    myAge(state) {
      // console.log(state);
      return state.age + 10;
    }
  },
  mutations: {
    syncAdd(state, payload) {
      state.age += payload;
    },
    syncMinus(state, payload) {
      state.age -= payload;
    }
  },
  actions: {
    asyncMinus({ commit, dispatch }, payload) {
      console.log(dispatch);
      setTimeout(() => {
        commit('syncMinus', payload);
      }, 1000);
    }
  },
  modules: {
    a: {
      state: {
        x: 1
      },
      getters: {
        getA(state) {
          console.log(state);
          return state.x + 100 + 'a';
        }
      },
      mutations: {
        syncAdd(state, payload) {
          console.log('a-m');
          // state.age += payload;
          console.log(state, payload);
        },
        changeX(state) {
          ++state.x
        }
      },
      modules: {
        c: {
          state: {
            z: 3
          },
          // modules: {
          //   d: {
          //     state: {
          //       zz: 4
          //     }
          //   }
          // }
        }
      }
    },
    b: {
      state: {
        y: 2
      }
    }
  }
})
