
let Vue = null;
const install = (_Vue) => {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      // console.log(this.$options);
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store;
      }
      else {
        this.$store = this.$parent && this.$parent.$store;
      }
    }
  });
}
class Store {
  constructor(options) {
    this._vm = new Vue({
      data: {
        state: options.state
      }
    })

    let getters = options.getters || {};
    this._getters = {};
    Object.keys(getters).forEach(prop => {
      Object.defineProperty(this._getters, prop, {
        get: () => {
          return getters[prop](this.state);
        }
      });
    });

    let mutations = options.mutations || {};
    this.mutations = {};
    Object.keys(mutations).forEach(prop => {
      this.mutations[prop] = (payload) => {
        mutations[prop].call(this, this.state, payload);
      };
    });

    let actions = options.actions || {};
    this.actions = {};
    Object.keys(actions).forEach(prop => {
      this.actions[prop] = (payload) => {
        actions[prop].call(this, this, payload);
      };
    });
  }
  get state() {
    return this._vm.state;
  }
  get getters() {
    return this._getters;
  }
  commit = (type, payload) => {
    console.log(type, payload);
    this.mutations[type](payload);
  }
  dispatch = (type, payload) => {
    console.log(type, payload);
    this.actions[type](payload);
  }
}



export default {
  install,
  Store
}