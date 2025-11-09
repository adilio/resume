const t = require('../fn/tag');
const j = require('../fn/joinWithBetween');
const a = require('../fn/listTags');
const u = require('../fn/humanUrl');
const l = require('../fn/linkify');
const img = require('../fn/imgTag');

module.exports = function renderContact(resume, titles) {
    const basics = resume.basics || {};
    const location = basics.location || {};

    const contactSections = [];
    if (basics.url) {
        contactSections.push(`
            <section id="person-url" class="contact-item">
                ${t('h2#basics-url', titles.basicsUrl)}
                ${img('url', 'URL', 'icon', resume)}
                ${l(u(basics.url), basics.url, 'person-url-a')}
            </section>
        `);
    }
    if (basics.email) {
        contactSections.push(`
            <section id="person-email" class="contact-item">
                ${t('h2#basics-email', titles.basicsEmail)}
                ${img('email', 'E-mail', 'icon', resume)}
                ${l(basics.email, `mailto:${basics.email}`, 'person-email-a')}
            </section>
        `);
    }
    if (basics.phone) {
        contactSections.push(`
            <section id="person-phone" class="contact-item">
                ${t('h2#basics-phone', titles.basicsPhone)}
                ${img('phone', 'Phone', 'icon', resume)}
                ${t('p.person-phone-number', basics.phone)}
            </section>
        `);
    }
    if (location && Object.keys(location).length > 0) {
        contactSections.push(`
            <section id="person-location" class="contact-item">${j([
        t('h2#basics-location', titles.basicsLocation),
        img('location', 'Location', 'icon', resume),
        t('main.person-location-parts', j([
            t('span.person-location-address', location.address),
            t('span.person-location-postalCode', location.postalCode),
            t('span.person-location-city', location.city),
            t('span.person-location-region', location.region),
            t('span.person-location-countryCode', location.countryCode)
        ])),
    ])}</section>
        `);
    }

    const profiles = a(
        basics.profiles,
        obj => (obj.length > 3 ? 'div#profile-columns' : 'div#profile-list'),
        'div',
        'profile',
        undefined,
        p => l(`
                ${t(`span.profile-network.profile-network-${p.network}`, p.network)}
                ${img(p.network, p.network, 'icon', resume)}
                ${t('span.profile-username', p.username)}
            `, p.url, 'profile-url')
    );

    return `
        <section id="contact" class="list">
            ${t('h1#basics-contact', titles.contact)}
            <div id="contact-grid">
                ${contactSections.join('\n')}
            </div>
            ${profiles ? `
                <div class="contact-profiles">
                    ${t('h2#basics-profiles', titles.basicsProfiles)}
                    ${profiles}
                </div>
            ` : ''}
        </section>
    `.trim();
}
