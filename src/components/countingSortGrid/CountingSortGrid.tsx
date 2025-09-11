// src/components/countingSortGrid/CountingSortGrid.tsx
import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// components
import CubeRow from "../cubeRow/CubeRow";

type RowKind = "input" | "count" | "output";

interface CountingSortGridProps {
  input: number[];
  count: number[];
  output: (number | null)[];
  active?: { row: RowKind; index: number } | null;
  showLabels?: boolean;
}

const ROW_GAP = -1.8;
const DEFAULT_SLOTS = 10;

const CountingSortGrid = ({
  input,
  count,
  output,
  active = null,
  showLabels = true,
}: CountingSortGridProps) => {
  const inputRow = useMemo(() => {
    const arr: (number | null)[] = input.slice(0, DEFAULT_SLOTS);
    while (arr.length < DEFAULT_SLOTS) arr.push(null);
    return arr;
  }, [input]);

  const maxValue = useMemo(() => Math.max(...input, 0), [input]);

  const countRow = useMemo(() => {
    // The count row should have max(input) + 1 slots
    const arr: (number | null)[] = new Array(maxValue + 1).fill(0).map((_, i) => count[i] ?? 0);
    return arr;
  }, [count, maxValue]);

  const outputRow = useMemo(() => {
    const arr: (number | null)[] = output.slice(0, DEFAULT_SLOTS);
    while (arr.length < DEFAULT_SLOTS) arr.push(null);
    return arr;
  }, [output]);

  const activeMap = useMemo(() => {
    return {
      input: active?.row === "input" ? active.index : null,
      count: active?.row === "count" ? active.index : null,
      output: active?.row === "output" ? active.index : null,
    } as Record<RowKind, number | null>;
  }, [active]);

  return (
    <div style={{ width: "100%", height: "450px" }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={0.6} />
        <group position={[0, 1.2, 0]}>
          <CubeRow
            values={inputRow}
            y={0}
            kind="input"
            activeIndex={activeMap.input}
            showLabels={showLabels}
          />

          <CubeRow
            values={countRow}
            y={ROW_GAP}
            kind="count"
            activeIndex={activeMap.count}
            showLabels={showLabels}
          />
          
          <CubeRow
            values={outputRow}
            y={ROW_GAP * 2}
            kind="output"
            activeIndex={activeMap.output}
            showLabels={showLabels}
          />
        </group>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
};

export default CountingSortGrid;