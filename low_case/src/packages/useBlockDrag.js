import { reactive } from "vue";
export function useBlockDrag(focusData, lastSelectBlock, data) {
  let dragState = {
    startX: 0,
    startY: 0,
  };
  let markLine = reactive({
    x: null,
    y: null,
  });

  const mousedown = (e) => {
    const { width: BWidth, height: BHeight } = lastSelectBlock.value;
    dragState = {
      startX: e.clientX,
      startY: e.clientY,
      // 拖拽元素初始位置
      startLeft: lastSelectBlock.value.left,
      startTop: lastSelectBlock.value.top,
      startPos: focusData.value.focus.map(({ top, left }) => ({ top, left })),
      lines: (() => {
        const { unfocused } = focusData.value; // 获取没选中的位置

        let lines = {
          // 计算横线的位置用y来处理
          x: [],
          y: [],
        };
        [
          ...unfocused,
          {
            top: 0,
            left: 0,
            width: data.value.container.width,
            height: data.value.container.height,
          },
        ].forEach((block) => {
          const {
            top: ATop,
            left: ALeft,
            width: AWidth,
            height: AHeight,
          } = block;
          // 当此元素拖拽到和A元素top一致的时候，要显示这根辅助线，辅助线的位置就是ATop
          lines.y.push({ showTop: ATop, top: ATop });
          lines.y.push({ showTop: ATop, top: ATop - BHeight }); // 顶对底
          lines.y.push({
            showTop: ATop + AHeight / 2,
            top: ATop + AHeight / 2 - BHeight / 2,
          }); // 中对中
          lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight }); // 底对顶
          lines.y.push({
            showTop: ATop + AHeight,
            top: ATop + AHeight - BHeight,
          }); // 底对底

          lines.x.push({ showLeft: ALeft, left: ALeft }); // 左对左边
          lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth }); // 右边对左边
          lines.x.push({
            showLeft: ALeft + AWidth / 2,
            left: ALeft + AWidth / 2 - BWidth / 2,
          });
          lines.x.push({
            showLeft: ALeft + AWidth,
            left: ALeft + AWidth - BWidth,
          });
          lines.x.push({ showLeft: ALeft, left: ALeft - BWidth }); // 左对右
        });
        return lines;
      })(),
    };
    const mousemove = (e) => {
      let { clientX: moveX, clientY: moveY } = e;
      // 计算当前元素最新的left和top，去线里面找显示线，
      // 鼠标移动前-鼠标移动后+left
      let left = moveX - dragState.startX + dragState.startLeft;
      let top = moveY - dragState.startY + dragState.startTop;
      // 先计算横线，距离参照物的元素，还有5px的时候显示
      let y = null;
      let x = null;
      for (let i = 0; i < dragState.lines.y.length; i++) {
        const { top: t, showTop: s } = dragState.lines.y[i]; // 获取每一根线
        if (Math.abs(t - top) < 5) {
          // 如果小于五说明接近了
          y = s; // 线要现实的位置
          moveY = dragState.startY - dragState.startTop + t; // 容器距离顶部的距离 + 目标的高度 就是最新的moveY
          // 实现快速和这个元素贴在一起
          break; // 找到一根线后就跳出循环
        }
      }
      for (let i = 0; i < dragState.lines.x.length; i++) {
        const { left: t, showLeft: s } = dragState.lines.x[i];
        if (Math.abs(t - left) <= 5) {
          // 说明接近了
          x = s;
          moveX = dragState.startX - dragState.startLeft + t; // 容器距离顶部的距离加上目标高度
          // 实现快速添加
          break;
        }
      }
      markLine.x = x;
      markLine.y = y;
      // console.log(markLine);
      let durX = moveX - dragState.startX;
      let durY = moveY - dragState.startY;
      focusData.value.focus.map((block, idx) => {
        (block.top = dragState.startPos[idx].top + durY),
          (block.left = dragState.startPos[idx].left + durX);
      });
    };
    const mouseup = (e) => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
      markLine.x = null;
      markLine.y = null;
    };
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };
  return {
    mousedown,
    markLine,
  };
}
