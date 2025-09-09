// src/types/Step.ts
export type Step = {
  type: "comparison" | "shift" | "insert" | "swap" | "pivot" | "merge";
  indices: number[];
  array?: number[]; // optional if some pages don't store array state
};