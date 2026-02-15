// ==========================================
// CHARGEMENT DES DÉTAILS DU PROJET
// ==========================================

async function loadProjectDetails() {
    // Récupérer l'ID du projet depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (!projectId) {
        showError('Aucun projet spécifié');
        return;
    }
    
    try {
        // Charger les données des projets
        const response = await fetch('data/projects.json');
        const data = await response.json();
        
        // Trouver le projet correspondant
        const project = data.projects.find(p => p.id === projectId);
        
        if (!project) {
            showError('Projet non trouvé');
            return;
        }
        
        // Afficher les détails du projet
        displayProjectDetails(project);
        
    } catch (error) {
        console.error('Erreur lors du chargement du projet:', error);
        showError('Erreur lors du chargement du projet');
    }
}

function displayProjectDetails(project) {
    // Titre de la page
    document.getElementById('page-title').textContent = `${project.title} - Portfolio Architecture`;
    
    // Métadonnées (contexte + année)
    document.getElementById('project-context').textContent = project.context;
    document.getElementById('project-year').textContent = project.year;
    
    // Titre du projet
    document.getElementById('project-title').textContent = project.title;
    
    // Sous-titre (contexte complet + année)
    document.getElementById('project-subtitle').textContent = project.shortDescription;
    
    // Description courte
    document.getElementById('project-description').textContent = project.shortDescription;
    
    // Description longue (avec HTML)
    document.getElementById('project-long-description').innerHTML = project.longDescription;
    
    // Galerie d'images
    displayGallery(project.images, project.title);
    
    // Ajouter les animations
    addAnimations();
}

function displayGallery(images, projectTitle) {
    const gallery = document.getElementById('project-gallery');
    gallery.innerHTML = '';
    
    images.forEach((imageSrc, index) => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `${projectTitle} - Image ${index + 1}`;
        img.loading = 'lazy';
        
        // Créer un SVG placeholder en cas d'erreur
        img.onerror = function() {
            this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Crect fill='%23e0e0dd' width='1200' height='800'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='sans-serif' font-size='24'%3EImage ${index + 1}%3C/text%3E%3C/svg%3E`;
        };
        
        // Ajouter une classe pour l'animation
        img.classList.add('fade-in');
        img.style.transitionDelay = `${index * 0.1}s`;
        
        gallery.appendChild(img);
    });
}

function showError(message) {
    const container = document.querySelector('.container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 4rem 0;">
                <h2 style="font-family: var(--font-serif); font-size: 2rem; margin-bottom: 1rem;">
                    ${message}
                </h2>
                <p style="color: #666; margin-bottom: 2rem;">
                    Le projet que vous recherchez n'existe pas ou a été supprimé.
                </p>
                <a href="index.html" class="btn-secondary">Retour à l'accueil</a>
            </div>
        `;
    }
}

// ==========================================
// ANIMATIONS
// ==========================================

function addAnimations() {
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
// NAVIGATION
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
// LIGHTBOX SIMPLE POUR LES IMAGES
// ==========================================

function initImageLightbox() {
    const images = document.querySelectorAll('.project-gallery img');
    
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        
        img.addEventListener('click', function() {
            // Créer le lightbox
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: zoom-out;
                padding: 2rem;
            `;
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            lightboxImg.style.cssText = `
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            `;
            
            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);
            
            // Fermer le lightbox au clic
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            // Fermer avec Échap
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    if (document.body.contains(lightbox)) {
                        document.body.removeChild(lightbox);
                    }
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        });
    });
}

// ==========================================
// INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadProjectDetails();
    initStickyNav();
    
    // Initialiser le lightbox après un court délai pour laisser les images se charger
    setTimeout(() => {
        initImageLightbox();
    }, 500);
});
