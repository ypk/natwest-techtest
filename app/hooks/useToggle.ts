import { useState } from "react";

export function useToggle(
  key: string,
  defaultValue: string
): [string, (newValue: string) => void] {
  const [state, setState] = useState<string>(() => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? stored : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const updateState = (newValue: string) => {
    setState(newValue);
    try {
      localStorage.setItem(key, newValue);
    } catch {
      // Fail silently on storage write errors
    }
  };

  return [state, updateState];
}
