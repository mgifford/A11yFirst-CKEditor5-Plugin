import { Plugin } from 'ckeditor5';
import { ScopedA11yAuditCommand } from './commands.js';

/**
 * Link accessibility checks.
 *
 * Mirrors the CKEditor 4 `a11ylink` plugin.
 *
 * Registers command: `a11yLinkAudit`
 *
 * Issues detected:
 * - Links using unsafe `javascript:` URLs
 */
export class A11yLinkPlugin extends Plugin {
    static get pluginName() {
        return 'A11yLinkPlugin';
    }

    init() {
        this.editor.commands.add(
            'a11yLinkAudit',
            new ScopedA11yAuditCommand(this.editor, ['link'])
        );
    }
}
