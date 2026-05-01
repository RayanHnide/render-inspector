# Contributing

Thanks for your interest in contributing to `@rayan_hn/render-inspector`.

## Development setup

```bash
git clone https://github.com/RayanHnide/render-inspector.git
cd render-inspector
npm install
```

## Local checks

Run this before opening a PR:

```bash
npm run typecheck
npm run test
npm run build
```

## Branch and PR flow

1. Create a branch from `main`.
2. Keep changes focused and small.
3. Update docs/examples for API behavior changes.
4. Open a PR using the PR template.

## Contribution types

- Bug fixes
- API improvements
- Example improvements (`examples/`)
- Documentation improvements
- Test coverage improvements

## Coding guidelines

- Use TypeScript strict-safe patterns.
- Keep hooks and utilities small and composable.
- Prefer clear naming over clever abstractions.
- Avoid breaking public API without release notes.

## Commit style (recommended)

Use clear commit messages:

- `feat: add X`
- `fix: resolve Y`
- `docs: improve Z`
- `test: add coverage for A`

## Issues and discussions

- Use bug template for defects.
- Use feature template for proposals.
- Include reproducible steps and expected behavior.
