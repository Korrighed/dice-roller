import React from 'react';
import { getRandomNum } from '../../utils/dice.ts';

interface D100Props {
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
    backgroundColor: '#F44336',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

function D100({ onRoll }: D100Props) {
  const rollD100 = () => {
    const result = getRandomNum(100);
    if (onRoll) {
      onRoll('d100', result);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={rollD100}>Roll D100</button>
    </div>
  );
}

export default D100;