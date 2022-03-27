var x = 1;
function f(
  x,
  y = function () {
    x = 3;
    console.log(x);
  }
) {
  console.log(x); // 参数没有默认值，所以：undefined
  // var x = 2
  y(); // 改变参数x = 3，且输出参数x，所以：3
  console.log(x); // 实时参数x的值，所以：3
}
f();
console.log(x); // 全局x无影响，所以：1
