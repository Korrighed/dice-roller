import { useTexturedMaterials } from '../utils/useTextures.ts';

export const D10_RADIUS = 0.4;
export const FACE_UP: Record<number, [number, number, number]> = {};

export function useD10Materials() {
  return useTexturedMaterials(
    Array.from({ length: 10 }, (_, i) => `/d10/D10F${i + 1}.png`),
    '#9b59b6'
  );
}
