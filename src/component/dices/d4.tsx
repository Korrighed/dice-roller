import React from 'react';
import { getRandomNum } from '../../utils/dice.ts';

interface D4Props {
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
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

function D4({ onRoll }: D4Props) {
  const rollD4 = () => {
    const result = getRandomNum(4);
    if (onRoll) {
      onRoll('d4', result);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={rollD4}>Roll D4</button>
    </div>
  );
}

export default D4;