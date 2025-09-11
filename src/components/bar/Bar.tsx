import { Text } from "@react-three/drei";

interface BarProps {
  value: number;
  index: number;
  arrLength: number;
  barWidth?: number;
  color?: number; // hex color
  height: number;
}

const Bar = ({
  value,
  index,
  arrLength,
  barWidth = 0.8,
  color = 0x38bdf8, // default blue
  height,
}: BarProps) => {
  return (
    <group key={index} position={[index - arrLength / 2, height / 2, 0]}>
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