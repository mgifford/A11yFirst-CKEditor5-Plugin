import { Plugin } from 'ckeditor5';
import { ScopedA11yAuditCommand } from './commands.js';

/**
 * Heading accessibility checks.
 *
 * Mirrors the CKEditor 4 `a11yheading` plugin.
 *
 * Registers command: `a11yHeadingAudit`
 *
 * Issues detected:
 * - Empty heading elements
 */
export class A11yHeadingPlugin extends Plugin {
    static get pluginName() {
        return 'A11yHeadingPlugin';
    }

    init() {
        this.editor.commands.add(
            'a11yHeadingAudit',
            new ScopedA11yAuditCommand(this.editor, ['heading'])
        );
    }
}
