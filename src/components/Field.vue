<script setup lang="ts">
import Cell from "./Cell.vue";
import { defineComponent } from "vue";
import { useGameStore } from "../store";

const store = useGameStore();

const createTurn = (cell: number) => {
  store.addTurn(cell);
};

defineComponent({
  components: {
    Cell,
  },
});
</script>

<template>
  <div class="currentTurn" :class="{ win: store.winState !== '' }">
    <span
      >{{ store.winState ? "Победа" : "Ход" }}
      {{
        (store.winState || store.currentTurn) === "cross" ? "❌" : "⭕"
      }}</span
    >
  </div>
  <div class="Field" :class="{ win: store.winState }">
    <Cell
      v-for="(item, idx) in store.field"
      :key="idx"
      :pos="idx"
      :type="item"
      :class="{ 'last-item': store.lastSignIndex === idx }"
      @add-turn="createTurn"
    />
    <div class="controls">
      <span>Ходов: {{ store.turns }}</span>
      <button
        class="restart"
        @click="store.restart"
        :disabled="store.winState === ''"
      >
        Рестарт
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.Field {
  width: 180px;
  height: 180px;
  border: 2px solid #bdbdbd;
  border-radius: 10px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  user-select: none;

  &.win .cell {
    pointer-events: none;
  }

  .controls {
    position: absolute;
    top: 105%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .restart:not([disabled]) {
      cursor: pointer;
    }

    .restart[disabled] {
      cursor: not-allowed;
    }
  }
}

.currentTurn {
  position: absolute;
  bottom: 105%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 32px;
  background-color: #e5e5e5;
  border-radius: 8px;
  text-align: center;
  transition: background-color 0.6s;

  &.win {
    background-color: rgba(lightgreen, 0.5);
  }
}
</style>
