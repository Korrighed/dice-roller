import { useState, useEffect } from 'react';
import { storage } from '../utils/storage.ts';
import { DICE_CONFIGS } from '../components/Dice/configs/index.ts';

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

export interface PendingDice {
  id: string;
  diceType: string;
  pairId?: string;
  role?: 'tens' | 'units';
}

interface UseRollsReturn {
  rolls: Roll[];
  lastRoll: Roll | null;
  pendingDice: PendingDice[];
  diceResults: Record<string, number>;
  modifier: number;
  setModifier: (n: number) => void;
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
  const [modifier, setModifier] = useState<number>(0);

  useEffect(() => {
    storage.save(rolls);
  }, [rolls]);

  const addPendingDice = (diceType: string) => {
    if (diceType === 'd100') {
      const pairId = Date.now().toString() + Math.random();
      setPendingDice((prev) => [
        ...prev,
        { id: pairId + '_h', diceType: 'd100', pairId, role: 'tens' },
        { id: pairId + '_u', diceType: 'd10',  pairId, role: 'units' },
      ]);
    } else {
      setPendingDice((prev) => [
        ...prev,
        { id: Date.now().toString() + Math.random(), diceType },
      ]);
    }
  };

  const removePendingDice = (id: string) => {
    setPendingDice((prev) => prev.filter((d) => d.id !== id));
  };

  const rollAllPending = () => {
    const newResults: Record<string, number> = {};
    const rawRolls: Record<string, number> = {};

    pendingDice.forEach((dice) => {
      const config = DICE_CONFIGS[dice.diceType as keyof typeof DICE_CONFIGS];
      const r = config?.roll() ?? 1;
      rawRolls[dice.id] = r;
      newResults[dice.id] = r;
    });

    const results: DiceResult[] = [];
    const processedPairs = new Set<string>();

    pendingDice.forEach((dice) => {
      if (dice.pairId && dice.role === 'tens' && !processedPairs.has(dice.pairId)) {
        processedPairs.add(dice.pairId);
        const partner = pendingDice.find((d) => d.pairId === dice.pairId && d.role === 'units');
        if (partner) {
          const tensRoll  = rawRolls[dice.id];     // D100: 10, 20 … 100
          const unitsRoll = rawRolls[partner.id];  // D10: 1 … 10
          const tens  = tensRoll  === 100 ? 0 : tensRoll;
          const units = unitsRoll === 10  ? 0 : unitsRoll;
          const combined = tens === 0 && units === 0 ? 100 : tens + units;
          results.push({ diceType: 'd100', result: combined });
        }
      } else if (!dice.pairId) {
        results.push({ diceType: dice.diceType, result: rawRolls[dice.id] });
      }
    });

    const diceTotal = results.reduce((sum, r) => sum + r.result, 0);
    const total = diceTotal + modifier;

    const counts: Record<string, number> = {};
    const seenPairs = new Set<string>();
    pendingDice.forEach((dice) => {
      if (dice.pairId && dice.role === 'tens' && !seenPairs.has(dice.pairId)) {
        seenPairs.add(dice.pairId);
        counts['d100'] = (counts['d100'] || 0) + 1;
      } else if (!dice.pairId) {
        counts[dice.diceType] = (counts[dice.diceType] || 0) + 1;
      }
    });
    const modifierStr = modifier > 0 ? `+${modifier}` : modifier < 0 ? `${modifier}` : '';
    const notation = Object.entries(counts)
      .map(([type, count]) => `${count}${type}`)
      .join('+') + modifierStr;

    const newRoll: Roll = {
      id: Date.now().toString(),
      notation,
      results,
      total,
      timestamp: new Date().toLocaleString('en-GB'),
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
    modifier,
    setModifier,
    addPendingDice,
    removePendingDice,
    rollAllPending,
    clearPendingDice,
    deleteRoll,
    clearAll,
    resetDiceResults,
  };
}