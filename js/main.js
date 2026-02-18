// ==========================================
// VARIABLES GLOBALES
// ==========================================

let projects = [];
let cvData = null;
let currentOpenPanel = null;
let currentLightboxIndex = 0;
let currentProjectImages = [];

// ==========================================
// CHARGEMENT DES PROJETS
// ==========================================

async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        projects = data.projects;
        displayProjects(projects);
    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
        const grid = document.getElementById('projects-grid');
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">Erreur lors du chargement des projets.</p>';
    }
}

// ==========================================
// CHARGEMENT DU CV
// ==========================================

async function loadCV() {
    try {
        const response = await fetch('data/cv.json');
        cvData = await response.json();
        displayCV(cvData);
    } catch (error) {
        console.error('Erreur lors du chargement du CV:', error);
    }
}

function displayCV(data) {
    // Info personnelle
    displayInfoPerso(data.info_perso);

    // Expériences
    displayExperiences(data.experiences);

    // Formations
    displayFormations(data.formations);

    // Logiciels
    displayLogiciels(data.logiciels);

    // Langues
    displayLangues(data.langues);

    // Intérêts
    displayInterets(data.interets);

    // Infos complémentaires
    displayInfosComp(data.infos_complementaires);

    // Observer pour animer les jauges au scroll
    observeSkillBars();
}

function displayInfoPerso(info) {
    const container = document.getElementById('cv-info-perso');
    if (!container) return;

    let html = '<div class="cv-info-perso-grid">';

    html += '<div class="cv-info-perso-identity">';
    html += `<h3 class="cv-info-perso-name">${info.nom}</h3>`;
    if (info.titre) {
        html += `<p class="cv-info-perso-titre">${info.titre}</p>`;
    }
    html += `<p class="cv-info-perso-birth">Né le ${info.date_naissance} à ${info.lieu_naissance}</p>`;
    html += '</div>';

    html += '<div class="cv-info-perso-contact">';
    if (info.email) {
        html += `<p class="cv-info-perso-line"><span class="cv-info-perso-label">Email</span><a href="mailto:${info.email}">${info.email}</a></p>`;
    }
    if (info.telephone) {
        html += `<p class="cv-info-perso-line"><span class="cv-info-perso-label">Tél.</span><a href="tel:${info.telephone.replace(/\s/g, '')}">${info.telephone}</a></p>`;
    }
    html += '</div>';

    if (info.adresses && info.adresses.length > 0) {
        const filledAddresses = info.adresses.filter(a => a.valeur);
        if (filledAddresses.length > 0) {
            html += '<div class="cv-info-perso-addresses">';
            filledAddresses.forEach(addr => {
                html += `<p class="cv-info-perso-line"><span class="cv-info-perso-label">${addr.label}</span>${addr.valeur}</p>`;
            });
            html += '</div>';
        }
    }

    html += '</div>';
    container.innerHTML = html;
}

function displayExperiences(experiences) {
    const container = document.getElementById('cv-experiences');
    if (!container) return;

    container.innerHTML = '';

    experiences.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'cv-item';

        const year = document.createElement('div');
        year.className = 'cv-year';
        year.textContent = exp.periode;

        const details = document.createElement('div');
        details.className = 'cv-details';

        let html = `<h4>${exp.poste}</h4>`;

        if (exp.entreprise) {
            html += `<div class="cv-entreprise">${exp.entreprise}</div>`;
        }

        if (exp.lieu) {
            html += `<div class="cv-lieu">${exp.lieu}</div>`;
        }

        if (exp.description) {
            html += `<p>${exp.description}</p>`;
        }

        if (exp.taches && exp.taches.length > 0) {
            html += '<ul class="cv-taches">';
            exp.taches.forEach(tache => {
                html += `<li>${tache}</li>`;
            });
            html += '</ul>';
        }

        details.innerHTML = html;

        item.appendChild(year);
        item.appendChild(details);
        container.appendChild(item);
    });
}

