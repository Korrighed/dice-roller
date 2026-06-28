import React from 'react';
import { DICE_REGISTRY } from '../config/diceRegistry.ts';

const wrapStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  justifyContent: 'center',
  alignItems: 'center',
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

const modifierWrapStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  marginLeft: '0.5rem',
};

const modifierLabelStyle: React.CSSProperties = {
  fontWeight: 'bold',
  fontSize: '1rem',
  color: '#555',
};

const modifierInputStyle: React.CSSProperties = {
  width: '64px',
  padding: '0.45rem 0.4rem',
  border: '2px solid #ddd',
  borderRadius: '6px',
  fontSize: '0.85rem',
  textAlign: 'center',
  fontWeight: 'bold',
};

interface DiceSelectorProps {
  onAddDice: (type: string) => void;
  modifier: number;
  onModifierChange: (n: number) => void;
}

export default function DiceSelector({ onAddDice, modifier, onModifierChange }: DiceSelectorProps) {
  return (
    <div style={wrapStyle}>
      {DICE_REGISTRY.map((def) => (
        <button key={def.type} style={btnStyle} onClick={() => onAddDice(def.type)}>
          {def.type}
        </button>
      ))}
      <div style={modifierWrapStyle}>
        <span style={modifierLabelStyle}>+</span>
        <input
          type="number"
          style={modifierInputStyle}
          value={modifier}
          onChange={(e) => onModifierChange(parseInt(e.target.value) || 0)}
        />
      </div>
    </div>
  );
}