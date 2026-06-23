import { useState, useEffect } from 'react';
import { storage } from '../utils/storage.ts';

interface Roll {
  id: string;
  diceType: string;
  multiplier: number;
  result: number;
  timestamp: string;
}

interface UseRollsReturn {
  rolls: Roll[];
  lastRoll: Roll | null;
  addRoll: (diceType: string, result: number) => void;
  deleteRoll: (id: string) => void;
  clearAll: () => void;
}

export function useRolls(): UseRollsReturn {
  const [rolls, setRolls] = useState<Roll[]>(() => {
    const saved = storage.load();
    return saved || [];
  });

  // Sauvegarder à chaque changement
  useEffect(() => {
    storage.save(rolls);
  }, [rolls]);

  const addRoll = (diceType: string, result: number) => {
    const newRoll: Roll = {
      id: Date.now().toString(),
      diceType: diceType,
      multiplier: 1,
      result: result,
      timestamp: new Date().toLocaleString('fr-FR'),
    };
    setRolls([newRoll, ...rolls]);
  };

  const deleteRoll = (id: string) => {
    setRolls(rolls.filter((roll) => roll.id !== id));
  };

  const clearAll = () => {
    setRolls([]);
    storage.clear();
  };

  return {
    rolls,
    lastRoll: rolls.length > 0 ? rolls[0] : null,
    addRoll,
    deleteRoll,
    clearAll,
  };
}