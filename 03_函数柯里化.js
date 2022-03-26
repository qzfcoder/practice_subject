function Currying(fn) {
  return function curried(...args) {
    console.log("args", args.length);
    console.log(fn.length);
    if (args.length > fn.length) {
      fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]);
      };
    }
  };
}

const add = Currying((num1, num2, num3) => {
  console.log(num1, num2, num3, num1 + num2 + num3);
});
console.log(add(1, 2)(5));
