import { d4Config } from './d4.ts';
import { d6Config } from './d6.ts';
import { d8Config } from './d8.ts';
import { d10Config } from './d10.ts';
import { d12Config } from './d12.ts';
import { d20Config } from './d20.ts';
import { d100Config } from './d100.ts';


export { d4Config } from './d4.ts';
export { d6Config } from './d6.ts';
export { d8Config } from './d8.ts';
export { d10Config } from './d10.ts';
export { d12Config } from './d12.ts';
export { d20Config } from './d20.ts';
export { d100Config } from './d100.ts';



export const DICE_CONFIGS = {
  d4: d4Config,
  d6: d6Config,
  d8: d8Config,
  d10: d10Config,
  d12: d12Config,
  d20: d20Config,
  d100: d100Config,
} as const;

export type DiceType = keyof typeof DICE_CONFIGS;
