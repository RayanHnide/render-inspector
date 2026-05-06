# Recipe: Debug Expensive `useMemo` Work

## Problem

A component seems optimized with `useMemo`, but still feels slow because the memoized task itself is expensive.

## Instrument memoized tasks

```tsx
import { useExpensiveTask, usePerformanceMark } from "@rayan_hn/render-inspector";

function AnalyticsPanel({ events, filters }: Props) {
  const mark = usePerformanceMark("AnalyticsPanel");

  const grouped = useExpensiveTask(
    "group-events",
    () => groupEvents(events, filters),
    [events, filters],
    { threshold: 10 }
  );

  function onExport() {
    mark("export-csv", () => exportCsv(grouped));
  }

  return <ExportButton onClick={onExport} />;
}
```

## What this reveals

- Whether slow behavior is render time or computation time
- Which computed tasks exceed your threshold
- Whether event handlers include hidden expensive steps

## Optimization ideas

- Shift heavy grouping to server or worker
- Narrow dependencies to only required primitives
- Cache intermediate data structures for repeated queries

## Expected outcome

- Fewer expensive task warnings
- Faster analytics and export interactions
- Better separation of render problems vs compute problems
