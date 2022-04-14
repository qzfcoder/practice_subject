<template>
  <div id="app">
    <editor v-model="state"></editor>
  </div>
</template>
<script>
import data from "./data.json";
import { ref, provide } from "vue";
import Editor from "./packages/editor.jsx";
import { registerConfig as config } from "./utils/editor-config.jsx";
export default {
  components: {
    Editor,
  },
  setup() {
    const state = ref(data);
    provide("config", config);
    return {
      state,
    };
  },
};
</script>
<style lang="scss" scoped>
#app {
  position: fixed;
  top: 20px;
  bottom: 20px;
  right: 20px;
  left: 20px;
}
</style>
