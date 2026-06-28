import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export const D10_RADIUS = 0.4;
export const FACE_UP: Record<number, [number, number, number]> = {};

export function useD10Textures() {
  return useLoader(THREE.TextureLoader, [
    '/d10/D10F1.png', '/d10/D10F2.png', '/d10/D10F3.png', '/d10/D10F4.png',
    '/d10/D10F5.png', '/d10/D10F6.png', '/d10/D10F7.png', '/d10/D10F8.png',
    '/d10/D10F9.png', '/d10/D10F10.png',
  ]);
}

export function useD10Materials(textures: THREE.Texture[]) {
  return useMemo(() => {
    const arr = Array.isArray(textures) ? textures : [textures];
    return arr.slice(0, 10).map((t) => new THREE.MeshStandardMaterial({ map: t }));
  }, [textures]);
}
