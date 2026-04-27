import type { ReactNode } from "react";

export type InspectorLevel = "debug" | "info" | "warn" | "error";

export type InspectorLogger = (
  level: InspectorLevel,
  message: string,
  meta?: Record<string, unknown>
) => void;

export type InspectorConfig = {
  enabled?: boolean;
  includeInProduction?: boolean;
  logger?: InspectorLogger;
  slowRenderThreshold?: number;
};

export type InspectorOptions = {
  enabled?: boolean;
  includeInProduction?: boolean;
  logger?: InspectorLogger;
};

export type ChangeType = "added" | "removed" | "changed" | "reference";

export type PropChange = {
  key: string;
  type: ChangeType;
  previous: unknown;
  current: unknown;
};

export type WhyDidYouRenderOptions = InspectorOptions & {
  deep?: boolean;
  ignoreKeys?: string[];
  logOnMount?: boolean;
};

export type RenderCountOptions = InspectorOptions & {
  warnAfter?: number;
  logEvery?: number;
  logOnMount?: boolean;
};

export type RenderTimeOptions = InspectorOptions & {
  threshold?: number;
  logEveryRender?: boolean;
};

export type RenderGuardProps = RenderCountOptions & {
  name: string;
  limit?: number;
  children: ReactNode;
};

export type PerformanceProviderProps = InspectorConfig & {
  children: ReactNode;
};

export type ExpensiveTaskOptions<T> = InspectorOptions & {
  threshold?: number;
  onMeasure?: (duration: number, value: T) => void;
};
