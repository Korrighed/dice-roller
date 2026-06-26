import { useState, useEffect } from 'react';
import { storage } from '../utils/storage.ts';
import { DICE_MAP } from '../config/diceRegistry.ts';

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
  diceResults: Record<string, number>;
  addPendingDice: (diceType: string) => void;
  removePendingDice: (id: string) => void;
  rollAllPending: () => void;
  clearPendingDice: () => void;
  deleteRoll: (id: string) => void;
  clearAll: () => void;
  resetDiceResults: () => void;
}

export function useRolls(): UseRollsReturn {
  const [rolls, setRolls] = useState<Roll[]>(() => {
    const saved = storage.load();
    return saved || [];
  });

  const [pendingDice, setPendingDice] = useState<PendingDice[]>([]);
  const [diceResults, setDiceResults] = useState<Record<string, number>>({});

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
    const newResults: Record<string, number> = {};
    const results: DiceResult[] = pendingDice.map((dice) => {
      const result = DICE_MAP[dice.diceType]?.roll() ?? 1;
      newResults[dice.id] = result;
      return {
        diceType: dice.diceType,
        result,
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
    setDiceResults((prev) => ({ ...prev, ...newResults }));
  };

  const deleteRoll = (id: string) => {
    setRolls(rolls.filter((roll) => roll.id !== id));
  };

  const clearPendingDice = () => {
    setPendingDice([]);
    setDiceResults({});
  };

  const clearAll = () => {
    setRolls([]);
    setPendingDice([]);
    setDiceResults({});
    storage.clear();
  };

  const resetDiceResults = () => {
    setDiceResults({});
  };

  return {
    rolls,
    lastRoll: rolls.length > 0 ? rolls[0] : null,
    pendingDice,
    diceResults,
    addPendingDice,
    removePendingDice,
    rollAllPending,
    clearPendingDice,
    deleteRoll,
    clearAll,
    resetDiceResults,
  };
}