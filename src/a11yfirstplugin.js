import { Plugin, ButtonView } from 'ckeditor5';
import { A11yFirstAuditCommand } from './commands.js';
import { A11yHeadingPlugin } from './a11yheading.js';
import { A11yStylesComboPlugin } from './a11ystylescombo.js';
import { A11yLinkPlugin } from './a11ylink.js';
import { A11yImagePlugin } from './a11yimage.js';

export { A11yHeadingPlugin } from './a11yheading.js';
export { A11yStylesComboPlugin } from './a11ystylescombo.js';
export { A11yLinkPlugin } from './a11ylink.js';
export { A11yImagePlugin } from './a11yimage.js';

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
