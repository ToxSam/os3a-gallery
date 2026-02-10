// src/components/VRMViewer/utils/animationLoader.js
import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { mixamoVRMRigMap } from './mixamoRigMap';

// Function to handle remote URL fetching through a local proxy
const fetchViaProxy = async (url) => {
  // If we're on localhost, use a proxy API route
  if (window.location.hostname === 'localhost') {
    try {
      // Use a relative URL to our local API
      const proxyUrl = `/api/proxy-asset?url=${encodeURIComponent(url)}`;
      console.log('Using proxy for animation:', proxyUrl);
      
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`Proxy fetch failed: ${response.status} ${response.statusText}`);
      }
      
      return response.blob();
    } catch (error) {
      console.error('Proxy fetch failed, falling back to direct fetch:', error);
      // Fall back to direct fetch if proxy fails
    }
  }
  
  // Direct fetch as fallback or for production
  console.log('Direct fetch for animation:', url);
  const response = await fetch(url, {
    mode: 'cors',
    credentials: 'omit',
    headers: {
      'Accept': 'application/octet-stream,*/*'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to load animation: ${response.status} ${response.statusText}`);
  }
  
  return response.blob();
};

export async function loadMixamoAnimation(url, vrm) {
  console.log('Starting animation load:', url);
  
  try {
    console.log('Fetching animation file');
    const animBlob = await fetchViaProxy(url);
    console.log('Animation blob received:', { size: animBlob.size, type: animBlob.type });
    
    const animUrl = URL.createObjectURL(animBlob);
    const loader = new FBXLoader();
    
    try {
      console.log('Loading FBX animation');
      const asset = await new Promise((resolve, reject) => {
        loader.load(animUrl, resolve, undefined, reject);
      });
      
      console.log('FBX loaded, processing animation');
      const clip = THREE.AnimationClip.findByName(asset.animations, 'mixamo.com');
      
      if (!clip) {
        throw new Error('No Mixamo animation found in FBX file');
      }
      
      const tracks = [];

      console.log('Processing animation tracks');
      const restRotationInverse = new THREE.Quaternion();
      const parentRestWorldRotation = new THREE.Quaternion();
      const _quatA = new THREE.Quaternion();
      const _vec3 = new THREE.Vector3();

      // Get hips height
      const hipsNode = asset.getObjectByName('mixamorigHips');
      if (!hipsNode) {
        throw new Error('No hips bone found in animation');
      }
      
      const motionHipsHeight = hipsNode.position.y;
      const vrmHipsY = vrm.humanoid?.getNormalizedBoneNode('hips')?.getWorldPosition(_vec3).y;
      const vrmRootY = vrm.scene.getWorldPosition(_vec3).y;
      
      if (typeof vrmHipsY !== 'number' || typeof vrmRootY !== 'number') {
        throw new Error('Could not determine VRM hips position');
      }
      
      const vrmHipsHeight = Math.abs(vrmHipsY - vrmRootY);
      const hipsPositionScale = vrmHipsHeight / motionHipsHeight;

      console.log('Processing individual tracks');
      clip.tracks.forEach((track) => {
        const trackSplitted = track.name.split('.');
        const mixamoRigName = trackSplitted[0];
        const vrmBoneName = mixamoVRMRigMap[mixamoRigName];
        const vrmNode = vrm.humanoid?.getNormalizedBoneNode(vrmBoneName);
        const vrmNodeName = vrmNode?.name;
        const mixamoRigNode = asset.getObjectByName(mixamoRigName);

        if (vrmNodeName != null && mixamoRigNode != null) {
          const propertyName = trackSplitted[1];

          mixamoRigNode.getWorldQuaternion(restRotationInverse).invert();
          mixamoRigNode.parent.getWorldQuaternion(parentRestWorldRotation);

          if (track instanceof THREE.QuaternionKeyframeTrack) {
            for (let i = 0; i < track.values.length; i += 4) {
              const flatQuaternion = track.values.slice(i, i + 4);
              _quatA.fromArray(flatQuaternion);
              _quatA.premultiply(parentRestWorldRotation).multiply(restRotationInverse);
              _quatA.toArray(flatQuaternion);
              flatQuaternion.forEach((v, index) => {
                track.values[index + i] = v;
              });
            }

            tracks.push(
              new THREE.QuaternionKeyframeTrack(
                `${vrmNodeName}.${propertyName}`,
                track.times,
                track.values.map((v, i) => (vrm.meta?.metaVersion === '0' && i % 2 === 0 ? -v : v)),
              ),
            );
          } else if (track instanceof THREE.VectorKeyframeTrack) {
            const value = track.values.map((v, i) =>
              (vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? -v : v) * hipsPositionScale
            );
            tracks.push(new THREE.VectorKeyframeTrack(
              `${vrmNodeName}.${propertyName}`,
              track.times,
              value
            ));
          }
        }
      });

      console.log(`Animation processed: ${tracks.length} tracks created`);
      return new THREE.AnimationClip('vrmAnimation', clip.duration, tracks);
    } finally {
      URL.revokeObjectURL(animUrl);
    }
  } catch (error) {
    console.error('Animation loading error:', error);
    throw error;
  }
}