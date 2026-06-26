import React from 'react';
import { DICE_REGISTRY } from '../config/diceRegistry.ts';

const styles: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  justifyContent: 'center',
};

const btnStyle: React.CSSProperties = {
  padding: '0.5rem 0.8rem',
  border: '2px solid #ddd',
  borderRadius: '6px',
  backgroundColor: '#fff',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.85rem',
  textTransform: 'uppercase',
};

export default function DiceSelector({ onAddDice }: { onAddDice: (type: string) => void }) {
  return (
    <div style={styles}>
      {DICE_REGISTRY.map((def) => (
        <button key={def.type} style={btnStyle} onClick={() => onAddDice(def.type)}>
          {def.type}
        </button>
      ))}
    </div>
  );
}
