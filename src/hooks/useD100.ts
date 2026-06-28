import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { buildBipyramidGeo } from './useD10.ts';
import { computeFaceUp } from '../utils/faceUp.ts';

export const D100_RADIUS = 0.4;

const _tmp = buildBipyramidGeo(1);
const _raw = computeFaceUp(_tmp);
export const FACE_UP: Record<number, [number, number, number]> = {};
for (let i = 1; i <= 10; i++) FACE_UP[i * 10] = _raw[i];
_tmp.dispose();

export function useD100Geometry() {
  return useMemo(() => buildBipyramidGeo(D100_RADIUS), []);
}

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