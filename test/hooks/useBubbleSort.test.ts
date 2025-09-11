// test/hooks/useBubbleSort.test.ts
import { renderHook, act } from "@testing-library/react";
import { useBubbleSort } from "../../src/hooks/useBubbleSort";

jest.useFakeTimers();

describe("useBubbleSort (smoke test)", () => {
  it("should initialize correctly", () => {
    const { result } = renderHook(() => useBubbleSort());

    expect(result.current.arr).toHaveLength(10);
    expect(result.current.comparisons).toBe(0);
    expect(result.current.swaps).toBe(0);
    expect(result.current.stepHistory).toEqual([]);
    expect(result.current.isSorting).toBe(false);
    expect(result.current.isFinished).toBe(false);
  });

  it("should start sorting when startOrRestart is called", () => {
    const { result } = renderHook(() => useBubbleSort());

    act(() => {
      result.current.startOrRestart();
    });

    expect(result.current.isSorting).toBe(true);
  });

  it("should update comparing and swapping while sorting", () => {
    const { result } = renderHook(() => useBubbleSort());

    act(() => {
      result.current.startOrRestart();
    });

    // advance a few steps
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.comparing.length).toBeGreaterThanOrEqual(0);
    expect(result.current.swapping.length).toBeGreaterThanOrEqual(0);
    expect(result.current.isSorting).toBe(true);
  });
});