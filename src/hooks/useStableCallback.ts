"use client";

import { useCallback } from "react";
import { useLatestRef } from "./useLatestRef";

export function useStableCallback<TArgs extends unknown[], TResult>(
  callback: (...args: TArgs) => TResult
): (...args: TArgs) => TResult {
  const callbackRef = useLatestRef(callback);

  return useCallback((...args: TArgs) => callbackRef.current(...args), [callbackRef]);
}
