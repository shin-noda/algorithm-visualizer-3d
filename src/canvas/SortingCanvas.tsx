// /canvas/SortingCanvas.tsx
import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

// css
import "./SortingCanvas.css";
import { OrbitControls } from "@react-three/drei";

interface SortingCanvasProps {
  children: ReactNode;
}

const SortingCanvas = ({ children }: SortingCanvasProps) => (
  <div className="sorting-canvas">
    <Canvas camera={{ position: [0, 5, 20], fov: 25 }}>
      <ambientLight />
      <pointLight position={[10, 20, 10]} />
      {children}

      {/* OrbitControls lets you rotate/zoom/pan the whole scene */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
      />
      
    </Canvas>
  </div>
);

export default SortingCanvas;