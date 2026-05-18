# Publishing A11yFirst to npm and CKEditor.com

This guide walks through publishing the plugin to npm and submitting it to the CKEditor plugin marketplace.

## Prerequisites

Before you start, you need:

1. **npm account** — sign up at https://www.npmjs.com/
2. **Git access** — push rights to https://github.com/mgifford/A11yFirst-CKEditor5-Plugin
3. **Local authentication** — run `npm login` to authenticate your npm account locally
4. **GitHub account** with repo permissions — for creating releases

## Step 1: Pre-publication checklist

Before publishing, verify everything is ready:

```bash
# Run the full test suite
npm test

# Check that package contents are correct
npm pack --dry-run

# Verify no uncommitted changes
git status
```

Expected results:
- All tests pass (2/2)
- `--dry-run` output shows only `src/`, `test/`, and doc files (no node_modules, .git, etc.)
- `git status` shows a clean working directory

## Step 2: Update version and changelog

Update the version in `package.json` and document changes in `CHANGELOG.md`.

### Example version bump (0.1.0 → 0.2.0)

**package.json:**
```json
{
  "name": "ckeditor5-a11yfirst",
  "version": "0.2.0",
  ...
}
```

**CHANGELOG.md:**
```markdown
## 0.2.0 - 2026-05-14
- Added enhanced link validation
- Improved heading audit detection
- Updated documentation
- [Previous versions...]
```

Commit and push:
```bash
git add package.json CHANGELOG.md
git commit -m "Bump version to 0.2.0"
git push origin main
```

## Step 3: Publish to npm

Publish the package to the public npm registry:

```bash
npm publish --access public
```

