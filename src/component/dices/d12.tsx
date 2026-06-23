import React from 'react';
import { getRandomNum } from '../../utils/dice.ts';

interface D12Props {
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
    backgroundColor: '#E91E63',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

function D12({ onRoll }: D12Props) {
  const rollD12 = () => {
    const result = getRandomNum(12);
    if (onRoll) {
      onRoll('d12', result);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={rollD12}>Roll D12</button>
    </div>
  );
}

export default D12;