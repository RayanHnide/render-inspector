import type { PropChange } from "../types";
import { deepEqual, isPlainObject } from "./equality";

type DiffOptions = {
  deep?: boolean;
  ignoreKeys?: string[];
};

export function diffProps(
  previous: Record<string, unknown>,
  current: Record<string, unknown>,
  options: DiffOptions = {}
): PropChange[] {
  const ignored = new Set(options.ignoreKeys ?? []);
  const keys = new Set([...Object.keys(previous), ...Object.keys(current)]);
  const changes: PropChange[] = [];

  for (const key of keys) {
    if (ignored.has(key)) {
      continue;
    }

    const hadPrevious = Object.prototype.hasOwnProperty.call(previous, key);
    const hasCurrent = Object.prototype.hasOwnProperty.call(current, key);

    if (!hadPrevious) {
      changes.push({ key, type: "added", previous: undefined, current: current[key] });
      continue;
    }

    if (!hasCurrent) {
      changes.push({ key, type: "removed", previous: previous[key], current: undefined });
      continue;
    }

    const prevValue = previous[key];
    const nextValue = current[key];

    if (Object.is(prevValue, nextValue)) {
      continue;
    }

    if (options.deep && deepEqual(prevValue, nextValue)) {
      changes.push({ key, type: "reference", previous: prevValue, current: nextValue });
      continue;
    }

    changes.push({ key, type: "changed", previous: prevValue, current: nextValue });
  }

  return changes;
}

export function toRecord(value: unknown): Record<string, unknown> {
  if (isPlainObject(value)) {
    return value;
  }

  return { value };
}
