import React, { useRef, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { DICE_CONFIGS, DiceType } from './configs/index.ts';
import { useDiceRotation } from '../../hooks/useDiceRotation.ts';

interface DiceProps {
  type: DiceType;
  position: [number, number, number];
  result?: number;
  isRolling?: boolean;
}

export default function Dice({ type, position, result, isRolling = false }: DiceProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const speedRef = useDiceRotation(isRolling);
  const config = DICE_CONFIGS[type];
  const [materials, setMaterials] = useState<THREE.MeshStandardMaterial[]>([]);

  const geometry = useMemo(() => config.createGeometry(config.radius), [config]);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const loadedMaterials: (THREE.MeshStandardMaterial | undefined)[] = new Array(config.textureUrls.length);
    let loadCount = 0;

    config.textureUrls.forEach((url, index) => {
      textureLoader.load(url, (texture) => {
        loadedMaterials[index] = new THREE.MeshStandardMaterial({ map: texture });
        loadCount++;
        if (loadCount === config.textureUrls.length) {
          setMaterials(loadedMaterials.filter((m) => m !== undefined));
        }
      }, undefined, () => {
        loadedMaterials[index] = new THREE.MeshStandardMaterial({ color: 0xcccccc });
        loadCount++;
        if (loadCount === config.textureUrls.length) {
          setMaterials(loadedMaterials.filter((m) => m !== undefined));
        }
      });
    });
  }, [config]);

  useEffect(() => {
    const animate = () => {
      if (!meshRef.current) return;
      if (isRolling) {
        meshRef.current.rotation.x += speedRef.current.x;
        meshRef.current.rotation.y += speedRef.current.y;
        meshRef.current.rotation.z += speedRef.current.z;
      } else if (result !== undefined && config.faceUp[result]) {
        const [rx, ry, rz] = config.faceUp[result];
        meshRef.current.rotation.set(rx, ry, rz);
      }
    };

    const animationId = setInterval(animate, 1000 / 60);
    return () => clearInterval(animationId);
  }, [isRolling, result, config, speedRef]);

  return (
    <mesh ref={meshRef} material={materials} position={position} geometry={geometry} />
  );
}
