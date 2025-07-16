// ======================== EFECTOS PARA PÁGINA DE ARCHIVO ========================

// Configuración de animaciones
const config = {
  animationDuration: 300,
  staggerDelay: 100,
  scrollOffset: 0.1
};

// ======================== INICIALIZACIÓN ========================
document.addEventListener('DOMContentLoaded', function() {
  initTimelineAnimations();
  initFilterAnimations();
  initScrollEffects();
  initInteractiveElements();
});

// ======================== ANIMACIONES DE TIMELINE ========================
function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineEntries = document.querySelectorAll('.timeline-entry');
  
  // Observador para items del timeline
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * config.staggerDelay);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  timelineItems.forEach(item => timelineObserver.observe(item));
  timelineEntries.forEach(entry => timelineObserver.observe(entry));
}

// ======================== EFECTOS DE FILTROS ========================
function initFilterAnimations() {
  const tags = document.querySelectorAll('.tag');
  const entries = document.querySelectorAll('.timeline-entry');

  tags.forEach(tag => {
    tag.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter').toLowerCase();
      
      // Actualizar tags activos
      tags.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Animar filtrado
      entries.forEach((entry, index) => {
        const entryTags = entry.getAttribute('data-tags').toLowerCase();
        const shouldShow = filter === 'all' || entryTags.includes(filter);
        
        if (shouldShow) {
          setTimeout(() => {
            entry.style.display = 'flex';
            entry.classList.add('filter-show');
            entry.classList.remove('filter-hide');
          }, index * 50);
        } else {
          entry.classList.add('filter-hide');
          entry.classList.remove('filter-show');
          setTimeout(() => {
            entry.style.display = 'none';
          }, 200);
        }
      });
      
      // Efecto de pulso en el tag
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
    
    // Efectos hover
    tag.addEventListener('mouseenter', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateY(-2px)';
      }
    });
    
    tag.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateY(0)';
      }
    });
  });
}

// ======================== EFECTOS DE SCROLL ========================
function initScrollEffects() {
  const hero = document.querySelector('.hero-section');
  const sections = document.querySelectorAll('section');
  
  // Parallax sutil en hero
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }
  
  // Animaciones al hacer scroll
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  sections.forEach(section => scrollObserver.observe(section));
}

// ======================== ELEMENTOS INTERACTIVOS ========================
function initInteractiveElements() {
  // Efecto de typing en el título
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    animateTyping(heroTitle);
  }
  
  // Hover effects en timeline entries
  const timelineEntries = document.querySelectorAll('.timeline-entry');
  timelineEntries.forEach(entry => {
    entry.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(8px)';
      this.querySelector('.timeline-content').style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
    });
    
    entry.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
      this.querySelector('.timeline-content').style.boxShadow = '';
    });
  });
  
  // Contador animado para estadísticas
  animateCounters();
}

// ======================== EFECTO DE TYPING ========================
function animateTyping(element) {
  const text = element.textContent;
  element.textContent = '';
  element.style.borderRight = '2px solid var(--accent-gold)';
  
  let i = 0;
  const typing = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(typing);
      setTimeout(() => {
        element.style.borderRight = 'none';
      }, 500);
    }
  }, 100);
}

// ======================== CONTADORES ANIMADOS ========================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    if (isNaN(target)) return;
    
    let current = 0;
    const increment = target / 50;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    // Iniciar cuando sea visible
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          counterObserver.unobserve(entry.target);
        }
      });
    });
    
    counterObserver.observe(counter);
  });
}

// ======================== UTILIDADES ========================
function debounce(func, wait) {
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

// Optimizar scroll events
const optimizedScroll = debounce(() => {
  // Scroll optimizado aquí
}, 16);

window.addEventListener('scroll', optimizedScroll);
