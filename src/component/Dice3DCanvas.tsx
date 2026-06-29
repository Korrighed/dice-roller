import React from 'react';
import { Canvas } from '@react-three/fiber';
import Dice from '../components/Dice/Dice.tsx';

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
      {pendingDice.map((dice, index) => (
        <Dice
          key={dice.id}
          type={dice.diceType as any}
          position={getPosition(index)}
          result={diceResults[dice.id]}
          isRolling={isRolling}
        />
      ))}
    </Canvas>
  );
}