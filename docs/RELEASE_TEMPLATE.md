# Release Template (Weekly)

Use this file as the repeatable release flow for `@rayan_hn/render-inspector`.

## 1) Pick the Release Goal

- Main user problem this release solves:
- Primary API touched:
- Supporting docs/examples to update:

## 2) Scope for `0.1.2` Candidate

- [ ] Add `useRenderReason` helper output format
- [ ] Add richer console grouping for prop changes
- [ ] Add Vite quickstart example
- [ ] Add Next.js App Router troubleshooting section
- [ ] Add "common perf anti-patterns" docs section

## 3) Implementation Checklist

- [ ] Update source + tests
- [ ] Update README examples
- [ ] Update `examples/` snippets
- [ ] Run:

```bash
npm run typecheck
npm run test
npm run build
npm run pack:check
```

## 4) Version and Publish

```bash
npm version patch
git push --follow-tags
npm run release
```

## 5) Post-Release Distribution

- [ ] Update changelog summary
- [ ] Post release notes on X
- [ ] Post dev summary on LinkedIn
- [ ] Publish mini article on Dev.to
- [ ] Share in one React/Next.js community

## 6) Changelog Draft Template

```md
## <VERSION> - <DATE>

### Added
- ...

### Improved
- ...

### Fixed
- ...

### Docs
- ...
```
