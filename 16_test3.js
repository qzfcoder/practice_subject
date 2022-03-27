var x = 1;
function f(
  xx,
  y = function () {
    x = 3;
    console.log(x);
  }
) {
  console.log(x); // var变量提升但未赋值，所以：undefined
  var x = 2;
  y(); // x = 3改变的是全局x，且输出全局x，所以：3
  console.log(x); // x = 3改变的是全局x，与局部x无关，所以：2
}
f();
console.log(x); // 全局x被y函数改变了，所以：3
