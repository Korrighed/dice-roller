import './App.css';
import DicesCard from './component/DicesCard.tsx';
import DiceTableCard from './component/DiceTableCard.tsx';
import { useRolls } from './hooks/useRolls.tsx';

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'row' as const,
    height: '80vh',
    width: '100vw',
    gap: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function App() {
  const { rolls, lastRoll, addRoll, deleteRoll, clearAll } = useRolls();

  return (
    <div style={styles.app}>
      <DicesCard onRoll={addRoll} lastRoll={lastRoll} />
      <DiceTableCard
        rolls={rolls}
        onAddRoll={addRoll}
        onDeleteRoll={deleteRoll}
        onClearAll={clearAll}
      />
    </div>
  );
}

export default App;