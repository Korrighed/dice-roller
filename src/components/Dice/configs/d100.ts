import * as THREE from 'three';
import { computeFaceUp } from '../../../utils/faceUp.ts';

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

const _tmp = buildBipyramidGeo(1);
const _raw = computeFaceUp(_tmp);
const _faceUp: Record<number, [number, number, number]> = {};
for (let i = 1; i <= 10; i++) _faceUp[i * 10] = _raw[i];
_tmp.dispose();

const getD100Roll = () => Math.ceil(Math.random() * 10) * 10;

export const d100Config = {
  type: 'd100' as const,
  maxValue: 100,
  radius: 0.4,
  roll: getD100Roll,
  textureUrls: [
    '/d100/D100F10.png', '/d100/D100F20.png', '/d100/D100F30.png',
    '/d100/D100F40.png', '/d100/D100F50.png', '/d100/D100F60.png',
    '/d100/D100F70.png', '/d100/D100F80.png', '/d100/D100F90.png',
    '/d100/D100F100.png',
  ],
  faceUp: _faceUp,
  createGeometry: (radius: number) => buildBipyramidGeo(radius),
};
