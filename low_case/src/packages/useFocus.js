import { computed, ref } from "vue";

export function useFocus(data, callback) {
  const selectIndex = ref(-1); // 最后一个被点击的,-1没有任何一个被选中
  const lastSelectBlock = computed(() => {
    return data.value.blocks[selectIndex.value];
  });
  const clearBlockFocus = () => {
    data.value.blocks.forEach((block) => (block.focus = false));
  };
  const blockMousedown = (e, block, index) => {
    e.preventDefault();
    e.stopPropagation();
    // block上我们规划一个属性 focus 获取焦点后就将focus变为true
    if (e.shiftKey) {
      if (focusData.value.focus.length <= 1) {
        block.focus = true; // 当前只有一个节点被选中时 摁住shift键也不会切换focus状态
      } else {
        block.focus = !block.focus;
      }
    } else {
      if (!block.focus) {
        clearBlockFocus();
        block.focus = true; // 要清空其他人foucs属性
      } // 当自己已经被选中了，在次点击时还是选中状态
    }
    selectIndex.value = index;
    callback(e);
  };
  const containerMousedown = () => {
    clearBlockFocus();
    selectIndex.value = -1;
  };
  const focusData = computed(() => {
    // 获取选中的和没选中的
    let focus = [];
    let unfocused = [];
    data.value.blocks.forEach((block) =>
      (block.focus ? focus : unfocused).push(block)
    );
    return {
      focus,
      unfocused,
    };
  });

  return {
    focusData,
    blockMousedown,
    containerMousedown,
    lastSelectBlock,
  };
}
