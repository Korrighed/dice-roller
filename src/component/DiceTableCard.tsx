import React from 'react';
// @ts-ignore
import '../styles/DiceTableCard.css';

interface Roll {
  id: string;
  diceType: string;
  multiplier: number;
  result: number;
  timestamp: string;
}

interface DiceTableCardProps {
  rolls: Roll[];
  onAddRoll: (roll: Roll) => void;
  onDeleteRoll: (id: string) => void;
  onClearAll: () => void;
}

function DiceTableCard({ rolls, onAddRoll, onDeleteRoll, onClearAll }: DiceTableCardProps) {
  return (
    <div className="dice-table">
      <h2>Historique des jets</h2>
      <table>
        <thead>
          <tr className="header-row">
            <th className="header-cell">Multiplicateur</th>
            <th className="header-cell">Type de dé</th>
            <th className="header-cell">Résultat</th>
            <th className="header-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rolls.length === 0 ? (
            <tr>
              <td colSpan={4} className="empty">
                Aucun jet enregistré
              </td>
            </tr>
          ) : (
            rolls.map((roll) => (
              <tr key={roll.id} className="row">
                <td className="cell">{roll.multiplier}</td>
                <td className="cell">{roll.diceType}</td>
                <td className="cell result">{roll.result}</td>
                <td className="cell">
                  <button className="delete-btn" onClick={() => onDeleteRoll(roll.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {rolls.length > 0 && (
        <button className="clear-btn" onClick={onClearAll}>
          Effacer l'historique complet
        </button>
      )}
    </div>
  );
}

export default DiceTableCard;