function displayFormations(formations) {
    const container = document.getElementById('cv-formations');
    if (!container) return;

    container.innerHTML = '';

    formations.forEach(form => {
        const item = document.createElement('div');
        item.className = 'cv-item';

        const year = document.createElement('div');
        year.className = 'cv-year';
        year.textContent = form.periode;

        const details = document.createElement('div');
        details.className = 'cv-details';

        let html = `<h4>${form.diplome}</h4>`;

        if (form.etablissement) {
            html += `<div class="cv-entreprise">${form.etablissement}</div>`;
        }

        if (form.mention) {
            html += `<span class="cv-mention">${form.mention}</span>`;
        }

        if (form.details) {
            html += `<p>${form.details}</p>`;
        }

        if (form.taches && form.taches.length > 0) {
            html += '<ul class="cv-taches">';
            form.taches.forEach(tache => {
                html += `<li>${tache}</li>`;
            });
            html += '</ul>';
        }

        details.innerHTML = html;

        item.appendChild(year);
        item.appendChild(details);
        container.appendChild(item);
    });
}

function displayLogiciels(logiciels) {
    const container = document.getElementById('cv-logiciels');
    if (!container) return;

    container.innerHTML = '';

    // Trier par fréquence d'usage décroissante
    const sorted = [...logiciels].sort((a, b) => (b.frequence || 0) - (a.frequence || 0));

    sorted.forEach(log => {
        const item = document.createElement('div');
        item.className = 'cv-skill-item';

        const header = document.createElement('div');
        header.className = 'cv-skill-header';

        const left = document.createElement('div');
        const name = document.createElement('span');
        name.className = 'cv-skill-name';
        name.textContent = log.nom;
        left.appendChild(name);

        if (log.categorie) {
            const cat = document.createElement('span');
            cat.className = 'cv-skill-categorie';
            cat.textContent = ` • ${log.categorie}`;
            left.appendChild(cat);
        }

        header.appendChild(left);

        item.appendChild(header);

        // Jauge seulement si niveau > 0
        if (log.niveau > 0) {
            const bar = document.createElement('div');
            bar.className = 'cv-skill-bar';

            const fill = document.createElement('div');
            fill.className = 'cv-skill-fill';
            fill.dataset.level = log.niveau;

            bar.appendChild(fill);
            item.appendChild(bar);
        } else if (log.note) {
            const note = document.createElement('div');
            note.className = 'cv-skill-note';
            note.textContent = log.note;
            item.appendChild(note);
        }

        container.appendChild(item);
    });
}

function displayLangues(langues) {
    const container = document.getElementById('cv-langues');
    if (!container) return;

    container.innerHTML = '';

    const niveauMap = {
        'Notions': 1,
        'Bases': 2,
        'Intermédiaire': 3,
        'Courant': 4,
        'Excellent': 5,
        'Natif': 6
    };

    langues.forEach(lang => {
        const item = document.createElement('div');
        item.className = 'cv-langue-item';

        const gaugeContainer = document.createElement('div');
        gaugeContainer.className = 'cv-langue-gauge-container';

        const level = niveauMap[lang.niveau] || 3;
        const angle = -90 + ((level - 1) / 5) * 180;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 60');
        svg.setAttribute('class', 'cv-langue-gauge');

        for (let i = 0; i < 6; i++) {
            const tickAngle = -90 + (i / 5) * 180;
            const tickRad = (tickAngle * Math.PI) / 180;
            const x1 = 50 + 38 * Math.cos(tickRad);
            const y1 = 50 + 38 * Math.sin(tickRad);
            const x2 = 50 + 45 * Math.cos(tickRad);
            const y2 = 50 + 45 * Math.sin(tickRad);

            const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            tick.setAttribute('x1', x1);
            tick.setAttribute('y1', y1);
            tick.setAttribute('x2', x2);
            tick.setAttribute('y2', y2);
            tick.setAttribute('class', 'cv-gauge-tick');
            svg.appendChild(tick);
        }

        const arcBg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arcBg.setAttribute('d', 'M 5 50 A 45 45 0 0 1 95 50');
        arcBg.setAttribute('class', 'cv-gauge-arc-bg');
        svg.appendChild(arcBg);

        const arcFill = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const fillAngle = ((level - 1) / 5) * 180;
        const fillRad = (fillAngle * Math.PI) / 180;
        const endX = 50 - 45 * Math.cos(fillRad);
        const endY = 50 - 45 * Math.sin(fillRad);
        const largeArc = fillAngle > 180 ? 1 : 0;
        arcFill.setAttribute('d', `M 5 50 A 45 45 0 ${largeArc} 1 ${endX} ${endY}`);
        arcFill.setAttribute('class', 'cv-gauge-arc-fill');
        arcFill.dataset.level = level;
        svg.appendChild(arcFill);

        const needle = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        needle.setAttribute('class', 'cv-gauge-needle');
        needle.dataset.angle = angle;
        needle.innerHTML = `
            <line x1="50" y1="50" x2="50" y2="12" class="cv-gauge-needle-line"/>
            <circle cx="50" cy="50" r="4" class="cv-gauge-needle-center"/>
        `;
        svg.appendChild(needle);

        gaugeContainer.appendChild(svg);

        const nom = document.createElement('div');
        nom.className = 'cv-langue-nom';
        nom.textContent = lang.langue;

        const niveauText = document.createElement('div');
        niveauText.className = 'cv-langue-niveau-text';
        niveauText.textContent = lang.niveau;

        item.appendChild(gaugeContainer);
        item.appendChild(nom);
        item.appendChild(niveauText);
        container.appendChild(item);
    });

    observeLangueGauges();
}

