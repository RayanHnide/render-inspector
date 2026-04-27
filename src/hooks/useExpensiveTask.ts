"use client";

import { useMemo } from "react";
import type { ExpensiveTaskOptions } from "../types";
import { useInspectorConfig } from "../context";
import { now, shouldRun } from "../utils/env";
import { log } from "../utils/logger";

export function useExpensiveTask<T>(
  name: string,
  task: () => T,
  deps: unknown[],
  options: ExpensiveTaskOptions<T> = {}
): T {
  const config = useInspectorConfig();
  const {
    enabled = config.enabled,
    includeInProduction = config.includeInProduction,
    logger = config.logger,
    threshold = config.slowRenderThreshold,
    onMeasure
  } = options;

  return useMemo(() => {
    const startedAt = now();
    const value = task();
    const duration = now() - startedAt;

    if (shouldRun(enabled, includeInProduction)) {
      onMeasure?.(duration, value);

      if (duration >= threshold) {
        log(logger, "warn", name, `task took ${duration.toFixed(2)}ms`, { duration, threshold });
      }
    }

    return value;
    // React owns the dependency semantics here; the package passes through the caller's dependency list.
  }, deps);
}
