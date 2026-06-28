import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useDiceRotation, useD6Textures, useD6Materials, D6_SIZE, FACE_UP as D6_FACE_UP } from '../hooks/useD6.ts';
import { useD4Textures, useD4Materials, useD4Geometry, FACE_UP as D4_FACE_UP } from '../hooks/useD4.ts';
import { useD8Textures, useD8Materials, useD8Geometry, FACE_UP as D8_FACE_UP } from '../hooks/useD8.ts';
import { useD10Textures, useD10Materials, useD10Geometry, FACE_UP as D10_FACE_UP } from '../hooks/useD10.ts';
import { useD12Textures, useD12Materials, useD12Geometry, FACE_UP as D12_FACE_UP } from '../hooks/useD12.ts';
import { useD20Textures, useD20Materials, useD20Geometry, FACE_UP as D20_FACE_UP } from '../hooks/useD20.ts';
import { useD100Textures, useD100Materials, useD100Geometry, FACE_UP as D100_FACE_UP } from '../hooks/useD100.ts';
import * as THREE from 'three';

interface CanvasItemProps {
  position: [number, number, number];
  result?: number;
  isRolling?: boolean;
}

function DiceBase({
  position, result, isRolling, materials, faceUp, children,
}: CanvasItemProps & {
  materials: THREE.Material | THREE.Material[];
  faceUp: Record<number, [number, number, number]>;
  children: React.ReactNode;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const speedRef = useDiceRotation(isRolling);

  useFrame(() => {
    if (!meshRef.current) return;
    if (isRolling) {
      meshRef.current.rotation.x += speedRef.current.x;
      meshRef.current.rotation.y += speedRef.current.y;
      meshRef.current.rotation.z += speedRef.current.z;
    } else if (result !== undefined && faceUp[result]) {
      const [rx, ry, rz] = faceUp[result];
      meshRef.current.rotation.set(rx, ry, rz);
    }
  });

  return (
    <mesh ref={meshRef} material={materials} position={position}>
      {children}
    </mesh>
  );
}

function D4Item(props: CanvasItemProps) {
  const textures = useD4Textures();
  const materials = useD4Materials(textures as THREE.Texture[]);
  const geometry = useD4Geometry();
  return <DiceBase {...props} materials={materials} faceUp={D4_FACE_UP}><primitive object={geometry} attach="geometry" /></DiceBase>;
}

function D6Item(props: CanvasItemProps) {
  const textures = useD6Textures();
  const materials = useD6Materials(textures);
  return <DiceBase {...props} materials={materials} faceUp={D6_FACE_UP}><boxGeometry args={D6_SIZE} /></DiceBase>;
}

function D8Item(props: CanvasItemProps) {
  const textures = useD8Textures();
  const materials = useD8Materials(textures as THREE.Texture[]);
  const geometry = useD8Geometry();
  return <DiceBase {...props} materials={materials} faceUp={D8_FACE_UP}><primitive object={geometry} attach="geometry" /></DiceBase>;
}

function D10Item(props: CanvasItemProps) {
  const textures = useD10Textures();
  const materials = useD10Materials(textures as THREE.Texture[]);
  const geometry = useD10Geometry();
  return <DiceBase {...props} materials={materials} faceUp={D10_FACE_UP}><primitive object={geometry} attach="geometry" /></DiceBase>;
}

function D12Item(props: CanvasItemProps) {
  const textures = useD12Textures();
  const materials = useD12Materials(textures as THREE.Texture[]);
  const geometry = useD12Geometry();
  return <DiceBase {...props} materials={materials} faceUp={D12_FACE_UP}><primitive object={geometry} attach="geometry" /></DiceBase>;
}

function D20Item(props: CanvasItemProps) {
  const textures = useD20Textures();
  const materials = useD20Materials(textures as THREE.Texture[]);
  const geometry = useD20Geometry();
  return <DiceBase {...props} materials={materials} faceUp={D20_FACE_UP}><primitive object={geometry} attach="geometry" /></DiceBase>;
}

function D100Item(props: CanvasItemProps) {
  const textures = useD100Textures();
  const materials = useD100Materials(textures as THREE.Texture[]);
  const geometry = useD100Geometry();
  return <DiceBase {...props} materials={materials} faceUp={D100_FACE_UP}><primitive object={geometry} attach="geometry" /></DiceBase>;
}

const DICE_ITEMS: Record<string, React.ComponentType<CanvasItemProps>> = {
  d4: D4Item, d6: D6Item, d8: D8Item, d10: D10Item,
  d12: D12Item, d20: D20Item, d100: D100Item,
};

interface Dice3DCanvasProps {
  pendingDice: Array<{ id: string; diceType: string }>;
  diceResults: Record<string, number>;
  isRolling?: boolean;
}

export default function Dice3DCanvas({ pendingDice, diceResults, isRolling = false }: Dice3DCanvasProps) {
  const getPosition = (index: number): [number, number, number] => {
    const cols = Math.ceil(Math.sqrt(pendingDice.length));
    const x = (index % cols) - cols / 2 + 0.5;
    const z = Math.floor(index / cols) - Math.floor(pendingDice.length / cols) / 2;
    return [x * 1.5, 0, z * 1.5];
  };

  return (
    <Canvas
      style={{ width: '100%', height: '100%', borderRadius: '4px' }}
      camera={{ position: [0, 5, 0], up: [0, 0, -1], fov: 50 }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[3, 5, 3]} intensity={1.2} />
      {pendingDice.map((dice, index) => {
        const Item = DICE_ITEMS[dice.diceType] ?? D6Item;
        return (
          <Item
            key={dice.id}
            position={getPosition(index)}
            result={diceResults[dice.id]}
            isRolling={isRolling}
          />
        );
      })}
    </Canvas>
  );
}