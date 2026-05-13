import test from 'node:test';
import assert from 'node:assert/strict';

import { runA11yAudit, LEGACY_CATEGORY_MAP } from '../src/audit.js';

function createElement(name, attrs = {}, children = []) {
    return {
        name,
        is(type) {
            return type === 'element';
        },
        getAttribute(attr) {
            return attrs[attr];
        },
        getChildren() {
            return children;
        }
    };
}

function createTextProxy(data, attrs = {}) {
    return {
        data,
        is(type) {
            return type === '$textProxy';
        },
        getAttribute(attr) {
            return attrs[attr];
        }
    };
}

function createMockEditor(items) {
    const fired = [];

    return {
        fired,
        model: {
            document: {
                getRoot() {
                    return {};
                }
            },
            createRangeIn() {
                return {
                    getWalker() {
                        return items.map(item => ({ item }));
                    }
                };
            }
        },
        fire(name, payload) {
            fired.push({ name, payload });
        }
    };
}

test('runA11yAudit returns report payload and fires event', () => {
    const items = [
        createElement('imageBlock', {}),
        createTextProxy('Click me', { linkHref: 'javascript:alert(1)' }),
        createElement('heading1', {}, [createTextProxy('')]),
        createElement('paragraph', { htmlSupport: true })
    ];

    const editor = createMockEditor(items);
    const report = runA11yAudit(editor);

    assert.equal(report.summary.total, 4);
    assert.equal(report.summary.passed, false);
    assert.equal(report.categories.length, 4);
    assert.deepEqual(report.legacyMap, LEGACY_CATEGORY_MAP);

    assert.equal(editor.fired.length, 1);
    assert.equal(editor.fired[0].name, 'a11yFirst:report');
    assert.equal(editor.fired[0].payload.summary.total, 4);
});

test('runA11yAudit supports category-scoped execution', () => {
    const items = [
        createElement('imageInline', {}),
        createTextProxy('Link', { linkHref: 'javascript:alert(2)' })
    ];

    const editor = createMockEditor(items);
    const report = runA11yAudit(editor, { categories: ['image'] });

    assert.equal(report.summary.total, 1);
    assert.equal(report.issues[0].category, 'a11yimage');
    assert.deepEqual(report.categories, ['image']);
});
