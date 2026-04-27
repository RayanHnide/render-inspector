import type { InspectorLevel, InspectorLogger } from "../types";

export const defaultLogger: InspectorLogger = (level, message, meta) => {
  const output = meta ? [message, meta] : [message];

  if (level === "debug") {
    console.debug(...output);
    return;
  }

  if (level === "warn") {
    console.warn(...output);
    return;
  }

  if (level === "error") {
    console.error(...output);
    return;
  }

  console.info(...output);
};

export function log(
  logger: InspectorLogger,
  level: InspectorLevel,
  name: string,
  message: string,
  meta?: Record<string, unknown>
): void {
  logger(level, `[${name}] ${message}`, meta);
}
