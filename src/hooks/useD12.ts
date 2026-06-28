import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { computeFaceUp } from '../utils/faceUp.ts';

export const D12_RADIUS = 0.4;

const _d12Geo = new THREE.DodecahedronGeometry(1, 0);
export const FACE_UP = computeFaceUp(_d12Geo);
_d12Geo.dispose();

export function useD12Textures() {
  return useLoader(THREE.TextureLoader, [
    '/d12/D12F1.png',  '/d12/D12F2.png',  '/d12/D12F3.png',  '/d12/D12F4.png',
    '/d12/D12F5.png',  '/d12/D12F6.png',  '/d12/D12F7.png',  '/d12/D12F8.png',
    '/d12/D12F9.png',  '/d12/D12F10.png', '/d12/D12F11.png', '/d12/D12F12.png',
  ]);
}

export function useD12Materials(textures: THREE.Texture[]) {
  return useMemo(() => {
    const arr = Array.isArray(textures) ? textures : [textures];
    return arr.slice(0, 12).map((t) => new THREE.MeshStandardMaterial({ map: t }));
  }, [textures]);
}
