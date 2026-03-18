// ==========================================
// VARIABLES GLOBALES
// ==========================================

let allProjects = [];
let currentProject = null;
let currentProjectIndex = -1;
let currentLightboxIndex = 0;

// Références lightbox (initialisées dans initLightbox)
let lightboxEl = null;
let lightboxImgEl = null;
let lightboxCounterEl = null;

// ==========================================
// LIGHTBOX — FONCTIONS
// ==========================================

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxDisplay();
    lightboxEl.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightboxEl.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(dir) {
    const total = currentProject.images.length;
    currentLightboxIndex = (currentLightboxIndex + dir + total) % total;
    updateLightboxDisplay();
}

function updateLightboxDisplay() {
    lightboxImgEl.src = currentProject.images[currentLightboxIndex];
    lightboxCounterEl.textContent = `${currentLightboxIndex + 1} / ${currentProject.images.length}`;
    const showNav = currentProject.images.length > 1;
    lightboxEl.querySelector('.lightbox-prev').style.display = showNav ? 'flex' : 'none';
    lightboxEl.querySelector('.lightbox-next').style.display = showNav ? 'flex' : 'none';
}

// ==========================================
// LIGHTBOX — INITIALISATION (events)
// ==========================================

function initLightbox() {
    lightboxEl = document.getElementById('lightbox');
    lightboxImgEl = lightboxEl.querySelector('.lightbox-image');
    lightboxCounterEl = lightboxEl.querySelector('.lightbox-counter');

    lightboxEl.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

    lightboxEl.querySelector('.lightbox-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });

    lightboxEl.querySelector('.lightbox-next').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });

    lightboxEl.addEventListener('click', (e) => {
        if (e.target === lightboxEl) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightboxEl.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

}

// ==========================================
// CHARGEMENT DES DONNÉES
// ==========================================

async function fetchProjects() {
    if (allProjects.length > 0) return;
    const response = await fetch('data/projects.json');
    const data = await response.json();
    allProjects = data.projects;
}

// ==========================================
// CHARGEMENT ET RENDU D'UN PROJET
// ==========================================

async function loadProject(id) {
    try {
        await fetchProjects();

        const index = allProjects.findIndex(p => p.id === id);
        if (index === -1) {
            window.location.href = 'index.html#projets';
            return;
        }

        currentProjectIndex = index;
        currentProject = allProjects[index];
        document.title = `${currentProject.title} — Jules Manucci Lasnon`;

        renderProject();
        renderPagination();
        renderOtherProjects();

    } catch (error) {
        console.error('Erreur lors du chargement du projet:', error);
        window.location.href = 'index.html#projets';
    }
}

// ==========================================
// RENDU DU PROJET
// ==========================================

function renderProject() {
    const container = document.getElementById('project-page');

    const galleryHTML = currentProject.images.map((src, i) =>
        `<img src="${src}" alt="${currentProject.title} — image ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}" data-index="${i}">`
    ).join('');

    const hasLongDesc = currentProject.longDescription &&
        currentProject.longDescription.replace(/<[^>]*>/g, '').trim().length > 0;

    const ficheFields = [
        { label: 'Adresse',         key: 'adresse' },
        { label: 'Programme',       key: 'programme' },
        { label: 'Surface',         key: 'surface' },
        { label: 'Coût',            key: 'cout' },
        { label: 'Phase',           key: 'phase' },
        { label: 'Livraison',       key: 'livraison' },
        { label: "Année d'études",  key: 'annee_etudes' },
        { label: 'Collaborateur(s)', key: 'collaborateur' },
    ];

    const ficheRows = ficheFields
        .filter(f => currentProject[f.key] && currentProject[f.key].toString().trim() !== '')
        .map(f => `<tr><th>${f.label}</th><td>${currentProject[f.key]}</td></tr>`)
        .join('');

    const ficheHTML = ficheRows ? `<table class="project-fiche">${ficheRows}</table>` : '';

    container.innerHTML = `
        <div class="container">
            <header class="project-header">
                <div class="project-meta">
                    <span>${currentProject.context}</span>
                    <span>•</span>
                    <span>${currentProject.year}</span>
                </div>
                <h1 class="project-title">${currentProject.title}</h1>
                <p class="project-short">${currentProject.shortDescription}</p>
                ${ficheHTML}
            </header>
        </div>
        <div class="project-gallery">
            ${galleryHTML}
        </div>
        ${hasLongDesc ? `
        <div class="container">
            <div class="project-long">${currentProject.longDescription}</div>
        </div>
        ` : ''}
    `;

    // Clic sur image → lightbox
    container.querySelectorAll('.project-gallery img').forEach(img => {
        img.addEventListener('click', () => openLightbox(parseInt(img.dataset.index)));
    });
}

// ==========================================
// PAGINATION PRÉCÉDENT / SUIVANT
// ==========================================

function renderPagination() {
    const container = document.getElementById('project-pagination');
    const prev = currentProjectIndex > 0 ? allProjects[currentProjectIndex - 1] : null;
    const next = currentProjectIndex < allProjects.length - 1 ? allProjects[currentProjectIndex + 1] : null;

    container.innerHTML = `
        <div class="container">
            <div class="pagination-inner">
                ${prev ? `
                <a href="#${prev.id}" class="pagination-link pagination-prev">
                    <span class="pagination-arrow">←</span>
                    <span class="pagination-label">Précédent</span>
                </a>` : '<div class="pagination-empty"></div>'}
                ${next ? `
                <a href="#${next.id}" class="pagination-link pagination-next">
                    <span class="pagination-label">Suivant</span>
                    <span class="pagination-arrow">→</span>
                </a>` : '<div class="pagination-empty"></div>'}
            </div>
        </div>
    `;
}

// ==========================================
// AUTRES PROJETS
// ==========================================

function renderOtherProjects() {
    const grid = document.getElementById('other-projects-grid');
    const others = allProjects.filter((_, i) => i !== currentProjectIndex);

    grid.innerHTML = others.map(p => `
        <a href="#${p.id}" class="other-project-card">
            <div class="other-project-thumb">
                <img src="${p.thumbnail}" alt="${p.title}" loading="lazy"
                    onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23e0e0dd%22 width=%22400%22 height=%22400%22/%3E%3C/svg%3E'">
            </div>
            <p class="other-project-name">${p.title}</p>
        </a>
    `).join('');
}

// ==========================================
// MENU MOBILE
// ==========================================

function initMobileMenu() {
    const burger = document.querySelector('.nav-burger');
    const burgerWrap = document.querySelector('.nav-burger-wrap');
    const links = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!burger || !links) return;

    const toggleMenu = () => {
        const isExpanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !isExpanded);
        burger.classList.toggle('active');
        links.classList.toggle('active');
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    };

    (burgerWrap || burger).addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.setAttribute('aria-expanded', 'false');
            burger.classList.remove('active');
            links.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ==========================================
// ROUTING PAR HASH
// ==========================================

function getIdFromHash() {
    return window.location.hash.slice(1) || null;
}

window.addEventListener('hashchange', async () => {
    const id = getIdFromHash();
    if (!id) {
        window.location.href = 'index.html#projets';
        return;
    }
    window.scrollTo(0, 0);
    await loadProject(id);
});

// ==========================================
// LANCEMENT
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
    // Initialisation des composants fixes en premier
    initLightbox();
    initMobileMenu();

    const id = getIdFromHash();
    if (!id) {
        window.location.href = 'index.html#projets';
        return;
    }

    await loadProject(id);
});
