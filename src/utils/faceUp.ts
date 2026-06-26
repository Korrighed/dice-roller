import * as THREE from 'three';

export function computeFaceUp(geometry: THREE.BufferGeometry): Record<number, [number, number, number]> {
  const faceUp: Record<number, [number, number, number]> = {};
  const normalAttr = geometry.attributes.normal;
  const up = new THREE.Vector3(0, 1, 0);

  geometry.groups.forEach((group, i) => {
    const n = new THREE.Vector3();
    for (let j = group.start; j < group.start + group.count; j++) {
      n.x += normalAttr.getX(j);
      n.y += normalAttr.getY(j);
      n.z += normalAttr.getZ(j);
    }
    n.normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(n, up);
    const e = new THREE.Euler().setFromQuaternion(q, 'XYZ');
    faceUp[i + 1] = [e.x, e.y, e.z];
  });

  return faceUp;
}
