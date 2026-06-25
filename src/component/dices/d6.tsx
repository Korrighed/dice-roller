import React from 'react';

interface D6Props {
  onAddDice?: (diceType: string) => void;
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

function D6({ onAddDice }: D6Props) {
  const addD6 = () => {
    if (onAddDice) {
      onAddDice('d6');
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={addD6}>Add D6</button>
    </div>
  );
}

export default D6;