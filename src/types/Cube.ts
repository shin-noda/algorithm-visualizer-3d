// src/types/Cube.ts
export type RowKind = "input" | "count" | "output" | "bucket";

export interface ActiveHighlight {
  row: RowKind;
  index: number;
  digitIndex?: 0 | 1 | 2; // for radix sort
  isMiddleCube?: boolean; // for radix sort
  sourceRow?: RowKind; // for counting sort highlighting
}