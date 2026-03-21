// ==========================================
// MENU MOBILE (avec focus trap)
// ==========================================

function initMobileMenu() {
    const burger = document.querySelector('.nav-burger');
    const burgerWrap = document.querySelector('.nav-burger-wrap');
    const links = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!burger || !links) return;

    const focusableSelectors = 'a[href], button:not([disabled])';

    const openMenu = () => {
        burger.setAttribute('aria-expanded', 'true');
        burger.classList.add('active');
        links.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            const first = links.querySelector(focusableSelectors);
            if (first) first.focus();
        }, 120);
    };

    const closeMenu = () => {
        burger.setAttribute('aria-expanded', 'false');
        burger.classList.remove('active');
        links.classList.remove('active');
        document.body.style.overflow = '';
        burger.focus();
    };

    (burgerWrap || burger).addEventListener('click', () => {
        burger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
    });

    // Fermeture sur Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') closeMenu();
    });

    // Focus trap dans le menu
    links.addEventListener('keydown', e => {
        if (e.key !== 'Tab') return;
        const focusable = [...links.querySelectorAll(focusableSelectors)];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });

    navLinks.forEach(link => link.addEventListener('click', closeMenu));
}

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================

function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
    }, { passive: true });
}

// ==========================================
// PAGE TRANSITIONS
// ==========================================

function initPageTransitions() {
    const overlay = document.createElement('div');
    overlay.className = 'page-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => overlay.classList.add('hidden'));
    });

    document.addEventListener('click', e => {
        const link = e.target.closest('a[href]');
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel')) return;
        if (link.target === '_blank') return;

        e.preventDefault();
        overlay.classList.remove('hidden');

        const bar = document.querySelector('.scroll-progress');
        if (bar) bar.style.width = '0%';

        setTimeout(() => { window.location.href = href; }, 460);
    });
}

// ==========================================
// RIPPLE AU TAP (MOBILE)
// ==========================================

function initRipple() {
    if (!window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.addEventListener('touchstart', e => {
        const target = e.target.closest('.project-card-image, .nav-link, .btn, .contact-item a');
        if (!target) return;

        if (getComputedStyle(target).position === 'static') target.style.position = 'relative';
        target.style.overflow = 'hidden';

        const touch = e.touches[0];
        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = touch.clientX - rect.left - size / 2;
        const y = touch.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
        target.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    }, { passive: true });
}

// ==========================================
// CURSEUR PERSONNALISÉ
// ==========================================

function initCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Active cursor: none uniquement si JS est chargé
    document.documentElement.classList.add('js-cursor');

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let active = true;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateRing() {
        if (active) {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
        }
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Pause quand l'onglet est en arrière-plan
    document.addEventListener('visibilitychange', () => {
        active = !document.hidden;
    });

    const hoverTargets = 'a, button, [role="button"], .project-card, .lightbox-close, .lightbox-prev, .lightbox-next';

    document.addEventListener('mouseover', e => {
        if (e.target.closest(hoverTargets)) {
            dot.classList.add('is-hovering');
            ring.classList.add('is-hovering');
        }
    });

    document.addEventListener('mouseout', e => {
        if (e.target.closest(hoverTargets)) {
            dot.classList.remove('is-hovering');
            ring.classList.remove('is-hovering');
        }
    });

    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '';
    });
}
