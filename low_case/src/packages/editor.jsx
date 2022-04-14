import { defineComponent, computed } from "vue";
import "./editor.scss";
import EditorBlock from "./editorBlock.jsx";
export default defineComponent({
  props: {
    modelValue: {
      type: Object,
    },
  },
  components: {
    EditorBlock,
  },
  setup(props) {
    const data = computed({
      get() {
        return props.modelValue;
      },
    });
    console.log(data);
    const containerStyles = computed(() => ({
      width: data.value.container.width + "px",
      height: data.value.container.height + "px",
    }));
    console.log(containerStyles.value);
    return () => (
      <div class="editor">
        <div class="editor-left">左侧物料区</div>
        <div class="editor-top">菜单栏</div>
        <div class="editor-right">属性菜单栏</div>
        <div class="editor-container">
          {/* 产生滚动条 */}
          <div class="editor-container-canvas">
            {/* 产生内容区域 */}
            <div
              class="editor-container-canvas_content"
              style={containerStyles.value}
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
