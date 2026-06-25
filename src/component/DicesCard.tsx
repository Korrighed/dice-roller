import React from 'react';
// @ts-ignore
import '../styles/DicesCard.css';
import D6 from './dices/d6.tsx';

interface DicesCardProps {
  onAddDice: (diceType: string) => void;
  pendingDice: Array<{ id: string; diceType: string }>;
  onRollAll: () => void;
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    padding: '1rem',
    border: '2px solid #ddd',
    borderRadius: '8px',
  },
  canvasContainer: {
    position: 'relative' as const,
    width: '300px',
    height: '300px',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '0.5rem',
  },
};

function DicesCard({ onAddDice, pendingDice, onRollAll }: DicesCardProps) {
  const getDiceNotation = () => {
    const counts: Record<string, number> = {};
    pendingDice.forEach((dice) => {
      counts[dice.diceType] = (counts[dice.diceType] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([type, count]) => `${count}${type}`)
      .join('+');
  };

  return (
    <div style={styles.card}>
      <div style={styles.canvasContainer}>
        {pendingDice.length > 0 && (
          <button style={styles.rollButton} onClick={onRollAll}>
            Roll {getDiceNotation()}
          </button>
        )}
        <div style={styles.canvas}>
          {pendingDice.length > 0 ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>{getDiceNotation()}</p>
              {pendingDice.map((dice) => (
                <div key={dice.id} style={{ fontSize: '0.9rem' }}>
                  {dice.diceType}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: '#999' }}>Canvas 3D</div>
          )}
        </div>
      </div>

      <div style={styles.grid}>
        <D6 onAddDice={onAddDice} />
      </div>
    </div>
  );
}

export default DicesCard;