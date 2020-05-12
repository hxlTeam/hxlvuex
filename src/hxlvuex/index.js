let Vue;
const forEach = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(key, obj[key]);
  })
}
class ModuleCollection {
  constructor(options) {
    this.register([], options);
  }
  register(path, rootModule) {
    let newModule = {
      _raw: rootModule,
      _children: {},
      state: rootModule.state
    }
    if (path.length === 0) {
      this.root = newModule;
    } else {
      let parent = path.slice(0, -1).reduce((root, current) => {
        return root._children[current];
      }, this.root);
      parent._children[path[path.length - 1]] = newModule;
    }
    if (rootModule.modules) {
      forEach(rootModule.modules, (moduleName, module) => {
        console.log(`key:${moduleName}, path:${path}`);
        this.register(path.concat(moduleName), module);
      });
    }
  }
}
// 需要递归树 将结果挂载到 getters mutations actions
const installModule = (store, state, path, rootModule) => {
  if(path.length>0) { // 是子模块 把子模块的状态放到父模块上
    // age:10,a:{x:1,c:{z:1}},b:{t:1}}

    // [a]  {age:10}
    // [a,c] {age:10,a:{x:1}}
    // [b]
    let parent = path.slice(0,-1).reduce((state,current)=>{
      return state[current]
    },state);
    Vue.set(parent,path[path.length-1],rootModule.state)
  }
  // 先处理根模块的getters属性
  let getters = rootModule._raw.getters;
  if (getters) {
    forEach(getters, (prop, fn) => {
      Object.defineProperty(store.getters, prop, {
        get: () => {
          return fn(rootModule.state);
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
    });
  }
  let actions = rootModule._raw.actions;
  if (actions) {
    forEach(actions, (prop, fn) => {
      let arr = store.actions[prop] || (store.actions[prop] = []);
      arr.push((payload) => {
        fn(store, payload);
      })
    });
  }
  forEach(rootModule._children,(prop,module)=>{
    installModule(store,state,path.concat(prop),module);
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
    this.getters = {};
    this.mutations = {};
    this.actions = {};
    /*
    let getters = options.getters || {}; // 用户传过来的getters
    this.getters = {};
    forEach(getters, (propName, fn) => {
      Object.defineProperty(this.getters, propName, {
        get: () => {
          return fn(this.state);
        }
      });

    });

    let mutations = options.mutations || {};
    this.mutations = {};
    forEach(mutations, (propName, fn) => {
      this.mutations[propName] = (payload) => {
        fn.call(this, this.state, payload);
      };
    });

    let actions = options.actions || {};
    this.actions = {};
    forEach(actions, (propName, fn) => {
      this.actions[propName] = (payload) => {
        fn.call(this, this, payload);
      }
    })
    */

    // 先优化当前用户传递来的数据
    /*
    let root = {
      _raw: rootModule,
      state:{age:10},
      _children:{
        a:{
          _raw:aModule,
          state: {x:1},
          _children:{}
        },
        a:{
          _raw:aModule,
          state: {y:2},
          _children:{}
        }
      }
    }
    */
    // 收集模块
    this.modules = new ModuleCollection(options);
    console.log(this.modules, '---');

    // 安装模块
    installModule(this, this.state, [], this.modules.root); // 当前store实例，整个应用的状态，空数组，根模块
  }
  get state() {
    return this._vm.state;
  }
  commit = (type, payload) => {
    // this.mutations[type](payload);
    this.mutations[type].forEach(fn => fn(payload));
  }
  dispatch = (type, payload) => {
    // this.actions[type](payload);
    this.actions[type].forEach(fn => fn(payload));
  }
}

const install = (_Vue) => {
  Vue = _Vue;
  // console.log('install');
  Vue.mixin({
    beforeCreate() {
      // console.log(this.$options.name);
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