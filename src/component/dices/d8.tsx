import React from 'react';
import { getRandomNum } from '../../utils/dice.ts';

interface D8Props {
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
    backgroundColor: '#9C27B0',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

function D8({ onRoll }: D8Props) {
  const rollD8 = () => {
    const result = getRandomNum(8);
    if (onRoll) {
      onRoll('d8', result);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={rollD8}>Roll D8</button>
    </div>
  );
}

export default D8;