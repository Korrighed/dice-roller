import React from 'react';
// @ts-ignore
import '../styles/DicesCard.css';
import D4 from './dices/d4.tsx';
import D6 from './dices/d6.tsx';
import D8 from './dices/d8.tsx';
import D12 from './dices/d12.tsx';
import D20 from './dices/d20.tsx';
import D100 from './dices/d100.tsx';

interface DicesCardProps {
  onRoll: (diceType: string, result: number) => void;
  lastRoll?: { diceType: string; result: number } | null;
}

function DicesCard({ onRoll, lastRoll }: DicesCardProps) {
  return (
    <div className="dice-card">
      <div className="roll">
        {lastRoll ? (
          <>
            <div className="label">Dernier lancer</div>
            <div className="value">
              {lastRoll.diceType}: {lastRoll.result}
            </div>
          </>
        ) : (
          <div className="label">Aucun lancer</div>
        )}
      </div>

      <div className="grid">
        <D4 onRoll={onRoll} />
        <D6 onRoll={onRoll} />
        <D8 onRoll={onRoll} />
        <D12 onRoll={onRoll} />
        <D20 onRoll={onRoll} />
        <D100 onRoll={onRoll} />
      </div>
    </div>
  );
}

export default DicesCard;