This will:
1. Bundle the files listed in `package.json` `"files"` array
2. Upload to npm registry (https://www.npmjs.com/package/ckeditor5-a11yfirst)
3. Display the published package URL

Expected output:
```
npm notice
npm notice 📦 ckeditor5-a11yfirst@0.2.0
npm notice === Tarball Contents ===
npm notice ... [file listing] ...
npm notice === Tarball Details ===
npm notice name:          ckeditor5-a11yfirst
npm notice version:       0.2.0
npm notice filename:      ckeditor5-a11yfirst-0.2.0.tgz
npm notice published-as:  https://www.npmjs.com/package/ckeditor5-a11yfirst
```

## Step 4: Create a GitHub release

Tag the commit and create a release on GitHub:

```bash
# Create a git tag for this version
git tag v0.2.0

# Push the tag to GitHub
git push origin main --tags
```

Then on GitHub:
1. Navigate to https://github.com/mgifford/A11yFirst-CKEditor5-Plugin
2. Click **Releases** in the sidebar
3. Click **Draft a new release**
4. **Tag version:** v0.2.0 (select from dropdown)
5. **Release title:** v0.2.0 - [Descriptive title]
6. **Description:** Use the template from `SUBMISSION.md` (Git tag / release notes body)
7. Click **Publish release**

### Example release notes

Title:
```
v0.2.0 - Enhanced heading and link validation
```

Description:
```markdown
Enhanced CKEditor 5 accessibility audit plugin.

New features:
- Improved heading audit with better empty-heading detection
- Enhanced link validation with additional unsafe patterns
- Updated documentation with installation examples

Fixed:
- [Any bug fixes]

Migration notes:
- Existing `a11yFirst:report` event payload maintains backward compatibility
- No breaking changes to command APIs

Repository: https://github.com/mgifford/A11yFirst-CKEditor5-Plugin
npm: https://www.npmjs.com/package/ckeditor5-a11yfirst
```

## Step 5: Submit to CKEditor.com

The CKEditor plugin marketplace lists community plugins. To submit yours:

### 5a: Verify repository setup

Your GitHub repository should have:
1. **Topics** — Add these labels to the repo (Settings → Topics):
   - `ckeditor5-plugin`
   - `accessibility`
   - `a11y`

2. **Description** — Add a clear repository description (e.g., "Accessibility-first audit plugin for CKEditor 5")

3. **README** — Ensure it has:
   - Clear description of what the plugin does
   - Installation instructions
   - Usage examples
   - Link to npm package

4. **LICENSE** — MIT or compatible license (✓ already in place)

### 5b: Submit via CKEditor plugin directory

As of 2026, CKEditor plugin listings are managed at:
- Main marketplace: https://ckeditor.com/ckeditor-5/find-plugins/
- Submission/updates: Contact CKEditor team or submit a PR to their plugin registry repo

**Process:**
1. Visit https://github.com/ckeditor/ckeditor5 or the official plugin registry
2. Look for contribution guidelines or plugin submission instructions
3. Typically this involves:
   - Creating a PR that adds your plugin to their registry file
   - Including plugin metadata (name, description, repo URL, npm URL, topics)
   - Passing any automated checks (repo accessibility, npm package validation)

**What CKEditor reviews:**
- Package name follows `ckeditor5-*` convention ✓
- Repository is public and accessible ✓
- npm package is published and publicly available ✓
- README has clear installation and usage ✓
- License is present ✓
- Code quality and security (may run automated scans)

### 5c: Prepare submission metadata

Have this information ready when you submit:

| Field | Value |
|---|---|
| Plugin name | A11yFirst for CKEditor 5 |
| npm package | ckeditor5-a11yfirst |
| Repository URL | https://github.com/mgifford/A11yFirst-CKEditor5-Plugin |
| npm URL | https://www.npmjs.com/package/ckeditor5-a11yfirst |
| Description | Accessibility-first audit plugin for CKEditor 5, upgrading concepts from legacy CKEditor 4 a11y plugins. |
| Keywords | accessibility, a11y, audit, ckeditor5, plugin |
| Author | A11y First Contributors |
| License | MIT |
| Topics | ckeditor5-plugin, accessibility, a11y |

Use the templates in [SUBMISSION.md](SUBMISSION.md) for exact wording.

## Step 6: Verify publication

Once published, verify everything is live:

```bash
# Check npm package
npm info ckeditor5-a11yfirst

# Or visit:
# https://www.npmjs.com/package/ckeditor5-a11yfirst

# Check GitHub release
# https://github.com/mgifford/A11yFirst-CKEditor5-Plugin/releases

# Once submitted to CKEditor marketplace, verify it appears at:
# https://ckeditor.com/ckeditor-5/find-plugins/
```

## Troubleshooting

### "npm ERR! publish Failed PUT 403"
**Cause:** Not authenticated or no publish permissions
**Fix:** Run `npm logout` then `npm login` and re-authenticate

### "404 - Package name is not available"
**Cause:** Package name already exists on npm
**Fix:** Choose a different name in `package.json` and re-publish

### "npm ERR! You must sign up for private packages"
**Cause:** Publishing as private by default
**Fix:** Use `npm publish --access public` flag

### Package appears on npm but not on CKEditor.com
**Cause:** Submission hasn't been processed or accepted yet
**Fix:** Check CKEditor submission status or contact CKEditor support

## Future updates

For subsequent releases:

```bash
# 1. Make code changes and test
npm test

# 2. Bump version in package.json and update CHANGELOG.md
# (Use semantic versioning: MAJOR.MINOR.PATCH)

# 3. Commit
git add package.json CHANGELOG.md [any other changes]
git commit -m "Release v0.2.1: [description]"
git push origin main

# 4. Tag and release
git tag v0.2.1
git push origin main --tags

# 5. Publish to npm
npm publish --access public

# 6. Create GitHub release with same process as Step 4

# 7. Optional: Update CKEditor.com listing if needed
```

## Reference

- **npm docs:** https://docs.npmjs.com/
- **CKEditor 5 plugin development:** https://ckeditor.com/docs/ckeditor5/latest/framework/plugins/
- **CKEditor plugin marketplace:** https://ckeditor.com/ckeditor-5/find-plugins/
- **This package:** https://github.com/mgifford/A11yFirst-CKEditor5-Plugin
