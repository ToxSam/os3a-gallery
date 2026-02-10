// src/components/VRMViewer/hooks/useVRMSetup.js
import { useState, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';

export function useVRMSetup() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const vrmRef = useRef(null);
  const mixerRef = useRef(null);

  const loadVRM = useCallback(async (url, scene) => {
    if (!url || !scene) {
      console.log('Missing required props for VRM load:', { hasUrl: !!url, hasScene: !!scene });
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('Starting VRM load process:', url);

      // Fetch VRM file
      const response = await fetch(url, {
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Accept': 'application/octet-stream,*/*'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch VRM: ${response.status}`);
      }

      const modelBlob = await response.blob();
      const modelUrl = URL.createObjectURL(modelBlob);

      try {
        // Setup loader
        const loader = new GLTFLoader();
        loader.register((parser) => new VRMLoaderPlugin(parser));

        // Load VRM
        const gltf = await new Promise((resolve, reject) => {
          loader.load(
            modelUrl,
            resolve,
            (progress) => console.log('Loading:', Math.round((progress.loaded / progress.total) * 100) + '%'),
            reject
          );
        });

        const vrm = gltf.userData.vrm;
        if (!vrm) throw new Error('No VRM data found in model');

        // Setup VRM
        VRMUtils.rotateVRM0(vrm);
        
        // Position setup
        const box = new THREE.Box3().setFromObject(vrm.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        vrm.scene.position.sub(center);
        vrm.scene.position.y = size.y * -0.2;
        vrm.scene.rotation.y = Math.PI;

        console.log('VRM loaded successfully');
        scene.add(vrm.scene);
        
        vrmRef.current = vrm;
        return vrm;
      } finally {
        URL.revokeObjectURL(modelUrl);
      }
    } catch (error) {
      console.error('VRM load error:', error);
      setError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cleanupVRM = useCallback(() => {
    if (vrmRef.current) {
      const vrm = vrmRef.current;
      
      if (vrm.scene) {
        vrm.scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach(material => material.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
      }

      if (typeof vrm.dispose === 'function') {
        vrm.dispose();
      }

      vrmRef.current = null;
    }

    if (mixerRef.current) {
      mixerRef.current.stopAllAction();
      mixerRef.current.uncacheRoot();
      mixerRef.current = null;
    }
  }, []);

  return {
    loadVRM,
    cleanupVRM,
    isLoading,
    error,
    currentVrm: vrmRef.current,
    mixer: mixerRef.current
  };
}