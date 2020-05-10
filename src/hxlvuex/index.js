let Vue;
const forEach = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(key, obj[key]);
  })
}
class Store {
  constructor(options) {
    this._vm = new Vue({
      data() {
        return {
          state: options.state // 把state对象变成了可以监控的对象
        }
      }
    });

    let getters = options.getters || {}; // 用户传过来的getters
    this._getters = {};
    forEach(getters, (propName, fn) => {
      Object.defineProperty(this._getters, propName, {
        get: () => {
          return fn(this.state);
        }
      });

    });

    let mutations = options.mutations || {};
    this.mutations = {};
    forEach(mutations, (propName, fn) => {
      this.mutations[propName] = (payload) => {
        fn(this.state, payload);
      };
    });
  }
  get state() {
    return this._vm.state;
  }
  get getters() {
    return this._getters;
  }
  commit(type, payload) {
    this.mutations[type](payload);
  }
}

const install = (_Vue) => {
  Vue = _Vue;
  // console.log('install');
  Vue.mixin({
    beforeCreate() {
      console.log(this.$options.name);
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    }
  });

}

export default {
  install,
  Store
}