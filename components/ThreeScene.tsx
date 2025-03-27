// components/ThreeScene.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function ThreeScene() {
  return (
    <div className="h-screen w-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <OrbitControls enableZoom={false} />
        <Sphere args={[1, 100, 200]} scale={2.5}>
          <MeshDistortMaterial
            color="#facc15" // жёлтый цвет
            attach="material"
            distort={0.3}
            speed={2}
          />
        </Sphere>
      </Canvas>
    </div>
  );
}
