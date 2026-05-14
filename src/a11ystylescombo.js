import { Plugin } from 'ckeditor5';
import { ScopedA11yAuditCommand } from './commands.js';

/**
 * Styles combo accessibility checks.
 *
 * Mirrors the CKEditor 4 `a11ystylescombo` plugin.
 *
 * Registers command: `a11yStylesComboAudit`
 *
 * Issues detected:
 * - Inline style attributes on paragraphs (prefer semantic class-based styles)
 */
export class A11yStylesComboPlugin extends Plugin {
    static get pluginName() {
        return 'A11yStylesComboPlugin';
    }

    init() {
        this.editor.commands.add(
            'a11yStylesComboAudit',
            new ScopedA11yAuditCommand(this.editor, ['stylescombo'])
        );
    }
}
