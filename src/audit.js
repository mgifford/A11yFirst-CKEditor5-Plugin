export const LEGACY_CATEGORY_MAP = {
    a11yheading: 'heading',
    a11ystylescombo: 'stylescombo',
    a11ylink: 'link',
    a11yimage: 'image'
};

export function toHeadingText(item) {
    if (!item || !item.is || !item.is('element')) {
        return '';
    }

    return Array.from(item.getChildren())
        .map(child => (child.is && child.is('$textProxy') ? child.data : ''))
        .join('')
        .trim();
}

export function collectIssues(editor, categories = Object.values(LEGACY_CATEGORY_MAP)) {
    const model = editor.model;
    const root = model.document.getRoot();
    const issues = [];

    for (const value of model.createRangeIn(root).getWalker({ ignoreElementEnd: true })) {
        const item = value.item;

        if (categories.includes('image') && item.is('element') && (item.name === 'imageBlock' || item.name === 'imageInline') && !item.getAttribute('alt')) {
            issues.push({
                category: 'a11yimage',
                code: 'missing-image-alt',
                message: 'Image is missing alt text.'
            });
        }

        if (categories.includes('link') && item.is('$textProxy')) {
            const href = item.getAttribute('linkHref');
            if (typeof href === 'string' && href.trim().toLowerCase().startsWith('javascript:')) {
                issues.push({
                    category: 'a11ylink',
                    code: 'unsafe-link-href',
                    message: 'Link uses an unsafe javascript: URL.'
                });
            }
        }

        if (categories.includes('heading') && item.is('element') && item.name === 'heading1') {
            const headingText = toHeadingText(item);
            if (!headingText) {
                issues.push({
                    category: 'a11yheading',
                    code: 'empty-heading',
                    message: 'Heading is empty.'
                });
            }
        }

        if (categories.includes('stylescombo') && item.is('element') && item.name === 'paragraph' && item.getAttribute('htmlSupport')) {
            issues.push({
                category: 'a11ystylescombo',
                code: 'inline-style-detected',
                message: 'Inline style support detected on paragraph. Prefer semantic class-based styles.'
            });
        }
    }

    return issues;
}

export function runA11yAudit(editor, options = {}) {
    const categories = options.categories || Object.values(LEGACY_CATEGORY_MAP);
    const issues = collectIssues(editor, categories);

    const data = {
        issues,
        summary: {
            total: issues.length,
            passed: issues.length === 0
        },
        categories,
        legacyMap: LEGACY_CATEGORY_MAP
    };

    editor.fire('a11yFirst:report', data);

    return data;
}
