var x = 1;
function f(
  x,
  y = function () {
    x = 3;
    console.log(x); // 3
  }
) {
  console.log(x); // undefined
  var x = 2;
  y(); // 3
  console.log(x); // 2
}
f();
console.log(x); // 1
