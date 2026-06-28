import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { computeFaceUp } from '../utils/faceUp.ts';

export const D8_RADIUS = 0.4;

const _d8Geo = new THREE.OctahedronGeometry(1, 0);
export const FACE_UP = computeFaceUp(_d8Geo);
_d8Geo.dispose();

export function useD8Textures() {
  return useLoader(THREE.TextureLoader, [
    '/d8/D8F1.png', '/d8/D8F2.png', '/d8/D8F3.png', '/d8/D8F4.png',
    '/d8/D8F5.png', '/d8/D8F6.png', '/d8/D8F7.png', '/d8/D8F8.png',
  ]);
}

export function useD8Materials(textures: THREE.Texture[]) {
  return useMemo(() => {
    const arr = Array.isArray(textures) ? textures : [textures];
    return arr.slice(0, 8).map((t) => new THREE.MeshStandardMaterial({ map: t }));
  }, [textures]);
}