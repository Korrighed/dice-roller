import { useRef, useEffect, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export const D6_SIZE: [number, number, number] = [0.5, 0.5, 0.5];

// BoxGeometry material order: [+X, -X, +Y, -Y, +Z, -Z]
// Textures: F1→+X, F2→-X, F3→+Y, F4→-Y, F5→+Z, F6→-Z
// Rotation (rx, ry, rz) qui place chaque face en haut (+Y)
const HALF = Math.PI / 2;
export const FACE_UP: Record<number, [number, number, number]> = {
  1: [0, 0, HALF],       // +X → top
  2: [0, 0, -HALF],      // -X → top
  3: [0, 0, 0],          // +Y → top (déjà en haut)
  4: [Math.PI, 0, 0],    // -Y → top
  5: [-HALF, 0, 0],      // +Z → top
  6: [HALF, 0, 0],       // -Z → top
};

export function useD6Textures() {
  const textureFiles = [
    '/d6/dice6F1.png',
    '/d6/dice6F2.png',
    '/d6/dice6F3.png',
    '/d6/dice6F4.png',
    '/d6/dice6F5.png',
    '/d6/dice6F6.png',
  ];
  return useLoader(THREE.TextureLoader, textureFiles);
}

export function useD6Materials(textures: THREE.Texture[]) {
  return useMemo(() => {
    const arr = Array.isArray(textures) ? textures : [textures];
    return arr.slice(0, 6).map((t) => new THREE.MeshStandardMaterial({ map: t }));
  }, [textures]);
}

export function useDiceRotation(isRolling?: boolean) {
  const speedRef = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (isRolling) {
      speedRef.current = {
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.15,
        z: (Math.random() - 0.5) * 0.05,
      };
    } else {
      speedRef.current = { x: 0, y: 0, z: 0 };
    }
  }, [isRolling]);

  return speedRef;
}