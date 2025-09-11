import type { ActiveHighlight } from "./Cube";

export interface SortGridProps {
  input: number[];
  count: number[];
  bucket: number[];           // 10 slots for digits 0–9
  output: (number | null)[];
  active?: ActiveHighlight[];
  showLabels?: boolean;
}