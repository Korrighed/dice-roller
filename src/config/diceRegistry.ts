import { getRandomNum } from '../utils/dice.ts';

export interface DiceDef {
  type: string;
  max: number;
  roll: () => number;
}

const def = (type: string, max: number): DiceDef => ({
  type,
  max,
  roll: () => getRandomNum(max),
});

export const DICE_REGISTRY: DiceDef[] = [
  def('d4',   4),
  def('d6',   6),
  def('d8',   8),
  def('d10',  10),
  def('d12',  12),
  def('d20',  20),
  { type: 'd100', max: 100, roll: () => Math.ceil(Math.random() * 10) * 10 },
];

export const DICE_MAP: Record<string, DiceDef> = Object.fromEntries(
  DICE_REGISTRY.map((d) => [d.type, d])
);
