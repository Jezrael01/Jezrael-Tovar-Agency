// --- Selector de Tema Claro/Oscuro ---
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Función auxiliar para obtener el valor RGB de una variable CSS
function getRgb(variable) {
    const color = getComputedStyle(htmlElement).getPropertyValue(variable).trim();
    // Intenta parsear a RGB, si no, usa un valor por defecto o maneja el error
    const match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (match) {
        return `${parseInt(match[1], 16)}, ${parseInt(match[2], 16)}, ${parseInt(match[3], 16)}`;
    }
    // Fallback si no es un hexadecimal válido (e.g., ya es rgb o rgba)
    return color; 
}

function updateCssVariables(isDark) {
    if (isDark) {
        htmlElement.style.setProperty('--bg-primary-rgb', getRgb('--bg-primary'));
        htmlElement.style.setProperty('--text-primary-rgb', getRgb('--text-primary'));
    } else {
        htmlElement.style.setProperty('--bg-primary-rgb', getRgb('--bg-primary'));
        htmlElement.style.setProperty('--text-primary-rgb', getRgb('--text-primary'));
    }
}

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
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        htmlElement.classList.add('light');
        localStorage.setItem('theme', 'light');
        updateIcons(false);
        updateCssVariables(false);
    } else {
        htmlElement.classList.remove('light');
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateIcons(true);
        updateCssVariables(true);
    }
});

// Inicializar tema y variables CSS al cargar
if (localStorage.getItem('theme') === 'light') {
    htmlElement.classList.remove('dark');
    htmlElement.classList.add('light');
    updateIcons(false);
    updateCssVariables(false);
} else {
    // Por defecto o si es 'dark'
    htmlElement.classList.remove('light');
    htmlElement.classList.add('dark');
    updateIcons(true);
    updateCssVariables(true);
}

// --- Animaciones de Revelación (Reveal on Scroll) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || '0';
            entry.target.style.transitionDelay = delay + 's';
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Dejar de observar después de aparecer
        }
    });
}, { threshold: 0.1 }); 

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// --- Efecto Parallax en la imagen (ajustado para la nueva estructura) ---
document.addEventListener('scroll', () => {
    const profile = document.getElementById('profile-container');
    if (profile) {
        const scrollY = window.scrollY;
        // Mueve la imagen ligeramente hacia abajo/arriba al hacer scroll
        profile.style.transform = `translateY(${scrollY * -0.05}px)`; 
    }
});
