"use client";

import { useRef } from "react";
import type { RenderCountOptions } from "../types";
import { useInspectorConfig } from "../context";
import { shouldRun } from "../utils/env";
import { log } from "../utils/logger";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useRenderCount(name: string, options: RenderCountOptions = {}): number {
  const config = useInspectorConfig();
  const countRef = useRef(0);
  countRef.current += 1;

  const {
    enabled = config.enabled,
    includeInProduction = config.includeInProduction,
    logger = config.logger,
    warnAfter,
    logEvery = 1,
    logOnMount = true
  } = options;

  useIsomorphicLayoutEffect(() => {
    if (!shouldRun(enabled, includeInProduction)) {
      return;
    }

    const count = countRef.current;
    const shouldLogMount = count === 1 && logOnMount;
    const shouldLogUpdate = count > 1 && logEvery > 0 && count % logEvery === 0;

    if (warnAfter && count > warnAfter) {
      log(logger, "warn", name, `rendered ${count} times, above the warnAfter limit of ${warnAfter}`, {
        count,
        warnAfter
      });
      return;
    }

    if (shouldLogMount || shouldLogUpdate) {
      log(logger, "debug", name, `rendered ${count} time${count === 1 ? "" : "s"}`, { count });
    }
  });

  return countRef.current;
}
