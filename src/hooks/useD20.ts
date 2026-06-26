import * as THREE from 'three';
import { computeFaceUp } from '../utils/faceUp.ts';
import { useTexturedMaterials } from '../utils/useTextures.ts';

export const D20_RADIUS = 0.4;

const _d20Geo = new THREE.IcosahedronGeometry(1, 0);
export const FACE_UP = computeFaceUp(_d20Geo);
_d20Geo.dispose();

export function useD20Materials() {
  return useTexturedMaterials(
    Array.from({ length: 20 }, (_, i) => `/d20/D20F${i + 1}.png`),
    '#1abc9c'
  );
}
