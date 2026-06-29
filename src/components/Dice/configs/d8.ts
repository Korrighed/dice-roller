import * as THREE from 'three';
import { computeFaceUp, normalizeGroupUVs } from '../../../utils/faceUp.ts';
import { getRandomNum } from '../../../utils/dice.ts';

const _geo = new THREE.OctahedronGeometry(1, 0);
for (let i = 0; i < 8; i++) _geo.addGroup(i * 3, 3, i);
const _faceUp = computeFaceUp(_geo);
_geo.dispose();

export const d8Config = {
  type: 'd8' as const,
  maxValue: 8,
  radius: 0.4,
  roll: () => getRandomNum(8),
  textureUrls: ['/d8/D8F1.png', '/d8/D8F2.png', '/d8/D8F3.png', '/d8/D8F4.png', '/d8/D8F5.png', '/d8/D8F6.png', '/d8/D8F7.png', '/d8/D8F8.png'],
  faceUp: _faceUp,
  createGeometry: (radius: number) => {
    const geo = new THREE.OctahedronGeometry(radius, 0);
    for (let i = 0; i < 8; i++) geo.addGroup(i * 3, 3, i);
    normalizeGroupUVs(geo);
    return geo;
  },
};
