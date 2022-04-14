// 列表区域：可以显示所有的物料
// key对应的组件的映射关系

function createEditorConfig() {
  const componentList = [];
  const componentMap = {};

  return {
    componentList,
    componentMap,
    register: (component) => {
      componentList.push(component);
      componentMap[component.key] = component;
    },
  };
}

export let registerConfig = createEditorConfig();
// console.log(registerConfig)
registerConfig.register({
  label: "文本",
  preview: () => "预览的文本",
  render: () => "渲染文本",
  key: "text",
});

registerConfig.register({
  label: "按钮",
  preview: () => <el-button>预览的按钮</el-button>,
  render: () => <el-button>渲染的按钮</el-button>,
  key: "button",
});
registerConfig.register({
  label: "输入框",
  preview: () => <el-input placeholder="预览的输入框"></el-input>,
  render: () => <el-input placeholder="渲染的输入框"></el-input>,
  key: "input",
});
