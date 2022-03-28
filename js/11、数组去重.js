let arr = [1, 2, 3, 3, 4, 4];

let newArr1 = new Set([...arr]);
console.log(newArr1);

let newArr2 = [];
for (let i = 0; i < arr.length; i++) {
  if (newArr2.indexOf(arr[i]) === -1) {
    newArr2.push(arr[i]);
  }
}
console.log(newArr2);