function observeLangueGauges() {
    const needles = document.querySelectorAll('.cv-gauge-needle');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const needle = entry.target;
                const angle = parseFloat(needle.dataset.angle);
                setTimeout(() => {
                    needle.style.transform = `rotate(${angle}deg)`;
                    needle.classList.add('animate');
                }, 100);
                observer.unobserve(needle);
            }
        });
    }, { threshold: 0.3 });

    needles.forEach(needle => observer.observe(needle));
}

function displayInterets(interets) {
    const container = document.getElementById('cv-interets');
    if (!container) return;

    container.innerHTML = '';

    const ul = document.createElement('ul');
    ul.className = 'cv-interets-simple-list';

    interets.forEach(interet => {
        const li = document.createElement('li');
        li.textContent = interet;
        ul.appendChild(li);
    });

    container.appendChild(ul);
}

function displayInfosComp(infos) {
    const container = document.getElementById('cv-infos-comp');
    if (!container || !infos || infos.length === 0) return;

    container.innerHTML = '';

    infos.forEach(info => {
        const p = document.createElement('p');
        p.className = 'cv-info-comp-item';
        p.textContent = info;
        container.appendChild(p);
    });
}

function observeSkillBars() {
    const skillBars = document.querySelectorAll('.cv-skill-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const level = parseInt(fill.dataset.level);
                const percentage = (level / 10) * 100;

                setTimeout(() => {
                    fill.style.width = `${percentage}%`;
                    fill.classList.add('animate');
                }, 100);

                observer.unobserve(fill);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => observer.observe(bar));
}

function displayProjects(projects) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    projects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        grid.appendChild(card);
    });

    observeElements();
}

