// ==========================================
// VARIABLES GLOBALES
// ==========================================

let projects = [];
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
    card.className = 'project-card fade-in';
    card.style.transitionDelay = `${index * 0.1}s`;
    card.dataset.projectId = project.id;
    
    // Image
    const imageDiv = document.createElement('div');
    imageDiv.className = 'project-card-image';
    
    const img = document.createElement('img');
    img.src = project.thumbnail;
    img.alt = project.title;
    img.onerror = function() {
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
    
    // Trouver la position où insérer le panneau (après la ligne de la carte cliquée)
    const cards = Array.from(grid.children).filter(el => el.classList.contains('project-card'));
    const clickedIndex = cards.indexOf(clickedCard);
    const columns = getGridColumns();
    const rowEndIndex = Math.ceil((clickedIndex + 1) / columns) * columns;
    
    // Insérer le panneau
    if (rowEndIndex >= cards.length) {
        grid.appendChild(panel);
    } else {
        grid.insertBefore(panel, cards[rowEndIndex]);
    }
    
    // Marquer la carte comme active
    cards.forEach(c => c.classList.remove('active'));
    clickedCard.classList.add('active');
    
    // Ouvrir le panneau avec animation
    setTimeout(() => {
        panel.classList.add('open');
        
        // Scroll vers le panneau
        setTimeout(() => {
            panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }, 50);
    
    currentOpenPanel = panel;
}

function createProjectPanel(project) {
    const panel = document.createElement('div');
    panel.className = 'project-detail-panel';
    panel.dataset.projectId = project.id;
    
    const content = document.createElement('div');
    content.className = 'project-detail-content';
    
    // Bouton fermer
    const closeBtn = document.createElement('button');
    closeBtn.className = 'project-detail-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Fermer');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeProjectPanel();
    });
    
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
        img.onerror = function() {
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
    const longDesc = document.createElement('div');
    longDesc.className = 'project-detail-long';
    longDesc.innerHTML = project.longDescription;
    
    // Assemblage
    content.appendChild(closeBtn);
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
    
    // Retirer la classe active de toutes les cartes
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.remove('active');
    });
    
    setTimeout(() => {
        if (panel.parentNode) {
            panel.parentNode.removeChild(panel);
        }
    }, 600);
    
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
    
    switch(e.key) {
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
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
}

// ==========================================
// INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initSmoothScroll();
    initStickyNav();
    observeElements();
});
