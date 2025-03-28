'use client';

import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

export function RealPanel() {
  const { scene } = useGLTF('/models/panel.glb');

  useEffect(() => {
    // Центрируем модель
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);

    // Повернуть начально (если AnimatedPanel не управляет)
    scene.rotation.set(0, 0, 0);

    // Настройки для каждого меша
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // ✅ ВАЖНО: разрешаем тень
        mesh.castShadow = true;

        // ✅ Стилизация (опционально)
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material) {
          material.color = new THREE.Color('#eeeeee');
          material.emissive = new THREE.Color('#444444');
          material.emissiveIntensity = 0.5;
          material.roughness = 0.4;
          material.metalness = 0.1;
        }
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      scale={0.05}
    />
  );
}
