import fs from "fs";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import path from "path";
function createAsset(filePath) {
  // 获取文件的内容
  // const source = fs.readFileSync("./example/main.js", {
  const source = fs.readFileSync(filePath, {
    encoding: "utf8",
  });
  // 通过ast获取文件代码中所有的信息
  // console.log(source); // import foo from "./foo";  foo(); console.log("main.js");

  // 获取依赖关系
  const ast = parser.parse(source, { sourceType: "module" }); // 获取ast树
  // console.log(ast);
  const deps = [];
  traverse.default(ast, {
    ImportDeclaration({ node }) {
      // console.log(node.source.value);
      deps.push(node.source.value);
    },
  });
  return {
    source,
    deps,
  };
}
// const result = createAsset();
// console.log(result);
function createGraph() {
  const mainAsset = createAsset("./example/main.js");

  const queue = [mainAsset];
  for (const asset of queue) {
    asset.deps.forEach((relativePath) => {
      const children = createAsset(path.resolve("./example", relativePath));
      console.log(children);
      queue.push(children);
    });
  }
  return queue;
}
createGraph();
