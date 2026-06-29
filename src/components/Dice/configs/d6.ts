import * as THREE from 'three';
import { computeFaceUp } from '../../../utils/faceUp.ts';
import { getRandomNum } from '../../../utils/dice.ts';

const _geo = new THREE.BoxGeometry(1, 1, 1);
const _faceUp = computeFaceUp(_geo);
_geo.dispose();

export const d6Config = {
  type: 'd6' as const,
  maxValue: 6,
  radius: 0.5,
  roll: () => getRandomNum(6),
  textureUrls: ['/d6/dice6F1.png', '/d6/dice6F2.png', '/d6/dice6F3.png', '/d6/dice6F4.png', '/d6/dice6F5.png', '/d6/dice6F6.png'],
  faceUp: _faceUp,
  createGeometry: (radius: number) => new THREE.BoxGeometry(radius, radius, radius),
};
