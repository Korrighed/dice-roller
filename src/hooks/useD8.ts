import * as THREE from 'three';
import { computeFaceUp } from '../utils/faceUp.ts';
import { useTexturedMaterials } from '../utils/useTextures.ts';

export const D8_RADIUS = 0.4;

const _d8Geo = new THREE.OctahedronGeometry(1, 0);
export const FACE_UP = computeFaceUp(_d8Geo);
_d8Geo.dispose();

export function useD8Materials() {
  return useTexturedMaterials(
    Array.from({ length: 8 }, (_, i) => `/d8/D8F${i + 1}.png`),
    '#2ecc71'
  );
}
