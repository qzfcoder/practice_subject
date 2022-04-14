let status_pending = "pending";
let status_resolve = "resolve";
let status_reject = "resolve";

class myPromise {
  constructor(executor) {
    this.status = status_pending;
    this.value;
    this.reason;
    this.onfulfilledFns = [];
    this.onrejectedFns = [];
    const resolve = (value) => {
      if (this.status === status_pending) {
        queueMicrotask(() => {
          this.status = status_resolve;
          this.value = value;
          this.onfulfilledFns.forEach((fn) => {
            fn();
          });
        });
      }
    };
    const reject = (reason) => {
      if (this.status === status_pending) {
        queueMicrotask(() => {
          this.status = status_reject;
          this.reason = reason;
          this.onfulfilledFns.forEach((fn) => {
            fn();
          });
        });
      }
    };
    executor(resolve, reject);
  }
  then(onfulfilled, onrejected) {
    return new myPromise((resolve, reject) => {
      if (this.status === status_pending) {
        this.onfulfilledFns.push(() => {
          let result = onfulfilled(this.value);
          try {
            resolve(result);
          } catch {
            reject(result);
          }
        });
        this.onrejectedFns.push(() => {
          let result = onrejected(this.reason);
          try {
            resolve(result);
          } catch {
            reject(result);
          }
        });
      }
      if (this.status === status_resolve) {
        let result = onfulfilled(this.value);
        try {
          resolve(result);
        } catch {
          reject(result);
        }
      }
      if (this.status === status_reject) {
        let result = onrejected(this.reason);
        try {
          resolve(result);
        } catch {
          reject(result);
        }
      }
    });
  }
}
