"use client";

import type { RenderGuardProps } from "../types";
import { useRenderCount } from "../hooks/useRenderCount";

export function RenderGuard({
  children,
  name,
  limit = 10,
  warnAfter,
  ...options
}: RenderGuardProps) {
  useRenderCount(name, {
    ...options,
    warnAfter: warnAfter ?? limit,
    logOnMount: options.logOnMount ?? false
  });

  return <>{children}</>;
}
