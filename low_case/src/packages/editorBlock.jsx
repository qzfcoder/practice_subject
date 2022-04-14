import { defineComponent, computed, inject } from "vue";
import "./editor.scss";
export default defineComponent({
  props: {
    block: {
      type: Object,
    },
  },
  setup(props) {
    const blockStyles = computed(() => ({
      top: `${props.block.top}px`,
      left: `${props.block.left}px`,
      zIndex: `${props.block.zIndex}`,
    }));
    const config = inject("config");
    console.log(config, "12");
    return () => {
      const component = config.componentMap[props.block.key];
      const RenderComponent = component.render(); // 获取render函数
      return (
        <div class="editor-block" style={blockStyles.value}>
          {RenderComponent}
        </div>
      );
    };
  },
});
