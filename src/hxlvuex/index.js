let Vue = null;
const forEach = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(key, obj[key]);
  })
}
const instatllModule = (store, state, path, rootModule) => {

  if (path.length > 0) {
    let parent = path.slice(0, -1).reduce((state, current) => {
      return state[current]
    }, state);
    Vue.set(parent,path[path.length-1],rootModule.state);
  }

  let getters = rootModule._raw.getters;
  if (getters) {
    forEach(getters, (prop, fn) => {
      Object.defineProperty(store.getters, prop, {
        get: () => {
          return fn.call(this, rootModule.state)
        }
      })
    })
  }

  let mutations = rootModule._raw.mutations;
  if (mutations) {
    forEach(mutations, (prop, fn) => {
      let arr = store.mutations[prop] || (store.mutations[prop] = []);
      arr.push((payload) => {
        fn(rootModule.state, payload);
      })
    })
  }
  
  let actions = rootModule._raw.actions;
  if (actions) {
    forEach(actions, (prop, fn) => {
      let arr = store.actions[prop] || (store.actions[prop] = []);
      arr.push((payload) => {
        fn(store, payload);
      })
    })
  }

  forEach(rootModule._children, (prop, module) => {
    instatllModule(store, state, path.concat(prop), module)
  })
}
class moduleColltions {
  constructor(options) {
    this.register([], options);
  }
  register(path, rootModule) {
    let newModule = {
      _raw: rootModule,
      state: rootModule.state,
      _children: {}
    }
    if (path.length === 0) {
      this.root = newModule;
    } else {
      let parent = path.slice(0, -1).reduce((root, current) => {
        return root._children[current];
      }, this.root)
      parent._children[path[path.length - 1]] = newModule;
    }
    if (rootModule.modules) {
      forEach(rootModule.modules, (prop, module) => {
        this.register(path.concat(prop), module);
      })
    }
  }
}
class Store {
  constructor(options) {
    this._vn = new Vue({
      data: {
        state: options.state
      }
    });

    this.getters = {};
    this.mutations = {};
    this.actions = {};
    /*
    const getters = options.getters || {};
    this.getters = {};
    forEach(getters, (prop, fn) => {
      Object.defineProperty(this.getters, prop, {
        get: () => {
          return fn.call(this, this.state);
        }
      });
    })

    const mutations = options.mutations || {};
    this.mutations = {};
    forEach(mutations, (prop, fn) => {
      this.mutations[prop] = (payload) => {
        fn.call(this, this.state, payload);
      }
    })

    const actions = options.actions || {};
    this.actions = {};
    forEach(actions, (prop, fn) => {
      this.actions[prop] = (payload) => {
        fn.call(this, this, payload)
      }
    })
    */
    this.modules = new moduleColltions(options);
    console.log(this.modules, '==modules');
    instatllModule(this, this.state, [], this.modules.root);
  }
  get state() {
    return this._vn.state;
  }
  commit = (type, payload) => {
    this.mutations[type].forEach(fn => fn(payload));
  }
  dispatch = (type, payload) => {
    this.actions[type].forEach(fn => fn(payload));
  }
}

const install = (_Vue) => {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store;
      }
      else {
        this.$store = this.$parent && this.$parent.$store;
      }

    }
  })
};

export default {
  install,
  Store
}