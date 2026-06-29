import * as THREE from 'three';
import { computeFaceUp, normalizeGroupUVs } from '../../../utils/faceUp.ts';
import { getRandomNum } from '../../../utils/dice.ts';

const _geo = new THREE.TetrahedronGeometry(1, 0);
for (let i = 0; i < 4; i++) _geo.addGroup(i * 3, 3, i);
const _faceUp = computeFaceUp(_geo);
_geo.dispose();

export const d4Config = {
  type: 'd4' as const,
  maxValue: 4,
  radius: 0.4,
  roll: () => getRandomNum(4),
  textureUrls: ['/d4/D4F1.png', '/d4/D4F2.png', '/d4/D4F3.png', '/d4/D4F4.png'],
  faceUp: _faceUp,
  createGeometry: (radius: number) => {
    const geo = new THREE.TetrahedronGeometry(radius, 0);
    for (let i = 0; i < 4; i++) geo.addGroup(i * 3, 3, i);
    normalizeGroupUVs(geo);
    return geo;
  },
};
