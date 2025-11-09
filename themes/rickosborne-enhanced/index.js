const fs = require('fs');
const path = require('path');

const t = require('./fn/tag');
const h = require('./fn/htmlEscape');

const resumeCSS = fs.readFileSync(path.join(__dirname, 'resume.css'), {encoding: 'utf8'});
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), {encoding: 'utf8'}));

const LAYOUT_DEFAULT = [
    {
        id: "top",
        sections: [
            "avatar",
            "basics",
            "contact"
        ]
    },
    {
        id: "left",
        sections: [
            "work",
            "projects",
            "awards",
            "publications"
        ]
    },
    {
        id: "right",
        sections: [
            "education",
            "skills",
            "certificates",
            "languages",
            "volunteer",
            "interests",
            "references"
        ]
    }
]

const TITLES = {
    contact: "Contact",
    basicsEmail: "E-mail",
    basicsLocation: "Location",
    basicsPhone: "Phone",
    basicsProfiles: "Profiles",
    basicsUrl: "URL",
    languages: "Languages",
    education: "Education",
    certificates: "Certificates",
    work: "Employment",
    projects: "Projects",
    volunteer: "Volunteering",
    publications: "Publications",
    awards: "Awards",
    skills: "Skills",
    interests: "Interests",
    references: "References"
};

const RENDERERS = {
    error: require('./section/error'),
    basics: require('./section/basics'),
    avatar: require('./section/avatar'),
    awards: require('./section/awards'),
    contact: require('./section/contact'),
    languages: require('./section/languages'),
    education: require('./section/education'),
    certificates: require('./section/certificates'),
    work: require('./section/work'),
    publications: require('./section/publications'),
    projects: require('./section/projects'),
    volunteer: require('./section/volunteer'),
    skills: require('./section/skills'),
    interests: require('./section/interests'),
    references: require('./section/references'),
};

function renderSection(resume, titles, sectionName) {
    const renderer = RENDERERS[sectionName] || RENDERERS.error;
    return renderer(resume, titles, sectionName);
}


function render(resume) {
    const basics = resume.basics || {};
    const meta = resume.meta || {};
    const config = meta.rickosborne || {};
    const layout = Array.isArray(config.layout) ? config.layout : LAYOUT_DEFAULT;
    const titles = Object.assign({}, TITLES, config.titles || {});
    const customCSS = Array.isArray(config.customCSS) ? config.customCSS.join("\n") : typeof config.customCSS === "string" ? config.customCSS : null;
    const fontFamily = config.fontFamily || 'Inter';
    const googleFontFamilyParam = config.googleFontFamilyParam || "Inter:wght@400;500;600;700&family=Merriweather:wght@700";
    return `
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Resume for ${h(basics.name)}</title>
${meta.canonical ? `<link rel="canonical" href="${h(meta.canonical)}">` : ''}
${meta.lastModified ? `<meta http-equiv="Last-Modified" content="${h(meta.lastModified)}">` : ''}
${meta.version ? `<meta http-equiv="Version" content="${h(meta.version)}">` : ''}
<meta http-equiv="Generator" content="${packageJson.name} ${packageJson.version}" about="Written by Rick Osborne (rickosborne.org)">
<style>
@import url('https://fonts.googleapis.com/css2?family=${googleFontFamilyParam}&display=swap');
body {
    font-family: '${h(fontFamily)}', 'Gentium Book Basic', 'Gentium Plus', 'Gentium Basic', 'Times New Roman', 'Times', ui-serif, serif;
}
</style>
<style>${resumeCSS}</style>
${customCSS ? `<style>${h(customCSS)}</style>` : ''}
</head>
<body class="${resume.basics.image && resume.basics.image !== '' ? 'has-image' : ''}">
<article id="resume">
${layout.map(area => t(`section#${area.id}`, area.sections.map(sectionName => renderSection(resume, titles, sectionName)).join("\n"))).join("\n")}
</article>
<footer class="no-print" id="how-to-print"><p>Save a PDF using your browser's Print-to-PDF functionality.  (Don't worry, this won't show up.)</p></footer>
</body>
</html>
    `.trim();
}

module.exports = {
    render: render,
};
