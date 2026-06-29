import * as THREE from 'three';
import { computeFaceUp, normalizeGroupUVs } from '../../../utils/faceUp.ts';
import { getRandomNum } from '../../../utils/dice.ts';

const _geo = new THREE.IcosahedronGeometry(1, 0);
for (let i = 0; i < 20; i++) _geo.addGroup(i * 3, 3, i);
const _faceUp = computeFaceUp(_geo);
_geo.dispose();

export const d20Config = {
  type: 'd20' as const,
  maxValue: 20,
  radius: 0.4,
  roll: () => getRandomNum(20),
  textureUrls: Array.from({ length: 20 }, (_, i) => `/d20/D20F${i + 1}.png`),
  faceUp: _faceUp,
  createGeometry: (radius: number) => {
    const geo = new THREE.IcosahedronGeometry(radius, 0);
    for (let i = 0; i < 20; i++) geo.addGroup(i * 3, 3, i);
    normalizeGroupUVs(geo);
    return geo;
  },
};
