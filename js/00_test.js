// const arr = [
//   {
//     name: "小明",
//     id: 1,
//     pid: 0,
//   },
//   {
//     name: "小花",
//     id: 11,
//     pid: 1,
//   },
//   {
//     name: "小华",
//     id: 111,
//     pid: 11,
//   },
//   {
//     name: "小李",
//     id: 112,
//     pid: 11,
//   },
//   {
//     name: "小红",
//     id: 12,
//     pid: 1,
//   },
//   {
//     name: "111",
//     id: 112,
//     pid: 12,
//   },
//   {
//     name: "小王",
//     id: 2,
//     pid: 0,
//   },
//   {
//     name: "小林",
//     id: 21,
//     pid: 2,
//   },
//   {
//     name: "小李",
//     id: 22,
//     pid: 2,
//   },
// ];

// const arrToTree = (arr, id) => {
//   let result = [];
//   arr.forEach((item) => {
//     if (item.pid === id) {
//       const Children = arrToTree(arr, item.id);
//       if (Children.length > 0) {
//         item.children = Children;
//       }
//       result.push(item);
//     }
//   });
//   return result;
// };

// console.log(arrToTree(arr, 0));

// var arr1 = [1, 2, 3, 4, 5];
// var arr2 = [3, 5, 7, 9];

// const newArr = arr1.filter((item) => {
//   return arr2.indexOf(item);
// });

// console.log(newArr);

// function Currying(fn) {
//   return function curried(...args) {
//     if (args.length >= fn.length) {
//       fn.apply(this, args);
//     } else {
//       return function (...args2) {
//         return curried.apply(this, [...args, ...args2]);
//       };
//     }
//   };
// }

// const add = Currying((num1, num2, num3) => {
//   console.log(num1, num2, num3, num1 + num2 + num3);
// });
// console.log(add(1, 2)(5));

// function debounce(fn, delay, immediate) {
//   let timer;
//   let isFlag = false;
//   return function (...args) {
//     if (immediate && !isFlag) {
//       fn.apply(this, args);
//       isFlag = true;
//     }
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn.apply(this, args);
//       isFlag = true;
//     }, delay);
//   };
// }

// function throttle(fn, interval, options={leading:true, trailing: false}){
//   let {leading, trailing} = options
//   let timer;
//   let lastTime = 0
//   return function(...args) {
//     let nowTime = new Date().getTime()
//     if(lastTime == 0 && !leading) lastTime = nowTime
//     let remainTime = interval - (nowTime - lastTime)
//     if(remainTime <= 0) {
//       clearTimeout(timer)
//       timer = null
//       fn.apply(this, args)
//       return
//     }
//     if(!trailing && timer) {
//       timer = setTimeout(() => {
//         timer = nullF
//         lastTime = !leading ? 0 : new Date().getTime()
//         fn.apply(this, args)
//       }, remainTime);
//     }
//   }
// }

// class eventBus {
//   constructor() {
//     this.eventBus = {};
//   }
//   on(eventName, eventCallback, thisArg) {
//     let handle = this.eventBus[eventName];
//     if (!handle) {
//       handle = [];
//       this.eventBus[eventName] = handle;
//     }
//     handle.push({ eventCallback, thisArg });
//   }
//   off(eventName, eventCallback) {
//     let handle = this.eventBus[eventName];
//     if (!handle) {
//       return;
//     }
//     let newHandle = [...handle];
//     for (let i = 0; i < newHandle.length; i++) {
//       let new_hh = newHandle[i];
//       if (new_hh.eventCallback === eventCallback) {
//         let index = new_hh.indexOf(new_hh);
//         handle.splice(index, 1);
//       }
//     }
//   }
//   emit(eventName, ...payLoad) {
//     let handle = this.eventBus[eventName];
//     if (!handle) {
//       return;
//     }
//     handle.forEach((item) => {
//       item.eventCallback.apply(item.thisArg, payLoad);
//     });
//   }
// }

// let status_pending = "pending";
// let status_resolve = "resolve";
// let status_reject = "reject";

