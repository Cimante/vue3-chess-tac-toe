<script setup lang="ts">
import { useGameStore } from "../store";

const store = useGameStore();
</script>

<template>
  <div class="Stats">
    <h2 class="Stats__header">Статистика побед</h2>
    <table class="Stats__table">
      <tbody>
        <tr>
          <td>❌</td>
          <td>⭕</td>
        </tr>
        <tr>
          <td>{{ store.stats.cross }}</td>
          <td>{{ store.stats.zero }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.Stats {
  position: absolute;
  left: 115%;
  top: 0%;
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 8px;

  &__table {
    width: 150px;
    border-collapse: collapse;
    margin-top: 6px;
    tbody tr td {
      width: 50%;
      text-align: center;
      padding: 4px 0;
    }
  }

  &__header {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #bdbdbd;
  }
}
</style>
