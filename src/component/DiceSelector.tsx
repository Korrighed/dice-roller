import React from 'react';
import DiceButton from './DiceButton.tsx';
import { DICE_CONFIGS } from '../components/Dice/configs/index.ts';
import '../styles/DiceSelector.css';

const wrapStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  padding: '0.5rem',
  overflow: 'hidden',
  boxSizing: 'border-box',
};

const diceGridStyle: React.CSSProperties = {
  display: 'grid',
  gap: '0.25rem',
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
  width: '35px',
  padding: '0.25rem 0.2rem',
  border: '2px solid #ddd',
  borderRadius: '4px',
  fontSize: '0.75rem',
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
      <div style={diceGridStyle} className="dice-grid">
        {Object.values(DICE_CONFIGS).map((config) => (
          <DiceButton key={config.type} type={config.type} onClick={onAddDice} />
        ))}
        <div style={modifierWrapStyle}>
          <span style={modifierLabelStyle}>+</span>
          <input
            type="number"
            min={0}
            style={modifierInputStyle}
            value={modifier}
            onChange={(e) => onModifierChange(Math.max(0, parseInt(e.target.value) || 0))}
            onFocus={(e) => e.target.select()}
          />
        </div>
      </div>
    </div>
  );
}