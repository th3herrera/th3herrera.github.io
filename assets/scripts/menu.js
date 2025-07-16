document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Función para cerrar el menú
  const closeMenu = () => {
    if (navLinksContainer && hamburger) {
      navLinksContainer.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Función para abrir el menú
  const openMenu = () => {
    if (navLinksContainer && hamburger) {
      navLinksContainer.classList.add('active');
      hamburger.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  // Control del menú hamburguesa
  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navLinksContainer.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Cerrar menú al hacer click en un enlace (móvil)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Cerrar menú en móvil
      if (window.innerWidth <= 768) {
        setTimeout(closeMenu, 150);
      }
      
      // Marcar enlace activo
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Smooth scroll para anclas
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Cerrar menú al hacer click fuera de él
  document.addEventListener('click', (e) => {
    if (navLinksContainer && hamburger && 
        navLinksContainer.classList.contains('active') &&
        !navLinksContainer.contains(e.target) && 
        !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  // Cerrar menú con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinksContainer && navLinksContainer.classList.contains('active')) {
      closeMenu();
    }
  });

  // Cerrar menú al redimensionar pantalla
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  // Marcar página activa al cargar
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
    if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Scroll progress (si existe el elemento)
  const updateScrollProgress = () => {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / scrollTotal) * 100, 100);
      progressBar.style.width = `${progress}%`;
    }
  };

  // Throttle para mejor rendimiento
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Detectar dispositivos táctiles
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
  }
});