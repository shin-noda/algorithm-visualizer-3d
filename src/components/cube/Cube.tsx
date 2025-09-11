// src/components/cube/Cube.tsx
import { Edges, Text } from "@react-three/drei";

interface CubeProps {
  value: number | null;
  position: [number, number, number];
  highlighted?: boolean;
  label?: string | number | null;
  size?: number;
}

const DEFAULT_SIZE = 0.9;

const Cube = ({
  position,
  highlighted = false,
  label = null,
  size = DEFAULT_SIZE,
}: CubeProps) => {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial transparent opacity={0} />
        <Edges color={highlighted ? "#f43f5e" : "#f5f5f5"} />
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
