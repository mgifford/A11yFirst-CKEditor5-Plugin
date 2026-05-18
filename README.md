# A11yFirst CKEditor 5 Plugin

Submission-ready CKEditor 5 plugin package that upgrades key concepts from legacy CKEditor 4 accessibility plugins.

## Legacy plugin continuity

This package maps CKEditor 4 plugin areas to CKEditor 5 audit categories:

- `a11yheading` -> `heading`
- `a11ystylescombo` -> `stylescombo`
- `a11ylink` -> `link`
- `a11yimage` -> `image`

## What is included for submission

Source layout:

```
src/
  audit.js            # Shared audit logic and issue collectors
  commands.js         # A11yFirstAuditCommand, ScopedA11yAuditCommand
  a11yheading.js      # A11yHeadingPlugin     (replaces CKEditor 4: a11yheading)
  a11ystylescombo.js  # A11yStylesComboPlugin (replaces CKEditor 4: a11ystylescombo)
  a11ylink.js         # A11yLinkPlugin        (replaces CKEditor 4: a11ylink)
  a11yimage.js        # A11yImagePlugin       (replaces CKEditor 4: a11yimage)
  a11yfirstplugin.js  # A11yFirstPlugin umbrella (requires all four above)
  index.js            # Package entry — exports everything
test/
  audit.test.js       # Automated tests
```

Other files: `package.json`, `CHANGELOG.md`, `LICENSE`, `SUBMISSION.md`, `PUBLISHING.md`.

No demo site is included.

## Installation

```bash
npm install ckeditor5-a11yfirst
```

## Built-in tests

This repository includes minimal automated tests in `test/audit.test.js` using Node's built-in test runner.

Covered now:

- Full audit execution returns a structured report payload.
- `a11yFirst:report` event is emitted.
- Category-scoped audits return only relevant findings.

Run tests:

```bash
npm test
```

## Install into CKEditor 5

### Step 1 — Install CKEditor 5 (if not already installed)

```bash
npm install ckeditor5
```