function createProjectCard(project, index) {
    const card = document.createElement('article');
    // Suppression de l'animation d'apparition ('fade-in')
    card.className = 'project-card';
    // card.style.transitionDelay removed
    card.dataset.projectId = project.id;

    // Image
    const imageDiv = document.createElement('div');
    imageDiv.className = 'project-card-image';

    const img = document.createElement('img');
    img.src = project.thumbnail;
    img.alt = project.title;
    img.onerror = function () {
        this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect fill='%23e0e0dd' width='400' height='500'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='sans-serif' font-size='18'%3E${encodeURIComponent(project.title)}%3C/text%3E%3C/svg%3E`;
    };

    imageDiv.appendChild(img);

    // Titre
    const title = document.createElement('h3');
    title.className = 'project-card-title';
    title.textContent = project.title;

    // Métadonnées
    const meta = document.createElement('div');
    meta.className = 'project-card-meta';
    meta.innerHTML = `
        <span>${project.context}</span>
        <span>•</span>
        <span>${project.year}</span>
    `;

    // Description
    const description = document.createElement('p');
    description.className = 'project-card-description';
    description.textContent = project.shortDescription;

    // Assemblage
    card.appendChild(imageDiv);
    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(description);

    // Événement clic
    card.addEventListener('click', () => toggleProjectPanel(project, card));

    return card;
}

// ==========================================
// GESTION DU PANNEAU DÉPLOYABLE
// ==========================================

function toggleProjectPanel(project, clickedCard) {
    const grid = document.getElementById('projects-grid');
    const existingPanel = document.querySelector('.project-detail-panel');

    // Si on clique sur la carte du projet déjà ouvert, on le ferme
    if (existingPanel && existingPanel.dataset.projectId === project.id) {
        closeProjectPanel();
        clickedCard.classList.remove('active');
        return;
    }

    // Fermer le panneau précédent s'il existe
    if (existingPanel) {
        closeProjectPanel();
    }

    // Créer et insérer le nouveau panneau
    const panel = createProjectPanel(project);

    // Insérer le panneau directement dans le body (overlay)
    document.body.appendChild(panel);

    // Marquer la carte comme active
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(c => c.classList.remove('active'));
    clickedCard.classList.add('active');

    // Ouvrir le panneau avec animation
    setTimeout(() => {
        panel.classList.add('open');
    }, 50);

    // Bloquer le scroll de la page
    document.body.style.overflow = 'hidden';

    // Fermer avec la touche Escape
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeProjectPanel();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);

    currentOpenPanel = panel;
}

function createProjectPanel(project) {
    const panel = document.createElement('div');
    panel.className = 'project-detail-panel';
    panel.dataset.projectId = project.id;

    // Fermer en cliquant sur le fond noir
    panel.addEventListener('click', (e) => {
        if (e.target === panel) {
            closeProjectPanel();
        }
    });

    const content = document.createElement('div');
    content.className = 'project-detail-content';

    // Bouton retour (flèche)
    const closeBtn = document.createElement('button');
    closeBtn.className = 'project-detail-close';
    closeBtn.innerHTML = '↩';
    closeBtn.setAttribute('aria-label', 'Fermer');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeProjectPanel();
    });

    panel.appendChild(closeBtn);

    // Header
    const header = document.createElement('div');
    header.className = 'project-detail-header';

    const meta = document.createElement('div');
    meta.className = 'project-detail-meta';
    meta.innerHTML = `
        <span>${project.context}</span>
        <span>•</span>
        <span>${project.year}</span>
    `;

    const title = document.createElement('h2');
    title.className = 'project-detail-title';
    title.textContent = project.title;

    const shortDesc = document.createElement('p');
    shortDesc.className = 'project-detail-short';
    shortDesc.textContent = project.shortDescription;

    header.appendChild(meta);
    header.appendChild(title);
    header.appendChild(shortDesc);

    // Galerie
    const gallery = document.createElement('div');
    gallery.className = 'project-detail-gallery';

    project.images.forEach((imageSrc, index) => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `${project.title} - Image ${index + 1}`;
        img.loading = 'lazy';
        img.onerror = function () {
            this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Crect fill='%23e0e0dd' width='1200' height='800'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='sans-serif' font-size='24'%3EImage ${index + 1}%3C/text%3E%3C/svg%3E`;
        };

        // Clic sur image → lightbox
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(project.images, index);
        });

        gallery.appendChild(img);
    });

    // Description longue
    // Authenticate
    // description longue
    const longDesc = document.createElement('div');
    longDesc.className = 'project-detail-long';
    longDesc.innerHTML = project.longDescription;

    // Assemblage
    content.appendChild(header);
    content.appendChild(gallery);
    content.appendChild(longDesc);
    panel.appendChild(content);

    return panel;
}

