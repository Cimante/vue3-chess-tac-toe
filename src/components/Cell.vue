<script setup lang="ts">
import { PropType } from "vue";
import { States } from "../types/States";
import { useGameStore } from "../store";

const store = useGameStore();

const props = defineProps({
  pos: {
    type: Number,
    required: true,
  },
  winCell: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<States>,
    required: true,
  },
});

function cellClick() {
  if (props.type === "" && store.winState === "") {
    store.addTurn(props.pos);
  }
}
</script>

<template>
  <div class="cell" @click="cellClick" :class="{ green: winCell }">
    <span v-if="type === 'cross'">❌</span>
    <span v-if="type === 'zero'">⭕</span>
    <span v-else></span>
  </div>
</template>

<style lang="scss">
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  outline: 1px solid #bdbdbd;
  cursor: pointer;
  transition: background-color 0.15s, opacity 0.6s;

  &.last-item span {
    opacity: 0.3;
  }

  &:hover {
    background-color: rgba(#81d8d0, 0.4);
  }

  span {
    outline: none;
    font-size: 24px;
  }

  &.green {
    background-color: rgba(lightgreen, 0.5);
  }
}
</style>
