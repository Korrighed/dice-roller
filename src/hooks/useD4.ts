import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { computeFaceUp, normalizeGroupUVs } from '../utils/faceUp.ts';

export const D4_RADIUS = 0.4;

const _d4Geo = new THREE.TetrahedronGeometry(1, 0);
for (let i = 0; i < 4; i++) _d4Geo.addGroup(i * 3, 3, i);
export const FACE_UP = computeFaceUp(_d4Geo);
_d4Geo.dispose();

export function useD4Geometry() {
  return useMemo(() => {
    const geo = new THREE.TetrahedronGeometry(D4_RADIUS, 0);
    for (let i = 0; i < 4; i++) geo.addGroup(i * 3, 3, i);
    normalizeGroupUVs(geo);
    return geo;
  }, []);
}

export function useD4Textures() {
  return useLoader(THREE.TextureLoader, [
    '/d4/D4F1.png', '/d4/D4F2.png', '/d4/D4F3.png', '/d4/D4F4.png',
  ]);
}

export function useD4Materials(textures: THREE.Texture[]) {
  return useMemo(() => {
    const arr = Array.isArray(textures) ? textures : [textures];
    return arr.slice(0, 4).map((t) => new THREE.MeshStandardMaterial({ map: t }));
  }, [textures]);
}