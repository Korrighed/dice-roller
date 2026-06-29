import { useRef, useEffect } from 'react';

export function useDiceRotation(isRolling?: boolean) {
  const speedRef = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (isRolling) {
      speedRef.current = {
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.15,
        z: (Math.random() - 0.5) * 0.05,
      };
    } else {
      speedRef.current = { x: 0, y: 0, z: 0 };
    }
  }, [isRolling]);

  return speedRef;
}
