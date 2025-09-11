export interface SortingSceneProps {
  arr: number[];
  swapping?: number[];
  comparing?: number[]; // indices currently being compared
  shifting?: number[];  // indices currently being shifted
  inserting?: number[];
  heldValue?: number | null,
  heldIndex?: number | null,
  pivots?: number[];   // indices of current pivot(s)
  merging?: number[];
  highlights?: number[];  // optional
  maxBarHeight?: number;
  barWidth?: number;
}