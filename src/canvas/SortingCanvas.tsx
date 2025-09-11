// /canvas/SortingCanvas.tsx
import type { FC, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import "./SortingCanvas.css";

interface SortingCanvasProps {
  children: ReactNode;
}

const SortingCanvas: FC<SortingCanvasProps> = ({ children }) => (
  <div className="sorting-canvas">
    <Canvas camera={{ position: [0, 5, 20], fov: 20 }}>
      <ambientLight />
      <pointLight position={[10, 20, 10]} />
      {children}
    </Canvas>
  </div>
);

export default SortingCanvas;