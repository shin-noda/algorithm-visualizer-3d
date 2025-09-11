// src/components/cubeRow/CubeRow.tsx
import { Text } from "@react-three/drei";
import Cube from "../cube/Cube";

type RowKind = "input" | "count" | "output";

const CUBE_SIZE = 0.9;

interface CubeRowProps {
  values: (number | null)[];
  y: number;
  kind: RowKind;
  activeIndex?: number | null;
  showLabels?: boolean;
}

const CubeRow = ({
  values,
  y,
  kind,
  activeIndex = null,
  showLabels = true
}: CubeRowProps) => {
  const n = values.length;
  const offset = (n - 1) / 2;

  return (
    <group position={[0, y, 0]}>
      {values.map((v, i) => {
        const x = (i - offset) * (CUBE_SIZE + 0.15);
        const highlighted = activeIndex != null && activeIndex === i;
        const label = showLabels ? (v === null ? "" : v) : null;

        return (
          <Cube
            key={`${kind}-${i}`}
            value={v}
            highlighted={highlighted}
            position={[x, 0, 0]}
            label={label}
            size={CUBE_SIZE}
          />
        );
      })}

      <Text
        position={[-(n / 2) * (CUBE_SIZE + 0.15) - 1.2, 0, 0]}
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        color="#000000"
      >
        {kind.toUpperCase()}
      </Text>
    </group>
  );
};

export default CubeRow;