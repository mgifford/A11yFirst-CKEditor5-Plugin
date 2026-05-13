# A11yFirst CKEditor 5 Plugin

Submission-ready CKEditor 5 plugin package that upgrades key concepts from legacy CKEditor 4 accessibility plugins.

## Legacy plugin continuity

This package maps CKEditor 4 plugin areas to CKEditor 5 audit categories:

- `a11yheading` -> `heading`
- `a11ystylescombo` -> `stylescombo`
- `a11ylink` -> `link`
- `a11yimage` -> `image`

## What is included for submission

- Source plugin code in `src/`
- Package metadata in `package.json`
- Change history in `CHANGELOG.md`
- License in `LICENSE`
- Installation and integration documentation in this file

No demo site is included.

## Installation

```bash
npm install ckeditor5-a11yfirst
```

## Usage

```js
import { ClassicEditor } from 'ckeditor5';
import { A11yFirstPlugin } from 'ckeditor5-a11yfirst';

ClassicEditor
    .create(document.querySelector('#editor'), {
        plugins: [
            // ...other plugins
            A11yFirstPlugin
        ],
        toolbar: [
            // ...other items
            'a11yFirstAudit'
        ]
    })
    .then(editor => {
        editor.on('a11yFirst:report', (evt, data) => {
            console.log('A11y report:', data);
        });
    });
```

## Commands

- `a11yFirstAudit` runs all categories
- `a11yHeadingAudit` runs heading checks
- `a11yStylesComboAudit` runs style-related checks
- `a11yLinkAudit` runs link checks
- `a11yImageAudit` runs image checks

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
