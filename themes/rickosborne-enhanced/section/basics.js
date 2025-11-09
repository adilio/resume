// noinspection JSDeprecatedSymbols

const t = require('../fn/tag');
const h = require('../fn/htmlEscape');
const j = require('../fn/joinWithBetween');

module.exports = function renderBasics(resume) {
    const basics = resume.basics || {};
    const summary = [];
    if (typeof basics.summary === 'string' && basics.summary.trim() !== '') {
        basics.summary
            .split(/\n{2,}/)
            .map(paragraph => paragraph.trim())
            .filter(Boolean)
            .forEach((paragraph, index) => {
                summary.push(t(index === 0 ? 'p#person-summary.summary-paragraph' : 'p.summary-paragraph', h(paragraph)));
            });
    }
    if (Array.isArray(basics.summaryHighlights) && basics.summaryHighlights.length > 0) {
        summary.push(
            t(
                'ul.summary-highlights',
                basics.summaryHighlights
                    .map(point => t('li', h(point)))
                    .join('')
            )
        );
    }

    return `
        <header id="basics">${j([
        t('h1#person-name', h(basics.name)),
        t('h2#person-label', h(basics.label)),
        summary.join('')
    ])}</header>
    `.trim();
}
