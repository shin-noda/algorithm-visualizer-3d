export interface SortingSceneProps {
  arr: number[];
  swapping?: number[];
  comparing?: number[]; // indices currently being compared
  shifting?: number[];  // indices currently being shifted
  inserting?: number[];
  pivots?: number[];   // indices of current pivot(s)
  merging?: number[];
  highlights?: number[];  // optional
  maxBarHeight?: number;
  barWidth?: number;
}