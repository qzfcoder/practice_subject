function Currying(fn) {
  function curried(...args) {
    if (args.length >= fn.length) {
      fn.apply(this, args);
    } else {
      return function (...arg2) {
        return curried.apply(this, [...args, ...arg2]);
      };
    }
  }
  return curried;
}

const add = Currying((num1, num2, num3) => {
  console.log(num1, num2, num3, num1 + num2 + num3);
});
console.log(add(1, 2)(5));
