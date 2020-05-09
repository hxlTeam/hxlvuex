let Vue;

class Store{
  constructor(options) {
    this._state = options.state;
  }
  get state() {
    return this._state;
  }
}

const install = (_Vue) => {
  Vue = _Vue;
  // console.log('install');
  Vue.mixin({
    beforeCreate() {
      console.log(this.$options.name);
      if(this.$options && this.$options.store){
        this.$store = this.$options.store;
      }else{
        this.$store = this.$parent && this.$parent.$store;
      }
    }
  });

}

export default {
  install,
  Store
}