import * as THREE from 'three';

export function computeFaceUp(geometry: THREE.BufferGeometry): Record<number, [number, number, number]> {
  const faceUp: Record<number, [number, number, number]> = {};
  const normalAttr = geometry.attributes.normal;
  const up = new THREE.Vector3(0, 1, 0);

  const indexAttr = geometry.index;

  geometry.groups.forEach((group, i) => {
    const n = new THREE.Vector3();
    for (let j = group.start; j < group.start + group.count; j++) {
      const vi = indexAttr ? indexAttr.getX(j) : j;
      n.x += normalAttr.getX(vi);
      n.y += normalAttr.getY(vi);
      n.z += normalAttr.getZ(vi);
    }
    n.normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(n, up);
    const e = new THREE.Euler().setFromQuaternion(q, 'XYZ');
    faceUp[i + 1] = [e.x, e.y, e.z];
  });

  return faceUp;
}

export function normalizeGroupUVs(geometry: THREE.BufferGeometry): void {
  const posAttr = geometry.attributes.position;
  const uvAttr = geometry.attributes.uv;
  if (!uvAttr) return;

  for (const group of geometry.groups) {
    const verts: THREE.Vector3[] = [];
    for (let i = group.start; i < group.start + group.count; i++) {
      verts.push(new THREE.Vector3(
        posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i),
      ));
    }

    // Plan local de la face défini par le premier triangle
    const normal = new THREE.Triangle(verts[0], verts[1], verts[2]).getNormal(new THREE.Vector3());
    const tangent = new THREE.Vector3().subVectors(verts[1], verts[0]).normalize();
    const bitangent = new THREE.Vector3().crossVectors(normal, tangent).normalize();

    // Projection 2D de chaque sommet sur le plan de la face
    const uvs2d = verts.map(v => {
      const rel = new THREE.Vector3().subVectors(v, verts[0]);
      return [rel.dot(tangent), rel.dot(bitangent)] as [number, number];
    });

    const us = uvs2d.map(uv => uv[0]);
    const vs = uvs2d.map(uv => uv[1]);
    const minU = Math.min(...us);
    const minV = Math.min(...vs);
    // Même échelle U/V pour ne pas déformer la texture
    const range = Math.max(Math.max(...us) - minU, Math.max(...vs) - minV) || 1;

    for (let i = 0; i < verts.length; i++) {
      uvAttr.setXY(
        group.start + i,
        (uvs2d[i][0] - minU) / range,
        (uvs2d[i][1] - minV) / range,
      );
    }
  }

  uvAttr.needsUpdate = true;
}