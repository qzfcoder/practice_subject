let activeReactiveFn = null;

class Depend {
  constructor() {
    this.reactiveFn = new Set();
  }
  depend() {
    if (activeReactiveFn) {
      this.reactiveFn.add(activeReactiveFn);
    }
  }
  notify() {
    this.reactiveFn.forEach((fn) => {
      fn();
    });
  }
}

function watchFn(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

let targetMap = new WeakMap();

function getDepend(target, key) {
  let map = targetMap.get(target);
  if (!map) {
    map = new Map();
    targetMap.set(target, map);
  }
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}

function reactive(obj) {
  return new Proxy(obj, {
    get: function (target, key, receiver) {
      let depend = getDepend(target, key);
      depend.depend();
      return Reflect.get(target, key, receiver);
    },
    set: function (target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver);
      let depend = getDepend(target, key);
      depend.notify();
    },
  });
}
/*
  vue2响应式原理，通过defineProperty来对传入的数据进行绑定劫持 
function reactive(obj) {
  // {name: "qqq", age: 18}
  // ES6之前, 使用Object.defineProperty
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get: function() {
        const depend = getDepend(obj, key)
        depend.depend()
        return value
      },
      set: function(newValue) {
        value = newValue
        const depend = getDepend(obj, key)
        depend.notify()
      }
    })
  })
  return obj
}
*/
const infoProxy = reactive({
  address: "广州市",
  height: 1.88,
});

watchFn(() => {
  console.log(infoProxy.address);
});

infoProxy.address = "北京市";
