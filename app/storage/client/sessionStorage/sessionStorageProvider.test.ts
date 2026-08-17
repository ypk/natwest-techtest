import { beforeEach, describe, expect, it } from "vitest";
import { sessionStorageProvider } from "./sessionStorageProvider";

describe("sessionStorageProvider", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("sets and gets item", () => {
    sessionStorageProvider.setItem("test-key", "test-val");
    expect(sessionStorageProvider.getItem("test-key")).toBe("test-val");
  });

  it("returns null for non-existent key", () => {
    expect(sessionStorageProvider.getItem("missing")).toBeNull();
  });

  it("removes item", () => {
    sessionStorageProvider.setItem("key", "val");
    sessionStorageProvider.removeItem("key");
    expect(sessionStorageProvider.getItem("key")).toBeNull();
  });

  it("clears storage", () => {
    sessionStorageProvider.setItem("key1", "val1");
    sessionStorageProvider.setItem("key2", "val2");
    sessionStorageProvider.clear();
    expect(sessionStorageProvider.getItem("key1")).toBeNull();
    expect(sessionStorageProvider.getItem("key2")).toBeNull();
  });
});
