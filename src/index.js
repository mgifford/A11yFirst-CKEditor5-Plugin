// Umbrella plugin (all-in-one)
export { default, default as A11yFirstPlugin } from './a11yfirstplugin.js';

// Individual feature plugins (one per CKEditor 4 legacy plugin)
export { A11yHeadingPlugin } from './a11yheading.js';
export { A11yStylesComboPlugin } from './a11ystylescombo.js';
export { A11yLinkPlugin } from './a11ylink.js';
export { A11yImagePlugin } from './a11yimage.js';

// Shared command classes
export { A11yFirstAuditCommand, ScopedA11yAuditCommand } from './commands.js';

// Audit utilities
export { LEGACY_CATEGORY_MAP, toHeadingText, collectIssues, runA11yAudit } from './audit.js';
