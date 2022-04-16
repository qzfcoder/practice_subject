import { defineComponent, computed, inject, ref } from "vue";
import "./editor.scss";
import EditorBlock from "./editorBlock.jsx";
import deepcopy from "deepcopy";
import { useMenuDragger } from "./useMenuDragger";
import { useFocus } from "./useFocus";
import { useBlockDrag } from "./useBlockDrag";
import { useCommand } from "./useCommand";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
    },
  },
  components: {
    EditorBlock,
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const data = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        ctx.emit("update:modelValue", deepcopy(newValue));
      },
    });
    const containerStyles = computed(() => ({
      width: data.value.container.width + "px",
      height: data.value.container.height + "px",
    }));
    const config = inject("config");
    const containerRef = ref();
    // 实现菜单拖拽功能
    const { dragstart, dragend } = useMenuDragger(containerRef, data);

    // 实现获取元素焦点
    let { focusData, blockMousedown, containerMousedown, lastSelectBlock } =
      useFocus(data, (e) => {
        console.log(focusData.value.focus);
        mousedown(e);
      });

    // 实现多选拖拽
    let { mousedown, markLine } = useBlockDrag(
      focusData,
      lastSelectBlock,
      data
    );
    const { commands } = useCommand(data);
    const button = [
      {
        label: "撤销",
        icon: "icon-back",
        handler: () => commands.redo(),
      },
      {
        label: "重做",
        icon: "icon-forward",
        handler: () => commands.undo(),
      },
    ];

    return () => (
      <div class="editor">
        <div class="editor-left">
          {/* 可以实现拖拽的 */}
          {config.componentList.map((component) => {
            return (
              <div
                class="editor-left-item"
                draggable
                onDragstart={(e) => dragstart(e, component)}
                onDragend={(e) => dragend(e, component)}
              >
                <span>{component.label}</span>
                <div>{component.preview()}</div>
              </div>
            );
          })}
        </div>
        <div class="editor-top">
          {button.map((btn, index) => {
            return (
              <div class="editor-top-button" onClick={btn.handler}>
                <i class={btn.icon}></i>
                <span class={btn.label}></span>
              </div>
            );
          })}
        </div>
        <div class="editor-right">属性菜单栏</div>
        <div class="editor-container">
          {/* 产生滚动条 */}
          <div class="editor-container-canvas">
            {/* 产生内容区域 */}
            <div
              class="editor-container-canvas_content"
              style={containerStyles.value}
              ref={containerRef}
              onMousedown={containerMousedown}
            >
              内容区域
              {data.value.blocks.map((block, index) => (
                <EditorBlock
                  class={block.focus ? "editor-block-focus" : ""}
                  onMousedown={(e) => blockMousedown(e, block, index)}
                  block={block}
                ></EditorBlock>
              ))}
              {markLine.x !== null && (
                <div class="line-x" style={{ left: markLine.x + "px" }}></div>
              )}
              {markLine.y !== null && (
                <div class="line-y" style={{ top: markLine.y + "px" }}></div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
