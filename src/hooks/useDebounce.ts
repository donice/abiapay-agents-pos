import { useEffect, useState } from 'react';

/**
 * Custom hook to debounce a value.
 * 
 * @param value - The value to debounce.
 * @param delay - The debounce delay in milliseconds (default is 500ms).
 * @returns The debounced value.
 */
export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};