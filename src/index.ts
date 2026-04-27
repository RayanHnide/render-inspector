"use client";

export { PerformanceProvider, useInspectorConfig } from "./context";
export { RenderGuard } from "./components/RenderGuard";
export { useDeepCompareMemo } from "./hooks/useDeepCompareMemo";
export { useExpensiveTask } from "./hooks/useExpensiveTask";
export { usePerformanceMark } from "./hooks/usePerformanceMark";
export { useRenderCount } from "./hooks/useRenderCount";
export { useRenderTime } from "./hooks/useRenderTime";
export { useStableCallback } from "./hooks/useStableCallback";
export { useWhyDidYouRender } from "./hooks/useWhyDidYouRender";
export { diffProps } from "./utils/diff";
export { deepEqual } from "./utils/equality";
export type {
  ChangeType,
  ExpensiveTaskOptions,
  InspectorConfig,
  InspectorLevel,
  InspectorLogger,
  InspectorOptions,
  PerformanceProviderProps,
  PropChange,
  RenderCountOptions,
  RenderGuardProps,
  RenderTimeOptions,
  WhyDidYouRenderOptions
} from "./types";
