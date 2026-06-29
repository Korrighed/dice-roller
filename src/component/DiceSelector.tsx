import React from 'react';
import DiceButton from './DiceButton.tsx';
import { DICE_REGISTRY } from '../config/diceRegistry.ts';
import '../styles/DiceSelector.css';

const wrapStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem',
  minWidth: '120px',
};

const diceGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '0.5rem',
  justifyItems: 'center',
};

const modifierWrapStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
};

const modifierLabelStyle: React.CSSProperties = {
  fontWeight: 'bold',
  fontSize: '1rem',
  color: '#555',
};

const modifierInputStyle: React.CSSProperties = {
  width: '70px',
  padding: '0.5rem 0.4rem',
  border: '2px solid #ddd',
  borderRadius: '6px',
  fontSize: '0.9rem',
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
    <div style={wrapStyle} className="dice-selector">
      <div style={{...diceGridStyle, gridTemplateColumns: 'repeat(2, 1fr)', gridAutoRows: 'auto'}}>
        {DICE_REGISTRY.map((def) => (
          <DiceButton key={def.type} type={def.type} onClick={onAddDice} />
        ))}
        <div style={modifierWrapStyle}>
          <span style={modifierLabelStyle}>+</span>
          <input
            type="number"
            style={modifierInputStyle}
            value={modifier}
            onChange={(e) => onModifierChange(parseInt(e.target.value) || 0)}
            onFocus={(e) => e.target.select()}
          />
        </div>
      </div>
    </div>
  );
}