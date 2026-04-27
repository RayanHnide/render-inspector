"use client";

import { useRef } from "react";
import type { WhyDidYouRenderOptions } from "../types";
import { useInspectorConfig } from "../context";
import { diffProps, toRecord } from "../utils/diff";
import { shouldRun } from "../utils/env";
import { log } from "../utils/logger";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useWhyDidYouRender(
  name: string,
  props: Record<string, unknown> | unknown,
  options: WhyDidYouRenderOptions = {}
): void {
  const config = useInspectorConfig();
  const previousRef = useRef<Record<string, unknown>>();
  const currentProps = toRecord(props);

  const {
    enabled = config.enabled,
    includeInProduction = config.includeInProduction,
    logger = config.logger,
    deep = true,
    ignoreKeys = [],
    logOnMount = false
  } = options;

  useIsomorphicLayoutEffect(() => {
    if (!shouldRun(enabled, includeInProduction)) {
      previousRef.current = currentProps;
      return;
    }

    if (!previousRef.current) {
      previousRef.current = currentProps;

      if (logOnMount) {
        log(logger, "debug", name, "mounted with props", { props: currentProps });
      }

      return;
    }

    const changes = diffProps(previousRef.current, currentProps, { deep, ignoreKeys });

    if (changes.length > 0) {
      log(logger, "info", name, `rerendered because ${changes.length} prop${changes.length === 1 ? "" : "s"} changed`, {
        changes
      });
    }

    previousRef.current = currentProps;
  });
}
