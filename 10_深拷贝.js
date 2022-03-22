function isObject(value) {
  const valueType = typeof value;
  return value !== null && (valueType === "object" || valueType === "function");
}

function deepClone(originValue, map = new WeakMap()) {
  if (originValue instanceof Set) {
    return new Set([...originValue]);
  }
  if (originValue instanceof Map) {
    return new Map([...originValue]);
  }
  if (typeof originValue === "symbol") {
    return Symbol(originValue);
  }
  if (typeof originValue === "function") {
    return originValue;
  }
  if (!isObject(originValue)) {
    return originValue;
  }
  const obj = Array.isArray(originValue) ? [] : {};
  if (map.has(originValue)) {
    return map.get(originValue);
  }
  for (let i in originValue) {
    obj[i] = deepClone(originValue[i], map);
  }
  return obj;
}
const obj = {
  name: "qzf",
  age: 18,
  friend: {
    name: "kobe",
    address: {
      city: "hangzhou",
    },
  },
  // 数组类型
  hobbies: ["abc", "cba", "nba"],
  // 函数类型
  foo: function (m, n) {
    console.log("foo function");
    console.log("100代码逻辑");
    return 123;
  },
  // Set/Map
  set: new Set(["aaa", "bbb", "ccc"]),
  map: new Map([
    ["aaa", "abc"],
    ["bbb", "cba"],
  ]),
};

const newObj = deepClone(obj);
console.log(newObj === obj);

obj.friend.name = "kerry";
obj.friend.address.city = "成都";
newObj.friend.address.city = "杭州";
console.log(newObj);
