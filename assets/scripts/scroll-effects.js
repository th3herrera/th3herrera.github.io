document.addEventListener('DOMContentLoaded', () => {
  // Observador de intersección
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Efecto cascada para elementos internos
        if (entry.target.querySelector('.project-grid, .grid, .social-grid, .resources-grid, .archive-list, .tag-cloud')) {
          const items = entry.target.querySelectorAll('.project-card, .card, .social-card, .archive-item, .tag');
          items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            item.classList.add('visible');
          });
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observar todas las secciones
  document.querySelectorAll('.category-section').forEach(section => {
    observer.observe(section);
  });

  // Smooth scroll para enlaces del menú
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});