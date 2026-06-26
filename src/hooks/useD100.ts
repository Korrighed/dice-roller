import { useTexturedMaterials } from '../utils/useTextures.ts';

export const D100_RADIUS = 0.4;
export const FACE_UP: Record<number, [number, number, number]> = {};

export function useD100Materials() {
  return useTexturedMaterials(
    Array.from({ length: 10 }, (_, i) => `/d100/D100F${(i + 1) * 10}.png`),
    '#f39c12'
  );
}
