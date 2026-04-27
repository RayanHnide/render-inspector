"use client";

import type { RenderTimeOptions } from "../types";
import { useInspectorConfig } from "../context";
import { now, shouldRun } from "../utils/env";
import { log } from "../utils/logger";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useRenderTime(name: string, options: RenderTimeOptions = {}): void {
  const config = useInspectorConfig();
  const startedAt = now();

  const {
    enabled = config.enabled,
    includeInProduction = config.includeInProduction,
    logger = config.logger,
    threshold = config.slowRenderThreshold,
    logEveryRender = false
  } = options;

  useIsomorphicLayoutEffect(() => {
    if (!shouldRun(enabled, includeInProduction)) {
      return;
    }

    const duration = now() - startedAt;

    if (duration >= threshold) {
      log(logger, "warn", name, `render commit took ${duration.toFixed(2)}ms`, { duration, threshold });
      return;
    }

    if (logEveryRender) {
      log(logger, "debug", name, `render commit took ${duration.toFixed(2)}ms`, { duration, threshold });
    }
  });
}
