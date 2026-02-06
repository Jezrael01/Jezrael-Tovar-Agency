// --- Selector de Tema Claro/Oscuro ---
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function updateIcons(isDark) {
    if (isDark) {
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    } else {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    }
}

themeToggle.addEventListener('click', () => {
    const isDark = htmlElement.classList.contains('dark');
    if (isDark) {
        htmlElement.classList.replace('dark', 'light');
        localStorage.setItem('theme', 'light');
        updateIcons(false);
    } else {
        htmlElement.classList.replace('light', 'dark');
        localStorage.setItem('theme', 'dark');
        updateIcons(true);
    }
});

// Inicializar tema al cargar
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.classList.add(savedTheme);
updateIcons(savedTheme === 'dark');

// --- Lógica del Menú Móvil (NUEVO) ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const navIconPath = document.getElementById('nav-icon-path');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        // Cambia el icono de hamburguesa (3 líneas) a X al abrir
        if (isHidden) {
            navIconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        } else {
            navIconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        }
    });

    // Cerrar menú al hacer clic en cualquier enlace móvil
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            navIconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        });
    });
}

// --- Animaciones de Revelación (Intersection Observer) ---
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || '0';
            entry.target.style.transitionDelay = delay + 's';
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// --- Efecto Parallax Suave ---
document.addEventListener('scroll', () => {
    const profile = document.getElementById('profile-container');
    if (profile && window.innerWidth > 768) { // Solo en Desktop para evitar saltos en móvil
        const scrollY = window.scrollY;
        profile.style.transform = `translateY(${scrollY * -0.05}px)`; 
    }
});

// --- Manejo del Formulario (EmailJS ya inicializado en el HTML) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // El botón cambia de estado para feedback visual
        const btn = this.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Enviando...';
        btn.disabled = true;

        emailjs.sendForm('service_718w764', 'template_cu8rwxr', this)
            .then(() => {
                alert('✅ ¡Mensaje enviado! Me pondré en contacto pronto.');
                this.reset();
            })
            .catch((error) => {
                alert('❌ Error al enviar. Por favor, intenta de nuevo.');
                console.error('EmailJS Error:', error);
            })
            .finally(() => {
                btn.innerText = originalText;
                btn.disabled = false;
            });
    });
}