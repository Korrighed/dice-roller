import { useState, useEffect } from 'react';
import { getRandomNum } from '../utils/dice.ts';
import { storage } from '../utils/storage.ts';

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

interface PendingDice {
  id: string;
  diceType: string;
}

interface UseRollsReturn {
  rolls: Roll[];
  lastRoll: Roll | null;
  pendingDice: PendingDice[];
  addPendingDice: (diceType: string) => void;
  removePendingDice: (id: string) => void;
  rollAllPending: () => void;
  deleteRoll: (id: string) => void;
  clearAll: () => void;
}

export function useRolls(): UseRollsReturn {
  const [rolls, setRolls] = useState<Roll[]>(() => {
    const saved = storage.load();
    return saved || [];
  });

  const [pendingDice, setPendingDice] = useState<PendingDice[]>([]);

  useEffect(() => {
    storage.save(rolls);
  }, [rolls]);

  const addPendingDice = (diceType: string) => {
    const newPending: PendingDice = {
      id: Date.now().toString() + Math.random(),
      diceType,
    };
    setPendingDice([...pendingDice, newPending]);
  };

  const removePendingDice = (id: string) => {
    setPendingDice(pendingDice.filter((dice) => dice.id !== id));
  };

  const rollAllPending = () => {
    const maxByDiceType: Record<string, number> = {
      d4: 4,
      d6: 6,
      d8: 8,
      d12: 12,
      d20: 20,
      d100: 100,
    };

    const results: DiceResult[] = pendingDice.map((dice) => {
      const max = maxByDiceType[dice.diceType] || 6;
      return {
        diceType: dice.diceType,
        result: getRandomNum(max),
      };
    });

    const total = results.reduce((sum, r) => sum + r.result, 0);

    const counts: Record<string, number> = {};
    pendingDice.forEach((dice) => {
      counts[dice.diceType] = (counts[dice.diceType] || 0) + 1;
    });
    const notation = Object.entries(counts)
      .map(([type, count]) => `${count}${type}`)
      .join('+');

    const newRoll: Roll = {
      id: Date.now().toString(),
      notation,
      results,
      total,
      timestamp: new Date().toLocaleString('fr-FR'),
    };

    setRolls([newRoll, ...rolls]);
    setPendingDice([]);
  };

  const deleteRoll = (id: string) => {
    setRolls(rolls.filter((roll) => roll.id !== id));
  };

  const clearAll = () => {
    setRolls([]);
    setPendingDice([]);
    storage.clear();
  };

  return {
    rolls,
    lastRoll: rolls.length > 0 ? rolls[0] : null,
    pendingDice,
    addPendingDice,
    removePendingDice,
    rollAllPending,
    deleteRoll,
    clearAll,
  };
}