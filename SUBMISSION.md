# Submission Templates

## Git tag / release title

v0.1.0 - Initial CKEditor 5 release of A11yFirst

## Git tag / release notes body

Initial public CKEditor 5 release of A11yFirst accessibility tooling.

Includes:
- Core command: `a11yFirstAudit`
- Scoped audit commands:
  - `a11yHeadingAudit`
  - `a11yStylesComboAudit`
  - `a11yLinkAudit`
  - `a11yImageAudit`
- Event payload for integrations: `a11yFirst:report`
- Legacy continuity mapping:
  - `a11yheading` -> `heading`
  - `a11ystylescombo` -> `stylescombo`
  - `a11ylink` -> `link`
  - `a11yimage` -> `image`

This release is package-only for submission and integration workflows, with no demo site included.

## ckeditor.com plugin listing draft

Name:
A11yFirst for CKEditor 5

Short description:
Accessibility-first audit plugin for CKEditor 5, upgrading concepts from legacy CKEditor 4 a11y plugins.

Long description:
A11yFirst for CKEditor 5 provides a practical accessibility audit layer for editor content. It includes one full audit command and scoped checks aligned with previous CKEditor 4 plugin families:

- Headings (`a11yheading`)
- Styles combo (`a11ystylescombo`)
- Links (`a11ylink`)
- Images (`a11yimage`)

Plugin output is available through the `a11yFirst:report` event, making it straightforward to connect with custom UI, moderation tools, editorial workflows, and CI checks.

Key features:
- Full audit command for quick checks
- Scoped commands for targeted review
- Legacy mapping metadata for migration
- Lightweight package suitable for production integration

Installation:
`npm install ckeditor5-a11yfirst`

Repository:
https://github.com/mgifford/A11yFirst-CKEditor5-Plugin

Package:
https://www.npmjs.com/package/ckeditor5-a11yfirst
