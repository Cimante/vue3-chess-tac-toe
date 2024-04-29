<script lang="ts">
import { defineComponent } from "vue";
import Field from "./components/Field.vue";
import Stats from "./components/Stats.vue";

export default defineComponent({
  components: {
    Field,
    Stats,
  },
});
</script>

<template>
  <div class="App">
    <div class="container">
      <Field />
      <Stats />
    </div>
  </div>
</template>

<style lang="scss">
.App {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* margin: 0 auto; */

  .container {
    position: relative;
  }
}
</style>
