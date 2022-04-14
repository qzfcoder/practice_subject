import { computed } from "vue";

export function useFocus(data, callback) {
  const clearBlockFocus = () => {
    data.value.blocks.forEach((block) => (block.focus = false));
  };
  const blockMousedown = (e, block) => {
    e.preventDefault();
    e.stopPropagation();
    // block我们规划一个属性，focus，获取焦点后，focus变为true
    if (e.shiftKey) {
      block.focus = !block.focus;
    } else {
      if (!block.focus) {
        clearBlockFocus();
        block.focus = true; // 要清空其他的focus属性
      } else {
        block.focus = false;
      }
    }
    callback(e);
  };
  const containerMousedown = () => {
    clearBlockFocus();
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
  };
}
