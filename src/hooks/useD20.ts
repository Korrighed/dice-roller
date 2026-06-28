import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { computeFaceUp } from '../utils/faceUp.ts';

export const D20_RADIUS = 0.4;

const _d20Geo = new THREE.IcosahedronGeometry(1, 0);
export const FACE_UP = computeFaceUp(_d20Geo);
_d20Geo.dispose();

export function useD20Textures() {
  return useLoader(THREE.TextureLoader, [
    '/d20/D20F1.png',  '/d20/D20F2.png',  '/d20/D20F3.png',  '/d20/D20F4.png',
    '/d20/D20F5.png',  '/d20/D20F6.png',  '/d20/D20F7.png',  '/d20/D20F8.png',
    '/d20/D20F9.png',  '/d20/D20F10.png', '/d20/D20F11.png', '/d20/D20F12.png',
    '/d20/D20F13.png', '/d20/D20F14.png', '/d20/D20F15.png', '/d20/D20F16.png',
    '/d20/D20F17.png', '/d20/D20F18.png', '/d20/D20F19.png', '/d20/D20F20.png',
  ]);
}

export function useD20Materials(textures: THREE.Texture[]) {
  return useMemo(() => {
    const arr = Array.isArray(textures) ? textures : [textures];
    return arr.slice(0, 20).map((t) => new THREE.MeshStandardMaterial({ map: t }));
  }, [textures]);
}
