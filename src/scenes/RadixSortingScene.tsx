// src/components/RadixSortGrid.tsx
import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// components
import CubeRow from "../components/cubeRow/CubeRow";

// types
import type { SortGridProps } from "../types/SortGridProps";

const ROW_GAP = -1.8;

const RadixSortingScene = ({
  input,
  bucket,
  output,
  active = [],
  showLabels = true,
}: SortGridProps) => {
  const DEFAULT_SLOTS = input.length;

  const inputRow = useMemo(() => {
    const arr: (number | null)[] = input.slice(0, DEFAULT_SLOTS);
    while (arr.length < DEFAULT_SLOTS) arr.push(null);
    return arr;
  }, [input, DEFAULT_SLOTS]);

  const bucketRow = useMemo(() => {
    const arr: (number | null)[] = new Array(10).fill(0).map((_, i) => bucket[i] ?? 0);
    return arr;
  }, [bucket]);

  const outputRow = useMemo(() => {
    const arr: (number | null)[] = output.slice(0, DEFAULT_SLOTS);
    while (arr.length < DEFAULT_SLOTS) arr.push(null);
    return arr;
  }, [output, DEFAULT_SLOTS]);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={0.6} />

        <group position={[0, 1.2, 0]}>
          {/* Row 1: Input / Temp */}
          <CubeRow
            values={inputRow}
            y={0}
            kind="input"
            active={active.filter((a) => a.row === "input")}
            showLabels={showLabels}
          />

          {/* Row 2: Bucket row (digits 0-9) */}
          <CubeRow
            values={bucketRow}
            y={ROW_GAP}
            kind="bucket"
            active={active.filter((a) => a.row === "bucket")}
            showLabels={showLabels}
          />

          {/* Row 3: Final output */}
          <CubeRow
            values={outputRow}
            y={ROW_GAP * 2}
            kind="output"
            active={active.filter((a) => a.row === "output")}
            showLabels={showLabels}
          />
        </group>

        <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
      </Canvas>
    </div>
  );
};

export default RadixSortingScene;