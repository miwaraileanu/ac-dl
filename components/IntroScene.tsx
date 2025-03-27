'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RealPanel } from './RealPanel';

export function AnimatedPanel() {
  const panelRef = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  const baseRotationY = (4 * Math.PI) / 2.6;

  // Отслеживаем движение мыши
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!panelRef.current) return;

    if (progress.current < 1) {
      progress.current += 0.01;
      const eased = Math.pow(progress.current, 0.7);
      panelRef.current.position.z = THREE.MathUtils.lerp(-0.5, -5, eased);
      panelRef.current.scale.setScalar(THREE.MathUtils.lerp(10, 1.5, eased));
      panelRef.current.rotation.set(0, baseRotationY, 0);
    } else {
      const targetRotX = mouse.current.y * 0.2;
      const targetRotY = baseRotationY + mouse.current.x * 0.4;

      panelRef.current.rotation.x = THREE.MathUtils.lerp(
        panelRef.current.rotation.x,
        targetRotX,
        0.05
      );
      panelRef.current.rotation.y = THREE.MathUtils.lerp(
        panelRef.current.rotation.y,
        targetRotY,
        0.05
      );
    }
  });

  return (
    <group ref={panelRef}>
      <RealPanel />
    </group>
  );
}

export default function IntroScene() {
  return (
    <div className="h-screen w-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <OrbitControls enableZoom={false} enableRotate={false} />
        <AnimatedPanel />
        {/* Плоскость для тени */}
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.3, 0]}
        >
          <planeGeometry args={[10, 10]} />
          <shadowMaterial transparent opacity={0.15} />
        </mesh>
      </Canvas>
    </div>
  );
}