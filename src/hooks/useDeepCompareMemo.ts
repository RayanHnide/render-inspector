"use client";

import { useMemo, useRef } from "react";
import { deepEqual } from "../utils/equality";

export function useDeepCompareMemo<T>(factory: () => T, deps: unknown[]): T {
  const signalRef = useRef(0);
  const depsRef = useRef<unknown[]>();

  if (!depsRef.current || !deepEqual(depsRef.current, deps)) {
    depsRef.current = deps;
    signalRef.current += 1;
  }

  return useMemo(factory, [signalRef.current]);
}
