import { sessionStorageProvider } from "../client/sessionStorage/sessionStorageProvider";
import type { StorageProvider } from "./storageProvider.types";

/**
 * Default storage provider instance.
 */
export const storageProvider: StorageProvider = sessionStorageProvider;
