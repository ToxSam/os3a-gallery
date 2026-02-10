// src/components/VRMViewer/hooks/useSceneSetup.js
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function useSceneSetup(canvas, renderer, scene, camera) {
  const [isInitialized, setIsInitialized] = useState(false);
  const controlsRef = useRef(null);

  useEffect(() => {
    if (!canvas || !renderer || !scene || !camera) return;

    try {
      // Setup controls
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxPolarAngle = Math.PI / 2.2;
      controls.minPolarAngle = Math.PI / 3;
      controls.enableZoom = false;
      controls.enablePan = false;
      controlsRef.current = controls;

      // Add floor
      const floorGeometry = new THREE.PlaneGeometry(10, 10);
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x6816cc,
        metalness: 0.5,
        roughness: 0.5
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.805;
      scene.add(floor);

      setIsInitialized(true);

      return () => {
        controls.dispose();
        floor.geometry.dispose();
        floor.material.dispose();
        scene.remove(floor);
      };
    } catch (error) {
      console.error('Scene setup error:', error);
      return () => {};
    }
  }, [canvas, renderer, scene, camera]);

  return {
    isInitialized,
    controls: controlsRef.current
  };
}