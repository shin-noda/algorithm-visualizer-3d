// src/components/cubeRow/CubeRow.tsx
import { Text } from "@react-three/drei";
import Cube from "../cube/Cube";

type RowKind = "input" | "count" | "output";

const CUBE_SIZE = 0.9;

export interface ActiveHighlight {
  row: RowKind;
  index: number;
  sourceRow?: RowKind; // optional, indicates source of highlight
}

interface CubeRowProps {
  values: (number | null)[];
  y: number;
  kind: RowKind;
  active?: ActiveHighlight[];
  showLabels?: boolean;
}

const CubeRow = ({
  values,
  y,
  kind,
  active = [],
  showLabels = true,
}: CubeRowProps) => {
  const n = values.length;
  const offset = (n - 1) / 2;

  return (
    <group position={[0, y, 0]}>
      {values.map((v, i) => {
        // check if cube is highlighted
        const highlightObj = active.find((a) => a.index === i && a.row === kind);
        const highlighted = !!highlightObj;

        // determine color
        let cubeColor = 0xffffff; // default
        if (highlighted) {
          if (kind === "count") {
            cubeColor = highlightObj?.sourceRow === "input" ? 0x3b82f6 : 0xff0000; // blue if triggered by input, red otherwise
          } else {
            cubeColor = 0xff0000; // input/output always red
          }
        }

        const label = showLabels ? (v === null ? "" : v) : null;

        const x = (i - offset) * (CUBE_SIZE + 0.15);

        return (
          <group key={`${kind}-${i}`} position={[x, 0, 0]}>
            {/* Cube */}
            <Cube
              value={v}
              color={cubeColor}
              position={[0, 0, 0]}
              label={label}
              size={CUBE_SIZE}
            />

            {/* Index below the cube */}
            {showLabels && (
              <Text
                position={[0, -CUBE_SIZE / 1.3, 0]} // slightly below the cube
                fontSize={0.25}
                anchorX="center"
                anchorY="middle"
                color={highlighted ? cubeColor : "#555"} // match cube color
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