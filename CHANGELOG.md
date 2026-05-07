## [0.2.0](https://github.com/RayanHnide/render-inspector/compare/v0.1.5...v0.2.0) (2026-05-06)

### Features

* add growth-focused docs and npm positioning ([9302e2f](https://github.com/RayanHnide/render-inspector/commit/9302e2f0f147b90616a7df70ca57c1802226079a))

# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Changed

- Switched release pipeline to Semantic Release on `main` pushes via `.github/workflows/publish.yml`
- Added `.releaserc.json` to automate versioning, changelog updates, GitHub releases, tags, and npm publishing
- Retired Release Drafter config/workflow in favor of fully automated semantic releases
- Updated package metadata (`description`, keywords) to improve npm search discoverability
- Repositioned README top section for faster conversion with outcome-first messaging and comparisons

### Added

- Three practical growth/SEO recipe docs:
  - `docs/recipes/nextjs-dashboard-input-lag.md`
  - `docs/recipes/product-list-rerender-storm.md`
  - `docs/recipes/expensive-memo-debugging.md`
- New growth strategy refresh in `docs/GROWTH_PLAN.md` targeting 490 -> 1,500+ weekly downloads

## 0.1.5 - 2026-05-06

### Added

- New security and quality workflows: `codeql.yml` and `scorecard.yml`
- Dependabot automation for npm and GitHub Actions updates via `.github/dependabot.yml`
- Additional README trust badges for CodeQL, OpenSSF Scorecard, bundle size, and TypeScript readiness
- Automated release tooling with Release Drafter (`.github/release-drafter.yml`, `.github/workflows/release-drafter.yml`)
- npm publish automation workflow (`.github/workflows/publish.yml`) triggered from GitHub releases

### Improved

- Package metadata with `engines.node` and `funding` fields in `package.json`
- README with a dedicated "Quality and Security" section
- Publishing guide now includes automated GitHub release publishing

## 0.1.4 - 2026-05-01

### Added

- GitHub Actions CI workflow (typecheck, test, build) on `main` pushes and PRs
- Contributor and community documentation: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `ROADMAP.md`
- GitHub issue and pull request templates
- Initial `CHANGELOG.md` to track public release notes

### Improved

- README: CI status badge and contributor documentation entry points

## 0.1.3 - 2026-05-01

### Changed

- Version bump (no package content changes beyond `package.json` / `package-lock.json`)

## 0.1.2 - 2026-05-01

### Added

- Vite example snippet under `examples/vite-app/`
- Growth and release planning notes under `docs/`

### Improved

- README refresh for clearer positioning, examples, SEO keywords, and onboarding
- npm discoverability keywords in `package.json`

## 0.1.1 - 2026-05-01

### Changed

- Package metadata and repository link updates

## 0.1.0 - 2026-04-25

### Added

- Initial public release
