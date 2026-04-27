"use client";

import { createContext, useContext, useMemo } from "react";
import type { InspectorConfig, PerformanceProviderProps } from "./types";
import { defaultLogger } from "./utils/logger";

const defaultConfig: Required<InspectorConfig> = {
  enabled: true,
  includeInProduction: false,
  logger: defaultLogger,
  slowRenderThreshold: 16
};

const InspectorContext = createContext<Required<InspectorConfig>>(defaultConfig);

export function PerformanceProvider({
  children,
  enabled = true,
  includeInProduction = false,
  logger = defaultLogger,
  slowRenderThreshold = 16
}: PerformanceProviderProps) {
  const value = useMemo(
    () => ({ enabled, includeInProduction, logger, slowRenderThreshold }),
    [enabled, includeInProduction, logger, slowRenderThreshold]
  );

  return <InspectorContext.Provider value={value}>{children}</InspectorContext.Provider>;
}

export function useInspectorConfig(): Required<InspectorConfig> {
  return useContext(InspectorContext);
}
