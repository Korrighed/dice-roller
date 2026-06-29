import * as THREE from 'three';
import { computeFaceUp, normalizeGroupUVs } from '../../../utils/faceUp.ts';
import { getRandomNum } from '../../../utils/dice.ts';

const _geo = new THREE.DodecahedronGeometry(1, 0);
for (let i = 0; i < 12; i++) _geo.addGroup(i * 9, 9, i);
const _faceUp = computeFaceUp(_geo);
_geo.dispose();

export const d12Config = {
  type: 'd12' as const,
  maxValue: 12,
  radius: 0.4,
  roll: () => getRandomNum(12),
  textureUrls: Array.from({ length: 12 }, (_, i) => `/d12/D12F${i + 1}.png`),
  faceUp: _faceUp,
  createGeometry: (radius: number) => {
    const geo = new THREE.DodecahedronGeometry(radius, 0);
    for (let i = 0; i < 12; i++) geo.addGroup(i * 9, 9, i);
    normalizeGroupUVs(geo);
    return geo;
  },
};
