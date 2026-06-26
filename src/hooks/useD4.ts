import * as THREE from 'three';
import { computeFaceUp } from '../utils/faceUp.ts';
import { useTexturedMaterials } from '../utils/useTextures.ts';

export const D4_RADIUS = 0.4;

const _d4Geo = new THREE.TetrahedronGeometry(1, 0);
export const FACE_UP = computeFaceUp(_d4Geo);
_d4Geo.dispose();

export function useD4Materials() {
  return useTexturedMaterials(
    ['/d4/D4F1.png', '/d4/D4F2.png', '/d4/D4F3.png', '/d4/D4F4.png'],
    '#e74c3c'
  );
}
