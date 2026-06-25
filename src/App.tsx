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
    padding: '1rem',
  },
};

function App() {
  const { rolls, pendingDice, addPendingDice, rollAllPending, deleteRoll, clearAll } = useRolls();

  return (
    <div style={styles.app}>
      <DicesCard onAddDice={addPendingDice} pendingDice={pendingDice} onRollAll={rollAllPending} />
      <DiceTableCard
        rolls={rolls}
        onAddRoll={() => {}}
        onDeleteRoll={deleteRoll}
        onClearAll={clearAll}
      />
    </div>
  );
}

export default App;