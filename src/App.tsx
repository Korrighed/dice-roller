import './App.css';
import DicesCard from './component/DicesCard.tsx';
import DiceTableCard from './component/DiceTableCard.tsx';
import { useRolls } from './hooks/useRolls.tsx';

function App() {
  const { rolls, pendingDice, diceResults, modifier, setModifier, addPendingDice, rollAllPending, clearPendingDice, deleteRoll, clearAll, resetDiceResults } = useRolls();

  return (
    <div className="app-layout">
      <header className="app-header">
        <span className="app-header-title">Dice Roller</span>
        <span className="app-header-sub">D&D &amp; TTRPG</span>
      </header>

      <main className="app-main">
        <div className="app-card app-card-dices">
          <DicesCard
            onAddDice={addPendingDice}
            pendingDice={pendingDice}
            diceResults={diceResults}
            modifier={modifier}
            onModifierChange={setModifier}
            onRollAll={rollAllPending}
            onResetResults={resetDiceResults}
            onClearCanvas={clearPendingDice}
          />
        </div>
        <div className="app-card app-card-table">
          <DiceTableCard
            rolls={rolls}
            onAddRoll={() => {}}
            onDeleteRoll={deleteRoll}
            onClearAll={clearAll}
          />
        </div>
      </main>

      <footer className="app-footer">
        <span>Dice Roller &copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

export default App;
