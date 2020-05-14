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
    asyncMinus({ commit }, payload) {
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
          return state.x + 100 + '-a';
        }
      },
      mutations: {
        syncAdd(state,payload) {
          console.log('a-module',state,payload);
        },
        changeX(state){
          ++state.x
        }
      },
      modules: {
        c: {
          state: {
            z: 3
          },
          modules: {
            d: {
              state: {
                w: 4
              }
            }
          }
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
