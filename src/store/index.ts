import { defineStore } from "pinia";
import { States } from "../types/States";
import { Stats } from "../types/Statistics";

export const useGameStore = defineStore("gamestate", {
  state: () => ({
    field: <States[]>["", "", "", "", "", "", "", "", ""],
    currentTurn: <States>"cross",
    crossTurns: Array<number>(3),
    zeroTurns: Array<number>(3),
    winState: <States>"",
    turns: Number(0),
    stats: <Stats>{
      cross: 0,
      zero: 0,
    },
  }),
  getters: {
    lastSignIndex: (state) => {
      if (state.currentTurn === "cross") {
        return state.crossTurns[0];
      }

      if (state.currentTurn === "zero") {
        return state.zeroTurns[0];
      }
    },
  },
  actions: {
    addTurn(payload: number) {
      this.field[payload] = this.currentTurn;

      if (this.currentTurn === "cross") {
        if (this.crossTurns.length === 3) {
          const delTarget = this.crossTurns[0];
          this.crossTurns.splice(0, 1);
          this.field[delTarget] = "";
        }
        this.crossTurns.push(payload);
      }

      if (this.currentTurn === "zero") {
        if (this.zeroTurns.length === 3) {
          const delTarget = this.zeroTurns[0];
          this.zeroTurns.splice(0, 1);
          this.field[delTarget] = "";
        }
        this.zeroTurns.push(payload);
      }

      this.turns++;
      this.winConditionCheck();
      this.currentTurn = this.currentTurn === "cross" ? "zero" : "cross";
    },
    winConditionCheck() {
      const res = <States>"";
      const condition = [
        [this.field[0], this.field[1], this.field[2]],
        [this.field[3], this.field[4], this.field[5]],
        [this.field[6], this.field[7], this.field[8]],
        [this.field[0], this.field[3], this.field[6]],
        [this.field[1], this.field[4], this.field[7]],
        [this.field[2], this.field[5], this.field[8]],
        [this.field[0], this.field[4], this.field[8]],
        [this.field[2], this.field[4], this.field[6]],
      ].reduce((acc, curr) => {
        if (
          curr.every(
            (val, _, arr) => val === arr[0] && val !== "" && arr[0] !== ""
          )
        ) {
          acc = curr[0];
        }

        return acc;
      }, res);

      if (condition) this.addStat(condition);
    },
    addStat(payload: States) {
      if (payload === "cross") {
        this.winState = "cross";
        this.stats.cross++;
      }
      if (payload === "zero") {
        this.winState = "zero";
        this.stats.zero++;
      }
    },
    restart() {
      this.field = ["", "", "", "", "", "", "", "", ""];
      this.currentTurn = <States>"cross";
      this.crossTurns = Array<number>(3);
      this.zeroTurns = Array<number>(3);
      this.winState = "";
      this.turns = 0;
    },
  },
});
