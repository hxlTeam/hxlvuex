let Vue;

class Store {
  constructor(options) {
    this._state = options.state;

    let getters = options.getters || {}; // 用户传过来的getters
    this._getters = {};
    Object.keys(getters).forEach(propName => {
      Object.defineProperty(this._getters, propName, {
        get: () => {
          return getters[propName](this.state);
        }
      })
    })
  }
  get state() {
    return this._state;
  }
  get getters() {
    return this._getters;
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