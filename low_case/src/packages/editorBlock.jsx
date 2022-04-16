import { defineComponent, computed, inject, onMounted, ref } from "vue";
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
    const blockRef = ref();
    onMounted(() => {
      // console.log(blockRef.value);
      let { offsetWidth, offsetHeight } = blockRef.value;
      if (props.block.alignCenter) {
        props.block.left = props.block.left - offsetWidth / 2;
        props.block.top = props.block.left - offsetHeight / 2;
        props.block.alignCenter = false;
      }
      props.block.width = offsetWidth;
      props.block.height = offsetHeight;
    });
    // console.log(config, "12");
    return () => {
      const component = config.componentMap[props.block.key];
      const RenderComponent = component.render(); // 获取render函数
      return (
        <div class="editor-block" ref={blockRef} style={blockStyles.value}>
          {RenderComponent}
        </div>
      );
    };
  },
});
