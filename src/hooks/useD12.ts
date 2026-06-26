import * as THREE from 'three';
import { computeFaceUp } from '../utils/faceUp.ts';
import { useTexturedMaterials } from '../utils/useTextures.ts';

export const D12_RADIUS = 0.4;

const _d12Geo = new THREE.DodecahedronGeometry(1, 0);
export const FACE_UP = computeFaceUp(_d12Geo);
_d12Geo.dispose();

export function useD12Materials() {
  return useTexturedMaterials(
    Array.from({ length: 12 }, (_, i) => `/d12/D12F${i + 1}.png`),
    '#e67e22'
  );
}
