export function useMenuDragger(containerRef, data) {
  let currentComponent = null;

  const dragenter = (e) => {
    e.dataTransfer.drapEffect = "move";
  };
  const dragover = (e) => {
    e.preventDefault();
  };
  const dragleave = (e) => {
    e.dataTransfer.drapEffect = "none";
  };
  const drop = (e) => {
    let blocks = data.value.blocks;
    data.value = {
      ...data.value,
      blocks: [
        ...blocks,
        {
          top: e.offsetY,
          left: e.offsetX,
          key: currentComponent.key,
          zIndex: 1,
          alignCenter: true, //松手的时候可以居中
        },
      ],
    };
    currentComponent = null;
  };
  const dragstart = (e, component) => {
    currentComponent = component;

    // dragenter进入元素
    // dragover在目标元素中，阻止默认行为，佛则不能触发drop
    // dragleave离开元素的时候，需要增加禁用表示
    // drop松手的时候添加元素
    containerRef.value.addEventListener("dragenter", dragenter);
    containerRef.value.addEventListener("dragover", dragover);
    containerRef.value.addEventListener("dragleave", dragleave);
    containerRef.value.addEventListener("drop", drop);
    // e.dataTransfer.dropEffect = "mnove";
  };
  const dragend = (e, component) => {
    containerRef.value.removeEventListener("dragenter", dragenter);
    containerRef.value.removeEventListener("dragover", dragover);
    containerRef.value.removeEventListener("dragleave", dragleave);
    containerRef.value.removeEventListener("drop", drop);
    // e.dataTransfer.dropEffect = "mnove";
  };
  return {
    dragstart,
    dragend,
  };
}
