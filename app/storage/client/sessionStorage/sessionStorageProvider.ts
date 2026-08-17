import type { StorageProvider } from "../../provider/storageProvider.types";

export const sessionStorageProvider: StorageProvider = {
  getItem(key: string): string | null {
    if (typeof window === "undefined" || !window.sessionStorage) {
      return null;
    }
    try {
      return window.sessionStorage.getItem(key);
    } catch (err) {
      console.warn("[SESSION_STORAGE READ ERROR]", err);
      return null;
    }
  },

  setItem(key: string, value: string): void {
    if (typeof window === "undefined" || !window.sessionStorage) {
      return;
    }
    try {
      window.sessionStorage.setItem(key, value);
    } catch (err) {
      console.warn("[SESSION_STORAGE WRITE ERROR]", err);
    }
  },

  removeItem(key: string): void {
    if (typeof window === "undefined" || !window.sessionStorage) {
      return;
    }
    try {
      window.sessionStorage.removeItem(key);
    } catch (err) {
      console.warn("[SESSION_STORAGE REMOVE ERROR]", err);
    }
  },

  clear(): void {
    if (typeof window === "undefined" || !window.sessionStorage) {
      return;
    }
    try {
      window.sessionStorage.clear();
    } catch (err) {
      console.warn("[SESSION_STORAGE CLEAR ERROR]", err);
    }
  },
};
