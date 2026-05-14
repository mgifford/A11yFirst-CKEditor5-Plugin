import { Plugin } from 'ckeditor5';
import { ScopedA11yAuditCommand } from './commands.js';

/**
 * Image accessibility checks.
 *
 * Mirrors the CKEditor 4 `a11yimage` plugin.
 *
 * Registers command: `a11yImageAudit`
 *
 * Issues detected:
 * - Block and inline images missing alt text
 */
export class A11yImagePlugin extends Plugin {
    static get pluginName() {
        return 'A11yImagePlugin';
    }

    init() {
        this.editor.commands.add(
            'a11yImageAudit',
            new ScopedA11yAuditCommand(this.editor, ['image'])
        );
    }
}
