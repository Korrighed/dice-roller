import React from 'react';
import { getRandomNum } from '../../utils/dice.ts';

interface D20Props {
  onRoll?: (diceType: string, value: number) => void;
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

function D20({ onRoll }: D20Props) {
  const rollD20 = () => {
    const result = getRandomNum(20);
    if (onRoll) {
      onRoll('d20', result);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={rollD20}>Roll D20</button>
    </div>
  );
}

export default D20;