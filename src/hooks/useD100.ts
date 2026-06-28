import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export const D100_RADIUS = 0.4;
export const FACE_UP: Record<number, [number, number, number]> = {};

export function useD100Textures() {
  return useLoader(THREE.TextureLoader, [
    '/d100/D100F10.png',  '/d100/D100F20.png',  '/d100/D100F30.png',
    '/d100/D100F40.png',  '/d100/D100F50.png',  '/d100/D100F60.png',
    '/d100/D100F70.png',  '/d100/D100F80.png',  '/d100/D100F90.png',
    '/d100/D100F100.png',
  ]);
}

export function useD100Materials(textures: THREE.Texture[]) {
  return useMemo(() => {
    const arr = Array.isArray(textures) ? textures : [textures];
    return arr.slice(0, 10).map((t) => new THREE.MeshStandardMaterial({ map: t }));
  }, [textures]);
}