See the [CKEditor 5 installation guide](https://ckeditor.com/docs/ckeditor5/latest/getting-started/quick-start.html) for framework-specific setup (React, Vue, Angular, plain JS).

### Step 2 — Install this plugin

```bash
npm install ckeditor5-a11yfirst
```

### Step 3 — Add the plugin to your editor config

**Option A — All-in-one umbrella plugin** (recommended for most integrations)

Registers all four feature checks plus the `a11yFirstAudit` toolbar button.

```js
import { ClassicEditor } from 'ckeditor5';
import { A11yFirstPlugin } from 'ckeditor5-a11yfirst';

const editor = await ClassicEditor.create(document.querySelector('#editor'), {
    plugins: [
        // ...other CKEditor 5 plugins
        A11yFirstPlugin
    ],
    toolbar: [
        'heading', '|', 'bold', 'italic', 'link',
        '|', 'a11yFirstAudit'
    ]
});
```

**Option B — Individual feature plugins** (pick only what you need)

```js
import { ClassicEditor } from 'ckeditor5';
import {
    A11yHeadingPlugin,
    A11yStylesComboPlugin,
    A11yLinkPlugin,
    A11yImagePlugin
} from 'ckeditor5-a11yfirst';

const editor = await ClassicEditor.create(document.querySelector('#editor'), {
    plugins: [
        A11yHeadingPlugin,  // a11yheading equivalent
        A11yLinkPlugin,     // a11ylink equivalent
        A11yImagePlugin     // a11yimage equivalent
        // Add A11yStylesComboPlugin if you use htmlSupport paragraphs
    ]
});
```

### Step 4 — Listen for audit results

The plugin emits `a11yFirst:report` each time an audit command runs.

```js
editor.on('a11yFirst:report', (evt, data) => {
    if (!data.summary.passed) {
        console.warn('A11y issues found:', data.issues);
        // data.issues is an array of { category, code, message }
        // data.summary = { total, passed }
        // data.categories = categories that were checked
    }
});
```

### Step 5 — Trigger an audit programmatically (optional)

```js
// Run all checks
editor.execute('a11yFirstAudit');

// Run one category only
editor.execute('a11yImageAudit');
editor.execute('a11yLinkAudit');
editor.execute('a11yHeadingAudit');
editor.execute('a11yStylesComboAudit');
```

## Commands

- `a11yFirstAudit` runs all categories
- `a11yHeadingAudit` runs heading checks
- `a11yStylesComboAudit` runs style-related checks
- `a11yLinkAudit` runs link checks
- `a11yImageAudit` runs image checks

## CKEditor 4 split plugins in CKEditor 5

In CKEditor 5, you can choose either architecture:

- One umbrella plugin (recommended for submission simplicity): `A11yFirstPlugin`
- Multiple feature plugins (recommended for modular adoption):
  - `A11yHeadingPlugin`
  - `A11yStylesComboPlugin`
  - `A11yLinkPlugin`
  - `A11yImagePlugin`

### Option A: single umbrella plugin

Use `A11yFirstPlugin` to get all feature commands plus a unified toolbar button.

### Option B: modular feature plugins

```js
import { ClassicEditor } from 'ckeditor5';
import {
    A11yHeadingPlugin,
    A11yStylesComboPlugin,
    A11yLinkPlugin,
    A11yImagePlugin
} from 'ckeditor5-a11yfirst';

ClassicEditor.create(document.querySelector('#editor'), {
    plugins: [
        // ...other plugins
        A11yHeadingPlugin,
        A11yStylesComboPlugin,
        A11yLinkPlugin,
        A11yImagePlugin
    ]
});
```

This modular approach is the closest CKEditor 5 equivalent to how CKEditor 4 had separate plugins for different A11yFirst functionality.

## Demo-to-package feature matrix

Use this matrix to understand what from the migration demo belongs in this package versus what should live in optional add-ons.

| Demo feature area | Package core (this repo) | Optional companion plugin | Demo-only implementation |
|---|---|---|---|
| Heading checks (`a11yheading`) | Yes (`A11yHeadingPlugin`, `a11yHeadingAudit`) | Optional UI plugin for heading guidance panel | No |
| Styles checks (`a11ystylescombo`) | Yes (`A11yStylesComboPlugin`, `a11yStylesComboAudit`) | Optional ruleset plugin for editorial style policies | No |
| Link checks (`a11ylink`) | Yes (`A11yLinkPlugin`, `a11yLinkAudit`) | Optional link-properties workflow plugin | Rich modal/context-menu UX is demo-specific |
| Image checks (`a11yimage`) | Yes (`A11yImagePlugin`, `a11yImageAudit`) | Optional image-properties workflow plugin | Rich modal/context-menu UX is demo-specific |
| Unified audit run | Yes (`A11yFirstPlugin`, `a11yFirstAudit`) | Optional dashboard plugin to render report results | No |
| Audit event integration | Yes (`a11yFirst:report`) | Optional adapter plugins (analytics, CI, moderation) | No |
| Accessibility overlays (Sa11y, axe) | No | Yes, as separate integration package(s) | Demo includes opt-in wiring |
| Multi-mode demo pages (strict/image/link/style/list/table/checker) | No | Optional example app(s) | Yes |
| Custom toolbar widgets outside standard CKEditor UI components | No | Yes, if published as separate CKEditor plugins | Yes in current demo page |

### Recommended packaging strategy

- Keep this package focused on reusable commands, category checks, and event payload contracts.
- Move advanced modal/context-menu workflows into companion plugins if they need independent release cycles.
- Keep external runtime integrations (Sa11y, axe, custom checkers) outside the core package unless they become hard dependencies.

## Report event

The plugin emits `a11yFirst:report` with:

- `issues`: detected issues list
- `summary`: `{ total, passed }`
- `categories`: categories included in the run
- `legacyMap`: mapping from CKEditor 4 plugin names to CKEditor 5 categories

## Notes for ckeditor.com submission

- Publish the package to npm from this repository.
- Ensure repository topics include `ckeditor5-plugin` and `accessibility`.
- Include a release tag and changelog entry for each version.
- Keep peer dependency compatibility aligned with supported CKEditor 5 versions.

## NPM publish checklist

- Confirm version and notes in `package.json` and `CHANGELOG.md`
- Run tests locally
- Verify package contents with `npm pack --dry-run`
- Publish with `npm publish --access public`
- Create Git tag and GitHub release
- Submit plugin listing/update at ckeditor.com with npm + repository links

## Release commands

```bash
npm test
npm pack --dry-run
npm publish --access public
git tag v0.1.0
git push origin main --tags
```

## Submission copy templates

Release notes and ckeditor.com listing draft text are included in `SUBMISSION.md`.

Detailed npm publication and CKEditor submission workflow is documented in `PUBLISHING.md`.
