import type { FC } from "react";
import { Text } from "@react-three/drei";

interface BarProps {
  value: number;
  index: number;
  arrLength: number;
  barWidth?: number;
  color?: number; // hex color
  height: number;
  isHeld?: boolean; // NEW: is this the floating held element
}

const Bar: FC<BarProps> = ({
  value,
  index,
  arrLength,
  barWidth = 0.8,
  color = 0x38bdf8,
  height,
  isHeld = false, // default false
}) => {
  // Base Y position
  let yPos = height / 2;

  // Float held element slightly above the others
  if (isHeld) {
    const floatOffset = Math.sin(Date.now() / 200) * 0.15; // subtle bobbing
    yPos += 1 + floatOffset; // 1 unit above + bob
  }

  return (
    <group key={index} position={[index - arrLength / 2, yPos, 0]}>
      <mesh>
        <boxGeometry args={[barWidth, height, barWidth]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, height / 2 + 0.5, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {value}
      </Text>
    </group>
  );
};

export default Bar;