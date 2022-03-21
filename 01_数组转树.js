const arr = [
  {
    name: "小明",
    id: 1,
    pid: 0,
  },
  {
    name: "小花",
    id: 11,
    pid: 1,
  },
  {
    name: "小华",
    id: 111,
    pid: 11,
  },
  {
    name: "小李",
    id: 112,
    pid: 11,
  },
  {
    name: "小红",
    id: 12,
    pid: 1,
  },
  {
    name: "111",
    id: 112,
    pid: 12,
  },
  {
    name: "小王",
    id: 2,
    pid: 0,
  },
  {
    name: "小林",
    id: 21,
    pid: 2,
  },
  {
    name: "小李",
    id: 22,
    pid: 2,
  },
];

function arrToTree(arr, id) {
  let res = [];
  arr.forEach((item) => {
    if (item.pid === id) {
      let children = arrToTree(arr, item.id);
      if (children) {
        item.children = children;
      }
      res.push(item);
    }
  });
  return res;
}

console.log(arrToTree(arr, 0));
