export function isProduction(): boolean {
  const runtime = globalThis as typeof globalThis & {
    process?: { env?: { NODE_ENV?: string } };
  };

  return runtime.process?.env?.NODE_ENV === "production";
}

export function shouldRun(enabled?: boolean, includeInProduction?: boolean): boolean {
  if (enabled === false) {
    return false;
  }

  if (isProduction() && !includeInProduction) {
    return false;
  }

  return true;
}

export function now(): number {
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    return performance.now();
  }

  return Date.now();
}