// class myPromise {
//   constructor(executor) {
//     this.status = status_pending;
//     this.value;
//     this.reason;
//     this.onfulfilledFns = [];
//     this.onrejectedFns = [];
//     const resolve = (value) => {
//       if (this.status === status_pending) {
//         queueMicrotask(() => {
//           this.status = status_resolve;
//           this.value = value;
//           this.onfulfilledFns.forEach((fn) => {
//             fn();
//           });
//         });
//       }
//     };
//     const reject = (reason) => {
//       if (this.status === status_pending) {
//         queueMicrotask(() => {
//           this.status = status_reject;
//           this.reason = reason;
//           this.onrejectedFns.forEach((fn) => {
//             fn();
//           });
//         });
//       }
//     };
//     executor(resolve, reject);
//   }
//   then(onfulfilled, onrejected) {
//     return new myPromise((resolve, reject) => {
//       if (this.status === status_pending) {
//         this.onfulfilledFns.push(() => {
//           const result = onfulfilled(this.value);
//           try {
//             resolve(result);
//           } catch {
//             reject(result);
//           }
//         });
//         this.onrejectedFns.push(() => {
//           const result = onrejected(this.reason);
//           try {
//             resolve(result);
//           } catch {
//             reject(result);
//           }
//         });
//       }
//       if (this.status == status_resolve) {
//         const result = onfulfilled(this.value);
//         try {
//           resolve(result);
//         } catch {
//           reject(result);
//         }
//       }
//       if (this.status == status_reject) {
//         const result = onrejected(this.reason);
//         try {
//           resolve(result);
//         } catch {
//           reject(result);
//         }
//       }
//     });
//   }
// }

// let activeReactiveFn = null;

// class Depend {
//   constructor() {
//     this.reactiveFns = new Set();
//   }
//   depend() {
//     if (activeReactiveFn) {
//       this.reactiveFns.add(activeReactiveFn);
//     }
//   }
//   notify() {
//     this.reactiveFns.forEach((fn) => {
//       fn();
//     });
//   }
// }

// function watchFn(fn) {
//   activeReactiveFn = fn;
//   fn();
//   activeReactiveFn = null;
// }

// let targetMap = new WeakMap();

// function getDepend(target, key) {
//   let map = targetMap.get(target);
//   if (!map) {
//     map = new Map();
//     targetMap.set(target, map);
//   }
//   let depend = map.get(key);
//   if (!depend) {
//     depend = new Depend();
//     map.set(key, depend);
//   }
//   return depend;
// }

// // function reactive(obj) {
// //   return new Proxy(obj, {
// //     get: function (target, key, receiver) {
// //       let depend = getDepend(target, key);
// //       depend.depend();
// //       return Reflect.get(target, key, receiver);
// //     },
// //     set: function (target, key, newValue, receiver) {
// //       Reflect.set(target, key, newValue, receiver);
// //       let depend = getDepend(target, key);
// //       depend.notify();
// //     },
// //   });
// // }

// function reactive(obj) {
//   Object.keys(obj).forEach(key => {
//     let value = obj[key]
//     Object.defineProperty(obj, key, {
//       get: function() {
//         const depend = getDepend(obj, key)
//         depend.depend()
//         return value
//       },
//       set: function(newValue) {
//         value = newValue
//         const depend = getDepend(obj, key)
//         depend.notify()
//       }
//     })
//   })
//   return obj
// }
// const infoProxy = reactive({
//   address: "广州市",
//   height: 1.88,
// });

// watchFn(() => {
//   console.log(infoProxy.address);
// });

// infoProxy.address = "北京市";

// function test(fn) {
//   let generator = fn();
//   function exec(res) {
//     let result = generator.next(res);
//     if (result.done) {
//       return result.value;
//     } else {
//       result.value.then((item) => {
//         exec(item);
//       });
//     }
//   }
//   exec();
// }

// // 请求函数
// function requestData(url) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(url);
//     }, 1000);
//   });
// }

// function* getData() {
//   let res = yield requestData("a");
//   let res2 = yield requestData(res + "b");
//   let res3 = yield requestData(res2 + "c");
//   console.log(res3);
//   return res3;
// }
// console.log(test(getData));
