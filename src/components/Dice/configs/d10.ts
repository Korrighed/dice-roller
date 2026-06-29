import * as THREE from 'three';
import { computeFaceUp } from '../../../utils/faceUp.ts';
import { getRandomNum } from '../../../utils/dice.ts';

function buildBipyramidGeo(radius: number): THREE.BufferGeometry {
  const h = radius;
  const r = radius * 0.9;

  const top = new THREE.Vector3(0, h, 0);
  const bot = new THREE.Vector3(0, -h, 0);
  const eq = Array.from({ length: 5 }, (_, i) => {
    const a = (2 * Math.PI * i) / 5;
    return new THREE.Vector3(r * Math.cos(a), 0, r * Math.sin(a));
  });

  const faces: [THREE.Vector3, THREE.Vector3, THREE.Vector3][] = [];
  for (let i = 0; i < 5; i++) {
    const n = (i + 1) % 5;
    faces.push([top, eq[i], eq[n]]);
    faces.push([bot, eq[n], eq[i]]);
  }

  const pos: number[] = [];
  const nor: number[] = [];
  const uv: number[] = [];
  const _e1 = new THREE.Vector3();
  const _e2 = new THREE.Vector3();
  const _n = new THREE.Vector3();

  for (const [a, b, c] of faces) {
    _e1.subVectors(b, a);
    _e2.subVectors(c, a);
    _n.crossVectors(_e1, _e2).normalize();
    pos.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
    nor.push(_n.x, _n.y, _n.z, _n.x, _n.y, _n.z, _n.x, _n.y, _n.z);
    uv.push(0.5, 1, 0, 0, 1, 0);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  for (let i = 0; i < 10; i++) geo.addGroup(i * 3, 3, i);
  return geo;
}

const _geo = buildBipyramidGeo(1);
const _faceUp = computeFaceUp(_geo);
_geo.dispose();

export const d10Config = {
  type: 'd10' as const,
  maxValue: 10,
  radius: 0.4,
  roll: () => getRandomNum(10),
  textureUrls: Array.from({ length: 10 }, (_, i) => `/d10/D10F${i + 1}.png`),
  faceUp: _faceUp,
  createGeometry: (radius: number) => buildBipyramidGeo(radius),
};
