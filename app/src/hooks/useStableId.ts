import { useRef, useCallback } from 'react';

/**
 * Custom hook to generate stable IDs that avoid hydration mismatches
 * Uses a counter-based approach that's consistent between server and client
 */
export function useStableId() {
  const counterRef = useRef(0);
  
  const generateId = useCallback(() => {
    counterRef.current += 1;
    return `msg_${counterRef.current}`;
  }, []);
  
  return generateId;
}