function closeProjectPanel() {
    const panel = document.querySelector('.project-detail-panel');
    if (!panel) return;

    panel.classList.remove('open');

    // Débloquer le scroll de la page
    document.body.style.overflow = '';

    // Retirer la classe active de toutes les cartes
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.remove('active');
    });

    setTimeout(() => {
        if (panel.parentNode) {
            panel.parentNode.removeChild(panel);
        }
    }, 400);

    currentOpenPanel = null;
}

function getGridColumns() {
    const grid = document.getElementById('projects-grid');
    const gridStyle = window.getComputedStyle(grid);
    const columns = gridStyle.gridTemplateColumns.split(' ').length;
    return columns;
}

// ==========================================
// LIGHTBOX (GALERIE PLEIN ÉCRAN)
// ==========================================

function openLightbox(images, startIndex) {
    currentProjectImages = images;
    currentLightboxIndex = startIndex;

    // Créer le lightbox s'il n'existe pas
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = createLightbox();
        document.body.appendChild(lightbox);
    }

    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';

    const content = document.createElement('div');
    content.className = 'lightbox-content';

    const img = document.createElement('img');
    img.className = 'lightbox-image';
    img.alt = 'Image du projet';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Fermer');
    closeBtn.addEventListener('click', closeLightbox);

    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-prev';
    prevBtn.innerHTML = '‹';
    prevBtn.setAttribute('aria-label', 'Précédent');
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-next';
    nextBtn.innerHTML = '›';
    nextBtn.setAttribute('aria-label', 'Suivant');
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });

    const counter = document.createElement('div');
    counter.className = 'lightbox-counter';

    content.appendChild(img);
    lightbox.appendChild(content);
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    lightbox.appendChild(counter);

    // Fermer en cliquant sur le fond
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation clavier
    document.addEventListener('keydown', handleLightboxKeyboard);

    return lightbox;
}

function updateLightboxImage() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const img = lightbox.querySelector('.lightbox-image');
    const counter = lightbox.querySelector('.lightbox-counter');

    img.src = currentProjectImages[currentLightboxIndex];
    counter.textContent = `${currentLightboxIndex + 1} / ${currentProjectImages.length}`;

    // Gérer la visibilité des boutons
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    if (currentProjectImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;

    // Boucle
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = currentProjectImages.length - 1;
    } else if (currentLightboxIndex >= currentProjectImages.length) {
        currentLightboxIndex = 0;
    }

    updateLightboxImage();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    lightbox.classList.remove('active');
    document.body.style.overflow = '';

    setTimeout(() => {
        if (lightbox.parentNode) {
            lightbox.parentNode.removeChild(lightbox);
        }
        document.removeEventListener('keydown', handleLightboxKeyboard);
    }, 300);
}

function handleLightboxKeyboard(e) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            navigateLightbox(-1);
            break;
        case 'ArrowRight':
            navigateLightbox(1);
            break;
    }
}

// ==========================================
// ANIMATIONS AU SCROLL
// ==========================================

function observeElements() {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => observer.observe(element));
}

// ==========================================
// NAVIGATION SMOOTH
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// NAVIGATION STICKY
// ==========================================

function initStickyNav() {
    const nav = document.querySelector('.nav');
    const hero = document.getElementById('hero');

    if (!hero) {
        // Fallback: show nav immediately if no hero
        nav.classList.remove('nav-hidden');
        nav.classList.add('nav-visible');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hero is visible → hide nav
                nav.classList.remove('nav-visible');
                nav.classList.add('nav-hidden');
            } else {
                // Hero is gone → show nav
                nav.classList.remove('nav-hidden');
                nav.classList.add('nav-visible');
                nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(hero);
}

// ==========================================
// MENU MOBILE
// ==========================================

function initMobileMenu() {
    const burger = document.querySelector('.nav-burger');
    const links = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!burger || !links) return;

    // Toggle menu
    burger.addEventListener('click', () => {
        const isExpanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !isExpanded);
        burger.classList.toggle('active');
        links.classList.toggle('active');

        // Bloquer le scroll quand le menu est ouvert
        if (!isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Fermer le menu au clic sur un lien
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
// INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadCV();
    initSmoothScroll();
    initStickyNav();
    initMobileMenu();
    observeElements();
});
