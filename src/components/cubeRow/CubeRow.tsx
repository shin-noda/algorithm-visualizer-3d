// src/components/cubeRow/CubeRow.tsx
import { Text } from "@react-three/drei";

// components
import CubeRowContent from "../cubeRowContent/CubeRowContent";

// types
import type { RowKind, ActiveHighlight } from "../../types/Cube";

const CUBE_SIZE = 0.9;

interface CubeRowProps {
  values: (number | null)[];
  y: number;
  kind: RowKind;
  active?: ActiveHighlight[];
  showLabels?: boolean;
  showDigitLabels?: boolean;
}

const CubeRow = ({
  values,
  y,
  kind,
  active = [],
  showLabels = true,
  showDigitLabels = true,
}: CubeRowProps) => {
  // Render digit labels above cube (for radix sort)
  const renderDigitLabels = (v: number, highlight?: ActiveHighlight) => {
    const str = v.toString().padStart(3, "0"); // always 3 digits
    return (
      <>
        {str.split("").map((digit, idx) => {
          const digitPos = 2 - idx; // rightmost = ones (0), leftmost = hundreds (2)
          let color = "#000"; // default black

          if (highlight?.digitIndex === digitPos) {
            color = highlight.isMiddleCube ? "#ff0000" : "#3b82f6"; // red if middle cube, else blue
          }

          return (
            <Text
              key={idx}
              position={[-CUBE_SIZE / 3 + idx * (CUBE_SIZE / 3), CUBE_SIZE / 1.5, 0]}
              fontSize={0.25}
              anchorX="center"
              anchorY="middle"
              color={color}
            >
              {digit}
            </Text>
          );
        })}
      </>
    );
  };

  return (
    <CubeRowContent
      values={values}
      y={y}
      kind={kind}
      active={active}
      showLabels={showLabels}
      renderDigitLabels={renderDigitLabels}
      showDigitLabels={showDigitLabels}
    />
  );
};

export default CubeRow;