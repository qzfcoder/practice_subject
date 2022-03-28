var arr1 = [1, 2, 3, 4, 5];
var arr2 = [3, 5, 7, 9];

const newArr = arr1.filter((item) => arr2.indexOf(item) === -1);
console.log(newArr);
