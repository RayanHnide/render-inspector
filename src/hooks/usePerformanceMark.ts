"use client";

import { useCallback } from "react";
import { useInspectorConfig } from "../context";
import { now, shouldRun } from "../utils/env";
import { log } from "../utils/logger";

export function usePerformanceMark(name: string, options = {}) {
  const config = useInspectorConfig();
  const { enabled = config.enabled, includeInProduction = config.includeInProduction, logger = config.logger } =
    options as { enabled?: boolean; includeInProduction?: boolean; logger?: typeof config.logger };

  return useCallback(
    <T>(label: string, task: () => T): T => {
      const startedAt = now();
      const value = task();
      const duration = now() - startedAt;

      if (shouldRun(enabled, includeInProduction)) {
        log(logger, "info", name, `${label} took ${duration.toFixed(2)}ms`, { label, duration });
      }

      return value;
    },
    [enabled, includeInProduction, logger, name]
  );
}
