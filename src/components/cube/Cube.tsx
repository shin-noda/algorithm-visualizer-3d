// src/components/cube/Cube.tsx
import { Edges, Text } from "@react-three/drei";

interface CubeProps {
  value: number | null;
  position: [number, number, number];
  label?: string | number | null;
  size?: number;
  color?: number;
}

const Cube = ({
  position,
  label = null,
  size = 0.9,
  color,
}: CubeProps) => {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial transparent opacity={0} />
        <Edges color={color} />
      </mesh>
      {label !== null && (
        <Text
          position={[0, 0, 0]}
          fontSize={0.35}
          anchorX="center"
          anchorY="middle"
          depthOffset={1}
          color="#000000"
        >
          {String(label)}
        </Text>
      )}
    </group>
  );
};

export default Cube;
