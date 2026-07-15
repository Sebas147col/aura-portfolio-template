// ==========================================
// AURA PORTFOLIO SYSTEM - INTERACTIONS & FX
// ==========================================

// Helper para inicializar Lucide de forma segura sin romper la ejecución si falla el CDN
function safeCreateIcons() {
    try {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (e) {
        console.warn('Lucide icons could not be loaded:', e);
    }
}

function initPortfolio() {
    // Inicializar Iconos Lucide
    safeCreateIcons();

    // ------------------------------------------
    // 1. CURSOR PERSONALIZADO (Smooth Custom Cursor)
    // ------------------------------------------
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            // Posicionamiento instantáneo del punto central
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;

            // Efecto ligeramente rezagado para el aro exterior (smooth follow)
            cursor.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 400, fill: 'forwards' });
        });

        // Expandir cursor en enlaces y botones
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-pill');
        
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
                cursor.style.borderColor = 'var(--secondary)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.borderColor = 'var(--primary)';
            });
        });
    }

    // ------------------------------------------
    // 2. MENÚ MÓVIL TOGGLE
    // ------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Alternar icono de menú a cerrar si está activo
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            safeCreateIcons();
        });

        // Cerrar menú móvil al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                safeCreateIcons();
            });
        });
    }

    // ------------------------------------------
    // 3. REVELACIÓN AL HACER SCROLL (Scroll Reveal)
    // ------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px'
    });

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // Activar inmediatamente los elementos que ya están visibles en la pantalla al cargar
    setTimeout(() => {
        revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight + 100) {
                element.classList.add('active');
            }
        });
    }, 100);

    // ------------------------------------------
    // 4. LINK ACTIVO DING EN NAVBAR AL HACER SCROLL
    // ------------------------------------------
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY || window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ------------------------------------------
    // 5. INTERACCIÓN DE FORMULARIO DE CONTACTO
    // ------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if (contactForm && toast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar recarga real de la página

            // Obtener los datos (mock)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simular envío de datos
            console.log('Mensaje Enviado:', { name, email, message });

            // Mostrar el mensaje Toast de confirmación
            toast.classList.add('show');
            
            // Limpiar el formulario
            contactForm.reset();

            // Ocultar el Toast tras 4 segundos
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        });
    }
}

// Ejecutar inicialización de forma segura
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
