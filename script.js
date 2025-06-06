// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroBg = document.querySelector('.hero-bg');
    const scrolled = window.pageYOffset;
    
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling function
function smoothScroll(target) {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Duración de la animación en milisegundos
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Función de easing para hacer el movimiento más suave
        const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
        window.scrollTo(0, startPosition + (distance * ease(progress)));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Add click event listeners to all navigation links, contact button and logo
document.querySelectorAll('.nav-links a, .cta-button, .logo-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            smoothScroll(targetSection);
        }
    });
});

// Gallery Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filtro-btn');
    const galleryItems = document.querySelectorAll('.galeria-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Apply filter to all items
            galleryItems.forEach(item => {
                if (filterValue === 'todos' || item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });
});

// Mobile menu toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Función para cerrar el menú
const closeMenu = () => {
    nav.classList.remove('nav-active');
    burger.classList.remove('toggle');
    navLinks.forEach(link => {
        link.style.animation = '';
    });
};

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Form submission handling
const contactForm = document.querySelector('.contacto-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        mensaje: document.getElementById('mensaje').value
    };
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    
    // Reset form
    contactForm.reset();
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    .nav-active {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        top: 70px;
        background-color: white;
        width: 100%;
        align-items: center;
        padding: 2rem 0;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .nav-active li {
        margin: 1rem 0;
    }

    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .toggle .line2 {
        opacity: 0;
    }

    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Carrusel de Imágenes
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('carousel-modal');
    const modalImage = modal.querySelector('.carousel-image');
    const closeBtn = modal.querySelector('.carousel-close');
    const prevBtn = modal.querySelector('.carousel-prev');
    const nextBtn = modal.querySelector('.carousel-next');
    const dotsContainer = modal.querySelector('.carousel-dots');
    
    let currentImages = [];
    let currentIndex = 0;

    // Abrir carrusel al hacer clic en un proyecto
    document.querySelectorAll('.galeria-item').forEach(item => {
        item.addEventListener('click', () => {
            currentImages = JSON.parse(item.getAttribute('data-images'));
            currentIndex = 0;
            showImage(currentIndex);
            modal.classList.add('active');
            createDots();
        });
    });

    // Cerrar carrusel
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });

    // Navegación del carrusel
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage(currentIndex);
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            showImage(currentIndex);
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % currentImages.length;
            showImage(currentIndex);
        }
    });

    // Mostrar imagen actual
    function showImage(index) {
        modalImage.src = currentImages[index];
        updateDots();
    }

    // Crear puntos de navegación
    function createDots() {
        dotsContainer.innerHTML = '';
        currentImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = index;
                showImage(currentIndex);
            });
            dotsContainer.appendChild(dot);
        });
    }

    // Actualizar puntos activos
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
});

// Función para animar números
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observer para la sección de estadísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observar la sección de estadísticas
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.nosotros-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}); 