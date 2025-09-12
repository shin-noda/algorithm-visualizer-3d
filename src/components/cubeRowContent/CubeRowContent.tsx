// src/components/cubeRow/CubeRowContent.tsx
import type { JSX } from "react";
import { Text } from "@react-three/drei";

// components
import Cube from "../cube/Cube";

// types
import type { RowKind, ActiveHighlight } from "../../types/Cube";

const CUBE_SIZE = 0.9;
const CUBE_GAP = 0.5;

interface CubeRowContentProps {
  values: (number | null)[];
  y: number;
  kind: RowKind;
  active?: ActiveHighlight[];
  showLabels?: boolean;
  showFinal?: boolean; // only show output numbers after sorting finished
  renderDigitLabels: (v: number, highlight?: ActiveHighlight) => JSX.Element;
  showDigitLabels?: boolean;
}

const CubeRowContent = ({
  values,
  y,
  kind,
  active = [],
  showLabels = true,
  renderDigitLabels,
  showDigitLabels = true, // default true
}: CubeRowContentProps) => {
  const n = values.length;
  const offset = (n - 1) / 2;
  const numberPositionZ = CUBE_SIZE / 2 + 0.01;
  const indexPositionY = -CUBE_SIZE / 1.3;
  const rowLabelOffsetX = -(n / 2) * (CUBE_SIZE + CUBE_GAP) - 1.2;

  const getCubeColor = (highlighted: boolean) => {
    if (!highlighted) return 0xffffff;
    return kind === "bucket" ? 0x3b82f6 : 0xff0000;
  };

  return (
    <group position={[0, y, 0]}>
      {values.map((v, i) => {
        const highlightObj = active.find((a) => a.index === i && a.row === kind);
        const highlighted = !!highlightObj;
        const cubeColor = getCubeColor(highlighted);
        const x = (i - offset) * (CUBE_SIZE + CUBE_GAP);

        return (
          <group key={`${kind}-${i}`} position={[x, 0, 0]}>
            {/* Cube */}
            <Cube
              value={v}
              color={cubeColor}
              position={[0, 0, 0]}
              label={null}
              size={CUBE_SIZE}
            />

            {/* Numbers inside cubes */}
            {v !== null && (
              <Text
                position={[0, 0, numberPositionZ]}
                fontSize={0.5}
                anchorX="center"
                anchorY="middle"
                color="#000"
              >
                {v}
              </Text>
            )}

            {/* Digit labels above cube (skip for output row) */}
            {showDigitLabels && v !== null && kind !== "output" && renderDigitLabels(v, highlightObj)}

            {/* Index below cube */}
            {showLabels && (
              <Text
                position={[0, indexPositionY, 0]}
                fontSize={0.25}
                anchorX="center"
                anchorY="middle"
                color={highlighted ? cubeColor : "#555"}
              >
                [{i}]
              </Text>
            )}
          </group>
        );
      })}

      {/* Row label */}
      <Text
        position={[rowLabelOffsetX, 0, 0]}
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        color="#000"
      >
        {kind.toUpperCase()}
      </Text>
    </group>
  );
};

export default CubeRowContent;