import React, { useState } from 'react';
// @ts-ignore
import '../styles/DicesCard.css';
import Dice3DCanvas from './Dice3DCanvas.tsx';
import DiceSelector from './DiceSelector.tsx';
import { PendingDice } from '../hooks/useRolls.tsx';

interface DicesCardProps {
  onAddDice: (diceType: string) => void;
  pendingDice: PendingDice[];
  diceResults: Record<string, number>;
  modifier: number;
  onModifierChange: (n: number) => void;
  onRollAll: () => void;
  onResetResults: () => void;
  onClearCanvas: () => void;
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row' as const,
    flex: 1,
    gap: '0',
    padding: '0',
  },
  canvasSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    gap: '1rem',
    padding: '1rem',
    minWidth: '0',
  },
  canvasContainer: {
    position: 'relative' as const,
    height: '350px',
    minHeight: '0',
  },
  canvas: {
    width: '100%',
    height: '100%',
    border: '2px solid #333',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
  },
  rollButton: {
    position: 'absolute' as const,
    top: '8px',
    left: '8px',
    padding: '0.4rem 0.8rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '0.8rem',
    zIndex: 10,
  },
  clearButton: {
    position: 'absolute' as const,
    top: '8px',
    right: '8px',
    padding: '0.4rem 0.8rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '0.8rem',
    zIndex: 10,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '0.5rem',
  },
};

function DicesCard({ onAddDice, pendingDice, diceResults, modifier, onModifierChange, onRollAll, onResetResults, onClearCanvas }: DicesCardProps) {
  const [isRolling, setIsRolling] = useState(false);

  const getDiceNotation = () => {
    const counts: Record<string, number> = {};
    const seenPairs = new Set<string>();
    pendingDice.forEach((dice) => {
      if (dice.pairId && dice.role === 'tens' && !seenPairs.has(dice.pairId)) {
        seenPairs.add(dice.pairId);
        counts['d100'] = (counts['d100'] || 0) + 1;
      } else if (!dice.pairId) {
        counts[dice.diceType] = (counts[dice.diceType] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([type, count]) => `${count}${type}`)
      .join('+');
  };

  const handleRoll = () => {
    onResetResults();
    setIsRolling(true);
    setTimeout(() => {
      setIsRolling(false);
      onRollAll();
    }, 1000);
  };

  return (
    <div style={styles.card} className="dices-card">
      <div style={styles.canvasSection}>
        <div style={styles.canvasContainer}>
          {pendingDice.length > 0 && (
            <>
              <button style={styles.rollButton} onClick={handleRoll}>
                Lancer {getDiceNotation()}
              </button>
              <button style={styles.clearButton} onClick={onClearCanvas}>
                ✕
              </button>
            </>
          )}
          {pendingDice.length > 0 ? (
            <Dice3DCanvas
              pendingDice={pendingDice}
              diceResults={diceResults}
              isRolling={isRolling}
            />
          ) : (
            <div style={styles.canvas}>
              <div style={{ color: '#999' }}>Scène 3D</div>
            </div>
          )}
        </div>
      </div>

      <DiceSelector onAddDice={onAddDice} modifier={modifier} onModifierChange={onModifierChange} />
    </div>
  );
}

export default DicesCard;
