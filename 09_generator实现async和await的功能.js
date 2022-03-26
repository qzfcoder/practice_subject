function test(gnFn) {
  const generator = gnFn();
  function exec(res) {
    const result = generator.next(res);
    if (result.done) {
      return result.value;
    }
    result.value.then((res) => {
      exec(res);
    });
  }
  exec();
}

// function test(fn) {
//   let generator = fn();
//   function exec(res) {
//     const result = generator.next(res);
//     if (result.done) {
//       return result.value;
//     }
//     result.value.then((res) => {
//       exec(res);
//     });
//   }
//   exec();
// }

// 请求函数
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, 1000);
  });
}

function* getData() {
  let res = yield requestData("a");
  let res2 = yield requestData(res + "b");
  let res3 = yield requestData(res2 + "c");
  console.log(res3);
  return res3;
}
console.log(test(getData));
