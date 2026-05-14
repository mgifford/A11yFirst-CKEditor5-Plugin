import { Command } from 'ckeditor5';
import { runA11yAudit } from './audit.js';

/**
 * Runs a full audit across all categories.
 */
export class A11yFirstAuditCommand extends Command {
    refresh() {
        this.isEnabled = true;
    }

    execute(options = {}) {
        return runA11yAudit(this.editor, options);
    }
}

/**
 * Runs an audit scoped to a specific set of categories.
 * Used by each individual feature plugin.
 */
export class ScopedA11yAuditCommand extends Command {
    constructor(editor, categories) {
        super(editor);
        this._categories = categories;
    }

    refresh() {
        this.isEnabled = this.editor.commands.get('a11yFirstAudit').isEnabled;
    }

    execute() {
        return this.editor.execute('a11yFirstAudit', { categories: this._categories });
    }
}
