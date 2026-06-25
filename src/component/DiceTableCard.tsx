import React from 'react';
// @ts-ignore
import '../styles/DiceTableCard.css';

interface DiceResult {
  diceType: string;
  result: number;
}

interface Roll {
  id: string;
  notation: string;
  results: DiceResult[];
  total: number;
  timestamp: string;
}

interface DiceTableCardProps {
  rolls: Roll[];
  onAddRoll: () => void;
  onDeleteRoll: (id: string) => void;
  onClearAll: () => void;
}

function DiceTableCard({ rolls, onDeleteRoll, onClearAll }: DiceTableCardProps) {
  return (
    <div className="dice-table">
      <h2>Historique des jets</h2>
      <table>
        <thead>
          <tr className="header-row">
            <th className="header-cell">Notation</th>
            <th className="header-cell">Résultats</th>
            <th className="header-cell">Total</th>
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
                <td className="cell">{roll.notation}</td>
                <td className="cell">
                  {roll.results.map((r, idx) => (
                    <span key={idx}>
                      {r.result}
                      {idx < roll.results.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </td>
                <td className="cell result">{roll.total}</td>
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
