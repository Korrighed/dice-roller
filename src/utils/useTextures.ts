import { useState, useEffect } from 'react';
import * as THREE from 'three';

const loader = new THREE.TextureLoader();

export function useTexturedMaterials(
  paths: string[],
  fallbackColor: string
): THREE.MeshStandardMaterial[] {
  const [materials, setMaterials] = useState<THREE.MeshStandardMaterial[]>(() =>
    paths.map(() => new THREE.MeshStandardMaterial({ color: fallbackColor }))
  );

  useEffect(() => {
    let cancelled = false;
    Promise.all(paths.map((p) => loader.loadAsync(p)))
      .then((textures) => {
        if (!cancelled)
          setMaterials(textures.map((t) => new THREE.MeshStandardMaterial({ map: t })));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return materials;
}
