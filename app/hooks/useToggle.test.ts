import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useToggle } from "./useToggle";

describe("useToggle hook", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("returns default value when localStorage is empty", () => {
    const { result } = renderHook(() => useToggle("test_key", "default"));
    expect(result.current[0]).toBe("default");
  });

  it("returns stored value when localStorage has data", () => {
    localStorage.setItem("test_key", "stored_val");
    const { result } = renderHook(() => useToggle("test_key", "default"));
    expect(result.current[0]).toBe("stored_val");
  });

  it("updates state and writes to localStorage on change", () => {
    const { result } = renderHook(() => useToggle("test_key", "default"));

    act(() => {
      result.current[1]("new_val");
    });

    expect(result.current[0]).toBe("new_val");
    expect(localStorage.getItem("test_key")).toBe("new_val");
  });
});
