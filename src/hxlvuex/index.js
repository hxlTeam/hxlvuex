let Vue; // vue的构造函数
const forEach = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(key, obj[key]);
  })
}
class Store {
  constructor(options) {
    this._vm = new Vue({ // 借助vue来实现数据监听
      data() {
        return {
          state: options.state
        }
      }
    });

    let getters = options.getters || {}; // new Store时传进来的getters
    this.getters = {};
    // 把getters的属性定义到 this.getters中，并根据状态的变化，重新执行此函数
    forEach(getters, (propName, fn) => {
      Object.defineProperty(this.getters, propName, {
        get: () => {
          return fn(this.state);
        }
      })
    });

    let mutations = options.mutations || {};
    this.mutations = {};
    forEach(mutations, (propName, fn) => {
      // new Store时传进来的mutations 放到store实例上
      this.mutations[propName] = (payload) => {
        fn.call(this,this.state, payload);
      }
    });

    let actions = options.actions || {};
    this.actions = {};
    forEach(actions, (propName, fn) => {
      this.actions[propName] = (payload) => {
        fn.call(this,this, payload);
      }
    });
  }
  commit = (type, payload) => { // 找到对应的mutations执行
    console.log(this, '==this');
    this.mutations[type](payload);
  }
  dispatch = (type, payload) => {
    this.actions[type](payload);
  }
  get state() {
    return this._vm.state;
  }
}

const install = _Vue => {
  // console.log(_Vue instanceof Vue);
  // console.log('install');
  Vue = _Vue;
  // 需要给每个组件注册一个this.$store的属性
  Vue.mixin({
    beforeCreate() {
      console.log(this.$options.name);
      // 需要先判断是父组件还是子组件，如果是子，就把父的store增加给子
      if (this.$options && this.$options.store) { // 父
        this.$store = this.$options.store;
      }
      else { // 子
        this.$store = this.$parent && this.$parent.$store;
      }
    }
  })
}

export default {
  install,
  Store
}