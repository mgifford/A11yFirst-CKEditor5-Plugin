import { Plugin, Command, ButtonView } from 'ckeditor5';
import { runA11yAudit } from './audit.js';

/**
 * Scans editor content for a few common accessibility issues.
 */
export class A11yFirstAuditCommand extends Command {
    refresh() {
        this.isEnabled = true;
    }

    execute(options = {}) {
        return runA11yAudit(this.editor, options);
    }
}

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

export class A11yHeadingPlugin extends Plugin {
    static get pluginName() {
        return 'A11yHeadingPlugin';
    }

    init() {
        this.editor.commands.add('a11yHeadingAudit', new ScopedA11yAuditCommand(this.editor, ['heading']));
    }
}

export class A11yStylesComboPlugin extends Plugin {
    static get pluginName() {
        return 'A11yStylesComboPlugin';
    }

    init() {
        this.editor.commands.add('a11yStylesComboAudit', new ScopedA11yAuditCommand(this.editor, ['stylescombo']));
    }
}

export class A11yLinkPlugin extends Plugin {
    static get pluginName() {
        return 'A11yLinkPlugin';
    }

    init() {
        this.editor.commands.add('a11yLinkAudit', new ScopedA11yAuditCommand(this.editor, ['link']));
    }
}

export class A11yImagePlugin extends Plugin {
    static get pluginName() {
        return 'A11yImagePlugin';
    }

    init() {
        this.editor.commands.add('a11yImageAudit', new ScopedA11yAuditCommand(this.editor, ['image']));
    }
}

/**
 * Minimal CKEditor 5 proof-of-concept plugin.
 *
 * Adds:
 * - command: a11yFirstAudit
 * - toolbar button: a11yFirstAudit
 * - event with results: a11yFirst:report
 */
export default class A11yFirstPlugin extends Plugin {
    static get requires() {
        return [
            A11yHeadingPlugin,
            A11yStylesComboPlugin,
            A11yLinkPlugin,
            A11yImagePlugin
        ];
    }

    static get pluginName() {
        return 'A11yFirstPlugin';
    }

    init() {
        const editor = this.editor;

        editor.commands.add('a11yFirstAudit', new A11yFirstAuditCommand(editor));

        editor.ui.componentFactory.add('a11yFirstAudit', locale => {
            const command = editor.commands.get('a11yFirstAudit');
            const button = new ButtonView(locale);

            button.set({
                label: 'A11y Check',
                withText: true,
                tooltip: 'Run quick accessibility checks'
            });

            button.bind('isEnabled').to(command, 'isEnabled');

            this.listenTo(button, 'execute', () => {
                editor.execute('a11yFirstAudit');
            });

            return button;
        });
    }
}
