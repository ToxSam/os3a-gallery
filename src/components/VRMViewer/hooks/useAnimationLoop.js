// src/components/VRMViewer/hooks/useAnimationLoop.js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function useAnimationLoop(isInitialized, vrm, mixer, renderer, scene, camera, controls) {
  const clockRef = useRef(new THREE.Clock());
  const animationFrameRef = useRef();

  useEffect(() => {
    if (!isInitialized || !renderer || !scene || !camera) return;

    const animate = () => {
      const delta = clockRef.current.getDelta();

      if (controls) {
        controls.update();
      }

      if (mixer) {
        mixer.update(delta);
      }

      if (vrm) {
        vrm.update(delta);
      }

      renderer.render(scene, camera);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInitialized, vrm, mixer, renderer, scene, camera, controls]);
}