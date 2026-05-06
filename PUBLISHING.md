# Publishing Checklist

This package is published to npm as:

```txt
@rayan_hn/render-inspector
```

It is a **scoped** package, so the first publish (and every publish) must use
`--access public` — that's already wired into the `release` script below.

---

## 1. Verify the build is clean

```bash
npm install
npm run typecheck
npm run test
npm run build
npm run pack:check
```

The `prepublishOnly` hook reruns typecheck + test + build, so this is just a
sanity check.

---

## 2. Authenticate with npm

Pick **one** of the three options below. The legacy `Username:` / `Password:`
prompt that `npm login` shows is unreliable on modern accounts — prefer the
browser flow or a token.

### Option A — Browser login (recommended for local publishing)

```bash
npm logout            # clear any stale credentials
npm login             # press ENTER when it says "Press ENTER to open in the browser"
npm whoami            # should print: rayan_hn
```

Do **not** type into the `Username:` / `Password:` prompts — just hit Enter and
finish login + 2FA in the browser.

### Option B — Granular access token (recommended for CI / scripted publishes)

1. Go to <https://www.npmjs.com/> → avatar → **Access Tokens** →
   **Generate New Token** → **Granular Access Token**.
2. Set the **Packages and scopes** permission to **Read and write** for
   `@rayan_hn/*` (or this specific package). Pick a sensible expiry.
3. Copy the token and use it one of these ways:

**Per-shell environment variable (no file on disk):**

```bash
export NPM_TOKEN=npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
cp .npmrc.example .npmrc        # uses ${NPM_TOKEN} from the environment
npm whoami
```

**Or write the token directly into npm config (machine-wide):**

```bash
npm config set //registry.npmjs.org/:_authToken=npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
npm whoami
```

`.npmrc` is gitignored so a local token will never be committed.

### Option C — Reset password and use classic auth

Only do this if Options A and B are unavailable.

1. Reset your password at <https://www.npmjs.com/forgot>.
2. In **Account Settings → Two-Factor Authentication**, set 2FA to
   **Authorization only** (not "Authorization and writes") so login works with
   a one-time code.
3. Re-run `npm login` and supply the new password + OTP.

---

## 3. Publish (fully automated)

Publishing is handled by Semantic Release in GitHub Actions.

One-time setup:

- Add `NPM_TOKEN` in GitHub repository secrets with publish rights for `@rayan_hn/render-inspector`

Release flow:

1. Merge commits to `main` using Conventional Commit messages.
2. `Publish to npm` workflow runs on each push to `main`.
3. Semantic Release decides whether a new version is needed, then:
   - bumps `package.json` and `package-lock.json`
   - updates `CHANGELOG.md`
   - creates git tag and GitHub Release
   - publishes to npm

For a dry run in local development:

```bash
npm run release:ci:dry
```

---

## 4. Verify the release

```bash
npm view @rayan_hn/render-inspector version
```

Test the install in a scratch project:

```bash
npm install @rayan_hn/render-inspector
```

```tsx
import { useRenderCount } from "@rayan_hn/render-inspector";
```

---

## 5. Commit message rules (versioning)

```bash
fix: correct rerender threshold logic           # patch release
feat: add useRenderHeatmap hook                 # minor release
feat!: replace old provider API                 # major release
chore: update docs and workflows                # no release unless configured
```
