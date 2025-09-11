// src/components/arrow/Arrow.tsx
import { Edges } from "@react-three/drei";
import type { FC } from "react";

interface ArrowProps {
  index: number;
  arr: number[];
  color: string;
}

const Arrow: FC<ArrowProps> = ({ index, arr, color }) => {
  const maxVal = Math.max(...arr);
  const height = (arr[index] / maxVal) * 5;

  return (
    <group position={[index - arr.length / 2, height + 2, 0]}>
      {/* Shaft */}
      <mesh position={[0, -4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
        <meshStandardMaterial transparent opacity={0} />
        <Edges color={color} />
      </mesh>

      {/* Tip */}
      <mesh position={[0, -4.5, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.2, 0.3, 8]} />
        <meshStandardMaterial transparent opacity={0} />
        <Edges color={color} />
      </mesh>
    </group>
  );
};

export default Arrow;