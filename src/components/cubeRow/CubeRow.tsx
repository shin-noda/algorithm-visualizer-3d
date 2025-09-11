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
  showLabels = true,
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
          <group key={`${kind}-${i}`} position={[x, 0, 0]}>
            {/* Cube */}
            <Cube value={v} highlighted={highlighted} position={[0, 0, 0]} label={label} size={CUBE_SIZE} />

            {/* Index below the cube */}
            {showLabels && (
              <Text
                position={[0, -CUBE_SIZE / 1.3, 0]} // slightly below the cube
                fontSize={0.25}
                anchorX="center"
                anchorY="middle"
                color={highlighted ? "#ff0000" : "#555"} // highlight index if cube is active
              >
                [{i}]
              </Text>
            )}
          </group>
        );
      })}

      {/* Row label on the side */}
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