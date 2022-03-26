class eventBus {
  constructor() {
    this.eventBus = {};
  }
  on(eventName, eventCallback, thisArg) {
    let handle = this.eventBus[eventName];
    if (!handle) {
      handle = [];
      this.eventBus[eventName] = handle;
    }
    handle.push({ eventCallback, thisArg });
  }
  off(eventName, eventCallback) {
    let handle = this.eventBus[eventName];
    if (!handle) {
      return;
    }
    let newHandle = [...handle];
    for (let i = 0; i < newHandle; i++) {
      let test = newHandle[i];
      if (test.eventCallback === eventCallback) {
        let index = handle.indexOf(test);
        handle.splice(index, 1);
      }
    }
  }
  emit(eventName, ...payLoad) {
    let handle = this.eventBus[eventName];
    if (!handle) {
      return;
    }
    handle.forEach((item) => {
      item.eventCallback.apply(item.thisArg, payLoad);
    });
  }
}

// constructor() {
//   this.eventBus = {};
// }
// on(eventName, eventCallback, thisArg) {
//   let handle = this.eventBus[eventName];
//   if (!handle) {
//     handle = [];
//     this.eventBus[eventName] = handle;
//   }
//   handle.push({ eventCallback, thisArg });
// }
// off(eventName, eventCallback) {
//   let handle = this.eventBus[eventName];
//   if (!handle) {
//     return;
//   }
//   let newHandle = [...handle];
//   for (let i = 0; i < newHandle.length; i++) {
//     let gg = newHandle[i];
//     if (gg.eventCallback === eventCallback) {
//       const index = handle.indexOf(gg);
//       handle.splice(index, 1);
//     }
//   }
// }
// emit(eventName, ...payload) {
//   let handle = this.eventBus[eventName];
//   if (!handle) {
//     return;
//   }
//   handle.forEach((item) => {
//     item.eventCallback.apply(item.thisArg, payload);
//   });
// }
