let arr = [1, 2, [3, [4, 5]]];

// 方法1：使用flat
console.log(arr.flat(2));
// 方法2： 递归
function myFlat(arr) {
  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result.push(...myFlat(item));
    } else {
      result.push(item);
    }
  });
  return result;
}

console.log(myFlat(arr));
