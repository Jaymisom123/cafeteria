const modal = document.querySelector(".modal")
const mascara = document.querySelector(".mascara-modal")

// Navegação Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function mostrarModal() {
    modal.style.left= '50%'
    mascara.style.visibility= 'visible'
}
function esconderModal() {
      modal.style.left= '-30%'
    mascara.style.visibility= 'hidden'
    
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Event Listeners para navegação mobile
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

// Fechar menu mobile ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header com efeito de transparência no scroll
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

function updateHeader() {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
    }
}

window.addEventListener('scroll', updateHeader);

// Animação dos números de estatística
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 segundos
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Modal de localização
function openModal() {
    const modal = document.getElementById('locationModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('locationModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Fechar modal clicando fora do conteúdo
window.addEventListener('click', function(e) {
    const modal = document.getElementById('locationModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Animação de entrada dos elementos
function animateOnScroll() {
    const elements = document.querySelectorAll('.menu-item, .feature, .info-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Form de contato
function handleContactForm() {
    const form = document.querySelector('.contato-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar a lógica para enviar o formulário
            // Por exemplo, usando fetch para uma API
            
            // Simulação de envio
            const button = form.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Enviando...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Mensagem Enviada!';
                button.style.background = '#28a745';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Parallax suave para o vídeo hero
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    const video = document.querySelector('.hero-video video');
    
    if (hero && video) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            video.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Loading das imagens com lazy loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    animateStats();
    animateOnScroll();
    handleContactForm();
    parallaxEffect();
    lazyLoadImages();
    
    // Remover loading screen se existir
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 1000);
    }
});

// Preloader simples
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Otimização para dispositivos touch
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Melhorar performance em dispositivos touch
    document.addEventListener('touchstart', function() {}, {passive: true});
    document.addEventListener('touchmove', function() {}, {passive: true});
}

// Detectar dispositivos móveis
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustar comportamentos para mobile
if (isMobile()) {
    // Desabilitar parallax em mobile para melhor performance
    const parallaxEffect = function() {};
    
    // Reduzir animações em dispositivos móveis
    document.body.classList.add('mobile-device');
}

// Ajustar altura da viewport para mobile (problema da barra de endereço)
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// Performance: throttle para eventos de scroll
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar throttle aos eventos de scroll
const throttledHeaderUpdate = throttle(updateHeader, 10);
window.removeEventListener('scroll', updateHeader);
window.addEventListener('scroll', throttledHeaderUpdate);