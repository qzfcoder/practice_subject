import { defineComponent, computed, inject, ref } from "vue";
import "./editor.scss";
import EditorBlock from "./editorBlock.jsx";
import deepcopy from "deepcopy";
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
              >
                <span>{component.label}</span>
                <div>{component.preview()}</div>
              </div>
            );
          })}
        </div>
        <div class="editor-top">菜单栏</div>
        <div class="editor-right">属性菜单栏</div>
        <div class="editor-container">
          {/* 产生滚动条 */}
          <div class="editor-container-canvas">
            {/* 产生内容区域 */}
            <div
              class="editor-container-canvas_content"
              style={containerStyles.value}
              ref={containerRef}
            >
              内容区域
              {data.value.blocks.map((block) => (
                <EditorBlock block={block}></EditorBlock>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
