/**
 * Génération du CV PDF — Jules Manucci Lasnon
 * Usage : node scripts/generate-cv.js
 * Sortie : cv.pdf à la racine du projet
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const cvPath = path.join(__dirname, '..', 'data', 'cv.json');
const outputPath = path.join(__dirname, '..', 'cv.pdf');
const photoPath = path.join(__dirname, '..', 'images', 'profile', 'photo.png');

const cv = JSON.parse(fs.readFileSync(cvPath, 'utf8'));

// Encode photo en base64 pour l'embarquer dans le HTML
let photoBase64 = '';
if (fs.existsSync(photoPath)) {
    photoBase64 = 'data:image/png;base64,' + fs.readFileSync(photoPath).toString('base64');
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function tag(html) {
    return html || '';
}

function renderTaches(taches) {
    if (!taches || taches.length === 0) return '';
    return `<ul class="taches">${taches.map(t => `<li>${t}</li>`).join('')}</ul>`;
}

// ─── Sections ───────────────────────────────────────────────────────────────

function renderExperiences(items) {
    return items.map(e => `
        <div class="item">
            <div class="item-header">
                <div class="item-left">
                    <span class="item-title">${tag(e.entreprise)}</span>
                    ${e.poste && e.poste.trim() ? `<span class="item-sub">${e.poste}</span>` : ''}
                    ${e.lieu ? `<span class="item-detail">${e.lieu}</span>` : ''}
                    ${e.description && e.description.trim() ? `<span class="item-detail italic">${e.description}</span>` : ''}
                </div>
                <div class="item-right">
                    <span class="item-date">${e.date_debut} — ${e.date_fin}</span>
                </div>
            </div>
            ${renderTaches(e.taches)}
        </div>
    `).join('');
}

function renderFormations(items) {
    return items.map(f => `
        <div class="item">
            <div class="item-header">
                <div class="item-left">
                    <span class="item-title">${tag(f.diplome)}</span>
                    ${f.etablissement ? `<span class="item-sub">${f.etablissement}</span>` : ''}
                    ${f.details ? `<span class="item-detail">${f.details}</span>` : ''}
                    ${f.mention ? `<span class="item-mention">${f.mention}</span>` : ''}
                </div>
                <div class="item-right">
                    <span class="item-date">${f.date_debut} — ${f.date_fin}</span>
                </div>
            </div>
            ${renderTaches(f.taches)}
        </div>
    `).join('');
}

function renderLogiciels(items) {
    const sorted = [...items].sort((a, b) => (b.frequence || 0) - (a.frequence || 0)).slice(0, 12);
    return sorted.map(l => `
        <div class="skill-item">
            <div class="skill-header">
                <span class="skill-name">${l.nom}</span>
                <span class="skill-cat">${l.categorie}</span>
            </div>
            <div class="skill-bar-bg">
                <div class="skill-bar-fill" style="width: ${Math.round(l.niveau * 10)}%"></div>
            </div>
        </div>
    `).join('');
}

function renderLangues(items) {
    return items.map(l => `
        <div class="langue-item">
            <span class="langue-nom">${l.langue}</span>
            <span class="langue-niveau">${l.niveau}</span>
        </div>
    `).join('');
}

function renderInterets(items) {
    return items.map(i => `<span class="interet-tag">${i}</span>`).join('');
}

function renderInfosComp(items) {
    return items.map(i => `<li>${i}</li>`).join('');
}

// ─── Template HTML ───────────────────────────────────────────────────────────

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Work+Sans:wght@300;400;500;600&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
        --accent: #b8866f;
        --text: #1a1a1a;
        --light: #666;
        --bg: #fafaf8;
        --border: #d8d8d4;
    }

    html, body {
        width: 210mm;
        background: white;
        color: var(--text);
        font-family: 'Work Sans', sans-serif;
        font-weight: 300;
        font-size: 7.5pt;
        line-height: 1.4;
    }

    .page {
        width: 210mm;
        height: 297mm;
        padding: 9mm 11mm 8mm 11mm;
        overflow: hidden;
    }

    /* ── Header ── */
    .header {
        display: flex;
        align-items: center;
        gap: 7mm;
        margin-bottom: 4mm;
        padding-bottom: 3.5mm;
        border-bottom: 1.5px solid var(--text);
    }

    .header-photo {
        width: 18mm;
        height: 22mm;
        object-fit: cover;
        object-position: center top;
        flex-shrink: 0;
        filter: grayscale(15%);
    }

    .header-photo-placeholder {
        width: 18mm;
        height: 22mm;
        background: #e8e8e4;
        flex-shrink: 0;
    }

    .header-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .header-top-row {
        display: flex;
        align-items: baseline;
        gap: 4mm;
        margin-bottom: 1.5mm;
    }

    .header-name {
        font-family: 'Cormorant Garamond', serif;
        font-size: 19pt;
        font-weight: 400;
        letter-spacing: 0.02em;
        line-height: 1.05;
        color: var(--text);
    }

    .header-title {
        font-family: 'Work Sans', sans-serif;
        font-size: 8pt;
        font-weight: 300;
        color: var(--accent);
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .header-contact {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5mm 5mm;
    }

    .header-contact-item {
        font-size: 6.8pt;
        color: var(--light);
        display: flex;
        align-items: center;
        gap: 1mm;
    }

    .header-contact-item::before {
        content: '·';
        color: var(--accent);
        font-size: 9pt;
    }

    /* ── Layout 2 colonnes ── */
    .main-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6mm;
        margin-bottom: 4mm;
    }

    /* ── Section ── */
    .section { margin-bottom: 4mm; }

    .section-title {
        font-family: 'Work Sans', sans-serif;
        font-size: 6.5pt;
        font-weight: 500;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--accent);
        border-bottom: 0.75px solid var(--border);
        padding-bottom: 1mm;
        margin-bottom: 2.5mm;
    }

    /* ── Items ── */
    .item {
        margin-bottom: 2.5mm;
        page-break-inside: avoid;
    }

    .item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 2mm;
    }

    .item-left { flex: 1; }

    .item-title {
        display: block;
        font-family: 'Cormorant Garamond', serif;
        font-size: 9pt;
        font-weight: 500;
        line-height: 1.15;
    }

    .item-sub {
        display: block;
        font-size: 7pt;
        font-weight: 400;
        color: var(--text);
        margin-top: 0.3mm;
    }

    .item-detail {
        display: block;
        font-size: 6.5pt;
        color: var(--light);
        margin-top: 0.3mm;
    }

    .item-detail.italic { font-style: italic; }

    .item-mention {
        display: inline-block;
        font-size: 6.5pt;
        color: var(--accent);
        font-weight: 500;
        margin-top: 0.5mm;
        letter-spacing: 0.05em;
    }

    .item-right {
        flex-shrink: 0;
        text-align: right;
    }

    .item-date {
        font-size: 6.5pt;
        color: var(--light);
        white-space: nowrap;
    }

    .taches {
        margin-top: 1mm;
        margin-left: 3mm;
        list-style: none;
    }

    .taches li {
        font-size: 7pt;
        color: var(--text);
        line-height: 1.45;
        padding-left: 2.5mm;
        position: relative;
    }

    .taches li::before {
        content: '—';
        position: absolute;
        left: -2.5mm;
        color: var(--accent);
        font-size: 6.5pt;
    }

    /* ── Skills ── */
    .skills-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 2mm 5mm;
        margin-bottom: 4mm;
    }

    .skill-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 1mm;
        margin-bottom: 1mm;
    }

    .skill-name {
        font-size: 7pt;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-shrink: 1;
        min-width: 0;
    }

    .skill-cat {
        font-size: 5.8pt;
        color: var(--light);
        text-align: right;
        white-space: nowrap;
        flex-shrink: 0;
    }

    .skill-bar-bg {
        height: 0.8mm;
        background: #e2e2de;
        border-radius: 1mm;
        overflow: hidden;
    }

    .skill-bar-fill {
        height: 100%;
        background: var(--accent);
        border-radius: 1mm;
    }

    /* ── Bottom grid ── */
    .bottom-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 2fr;
        gap: 6mm;
        margin-bottom: 4mm;
    }

    /* ── Langues ── */
    .langue-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5mm;
        padding-bottom: 1mm;
        border-bottom: 0.5px solid var(--border);
    }

    .langue-nom { font-size: 7.5pt; font-weight: 400; }
    .langue-niveau { font-size: 6.5pt; color: var(--light); }

    /* ── Intérêts ── */
    .interets-wrap { display: flex; flex-wrap: wrap; gap: 1mm; }

    .interet-tag {
        font-size: 6.5pt;
        color: var(--light);
        border: 0.5px solid var(--border);
        padding: 0.5mm 1.5mm;
        border-radius: 0.5mm;
    }

    /* ── Infos comp ── */
    .infos-comp-list {
        list-style: none;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.8mm 4mm;
    }

    .infos-comp-list li {
        font-size: 7pt;
        color: var(--light);
        line-height: 1.4;
        padding-left: 2.5mm;
        position: relative;
    }

    .infos-comp-list li::before {
        content: '·';
        position: absolute;
        left: 0;
        color: var(--accent);
    }

    /* ── Footer ── */
    .footer {
        padding-top: 3mm;
        border-top: 0.5px solid var(--border);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .footer-text {
        font-size: 6pt;
        color: #aaa;
        letter-spacing: 0.05em;
    }
</style>
</head>
<body>
<div class="page">

    <!-- ── HEADER ── -->
    <header class="header">
        ${photoBase64
            ? `<img class="header-photo" src="${photoBase64}" alt="Jules Manucci Lasnon">`
            : `<div class="header-photo-placeholder"></div>`
        }
        <div class="header-info">
            <div class="header-top-row">
                <div class="header-name">${cv.info_perso.nom}</div>
                <div class="header-title">Architecte D.E.</div>
            </div>
            <div class="header-contact">
                <span class="header-contact-item">${cv.info_perso.email}</span>
                ${cv.info_perso.adresses.map(a => `<span class="header-contact-item">${a.valeur}</span>`).join('')}
                <span class="header-contact-item">Né le ${cv.info_perso.date_naissance}</span>
                <span class="header-contact-item">www.archi-j.fr</span>
            </div>
        </div>
    </header>

    <!-- ── EXPÉRIENCES + FORMATIONS ── -->
    <div class="main-grid">
        <div>
            <div class="section">
                <div class="section-title">Expérience Professionnelle</div>
                ${renderExperiences(cv.experiences)}
            </div>
        </div>
        <div>
            <div class="section">
                <div class="section-title">Formation</div>
                ${renderFormations(cv.formations)}
            </div>
        </div>
    </div>

    <!-- ── LOGICIELS ── -->
    <div class="section">
        <div class="section-title">Logiciels & Compétences Techniques</div>
        <div class="skills-grid">
            ${renderLogiciels(cv.logiciels)}
        </div>
    </div>

    <!-- ── LANGUES + INTÉRÊTS + INFOS COMP ── -->
    <div class="bottom-grid">
        <div class="section" style="margin-bottom:0">
            <div class="section-title">Langues</div>
            ${renderLangues(cv.langues)}
        </div>
        <div class="section" style="margin-bottom:0">
            <div class="section-title">Centres d'intérêt</div>
            <div class="interets-wrap">
                ${renderInterets(cv.interets)}
            </div>
        </div>
        <div class="section" style="margin-bottom:0">
            <div class="section-title">Informations complémentaires</div>
            <ul class="infos-comp-list">
                ${renderInfosComp(cv.infos_complementaires)}
            </ul>
        </div>
    </div>

    <!-- ── FOOTER ── -->
    <div class="footer">
        <span class="footer-text">Jules Manucci Lasnon — Architecte D.E.</span>
        <span class="footer-text">${cv.info_perso.email}</span>
    </div>

</div>
</body>
</html>`;

// ─── Génération PDF ───────────────────────────────────────────────────────────

(async () => {
    console.log('Lancement de Puppeteer…');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Attendre le chargement des polices Google Fonts
    await page.waitForFunction(() => document.fonts.ready);

    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();
    console.log(`✓ CV généré : ${outputPath}`);
})();
