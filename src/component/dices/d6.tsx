import React from 'react';
import { getRandomNum } from '../../utils/dice.ts';

interface D6Props {
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
    backgroundColor: '#FF9800',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

function D6({ onRoll }: D6Props) {
  const rollD6 = () => {
    const result = getRandomNum(6);
    if (onRoll) {
      onRoll('d6', result);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={rollD6}>Roll D6</button>
    </div>
  );
}

export default D6;