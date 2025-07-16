// ===================== MI PÁGINA WEB - EFECTOS ESPECÍFICOS =====================

// Función toggle global inmediata (antes del DOMContentLoaded)
window.toggleLevel = function(levelId) {
  console.log('Toggling level:', levelId);
  const content = document.getElementById(levelId);
  if (!content) {
    console.error('Content element not found:', levelId);
    return;
  }
  
  const header = content.previousElementSibling;
  if (!header) {
    console.error('Header element not found for:', levelId);
    return;
  }
  
  const icon = header.querySelector('.toggle-icon');
  
  if (content.classList.contains('active')) {
    content.classList.remove('active');
    if (icon) icon.style.transform = 'rotate(0deg)';
    if (header.parentElement) header.parentElement.setAttribute('data-expanded', 'false');
    console.log('Closed level:', levelId);
  } else {
    // Cerrar otros niveles abiertos
    document.querySelectorAll('.level-content.active').forEach(activeContent => {
      activeContent.classList.remove('active');
      const activeHeader = activeContent.previousElementSibling;
      const activeIcon = activeHeader ? activeHeader.querySelector('.toggle-icon') : null;
      if (activeIcon) activeIcon.style.transform = 'rotate(0deg)';
      if (activeHeader && activeHeader.parentElement) {
        activeHeader.parentElement.setAttribute('data-expanded', 'false');
      }
    });
    
    // Abrir el nivel seleccionado
    content.classList.add('active');
    if (icon) icon.style.transform = 'rotate(90deg)';
    if (header.parentElement) header.parentElement.setAttribute('data-expanded', 'true');
    console.log('Opened level:', levelId);
  }
};

console.log('🔧 Global toggleLevel function loaded');

document.addEventListener('DOMContentLoaded', function() {
  
  // ===================== NAVEGACIÓN LATERAL AUTOMÁTICA =====================
  
  function initSidebarNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    // Configurar Intersection Observer para detectar secciones visibles
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          updateActiveNavItem(id);
        }
      });
    }, observerOptions);
    
    // Observar todas las secciones
    sections.forEach(section => observer.observe(section));
    
    // Función para actualizar el item activo
    function updateActiveNavItem(activeId) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${activeId}`) {
          item.classList.add('active');
        }
      });
    }
    
    // Scroll suave al hacer clic en navegación
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // ===================== ANIMACIONES DE ENTRADA =====================
  
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .lesson-card, .info-card, .challenge-item, .roadmap-item, .tech-section');
    
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          animationObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      animationObserver.observe(element);
    });
  }
  
  // ===================== EFECTO TYPING PARA CÓDIGO =====================
  
  function initTypingEffect() {
    const codeBlocks = document.querySelectorAll('.code-block pre');
    
    codeBlocks.forEach(block => {
      const text = block.textContent;
      block.textContent = '';
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            typeText(block, text);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(block);
    });
    
    function typeText(element, text) {
      let index = 0;
      const speed = 20; // velocidad del typing
      
      function type() {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(type, speed);
        }
      }
      
      type();
    }
  }
  
  // ===================== CONTADOR ANIMADO PARA ESTADÍSTICAS =====================
  
  function initCounterAnimation() {
    const counters = document.querySelectorAll('.meta-value');
    
    function animateCounter(element) {
      const target = parseInt(element.textContent.replace(/\D/g, ''));
      if (isNaN(target)) return;
      
      let current = 0;
      const increment = target / 50;
      const suffix = element.textContent.replace(/\d/g, '');
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
      }, 40);
    }
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
  }
  
  // ===================== PARALLAX SUTIL EN HERO =====================
  
  function initParallaxEffect() {
    const hero = document.querySelector('.project-hero');
    if (!hero) return;
    
    let ticking = false;
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      hero.style.transform = `translateY(${rate}px)`;
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick);
  }
  
  // ===================== EFECTOS HOVER MEJORADOS =====================
  
  function initHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .lesson-card, .info-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
      });
    });
  }
  
  // ===================== SMOOTH REVEAL DE TIMELINE =====================
  
  function initTimelineAnimation() {
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (!timeline) return;
    
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }, index * 200);
        }
      });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-30px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      timelineObserver.observe(item);
    });
  }
  
  // ===================== EFECTO GLITCH EN TÍTULOS =====================
  
  function initGlitchEffect() {
    const title = document.querySelector('.project-title');
    if (!title) return;
    
    title.addEventListener('mouseenter', function() {
      this.style.textShadow = `
        2px 0 #ff00de,
        -2px 0 #00ffff,
        0 2px #ffff00
      `;
      
      setTimeout(() => {
        this.style.textShadow = '';
      }, 200);
    });
  }
  
  // ===================== CÓDIGO HIGHLIGHT SINTAXIS =====================
  
  function initCodeHighlight() {
    const codeBlocks = document.querySelectorAll('.code-block code');
    
    codeBlocks.forEach(block => {
      let html = block.innerHTML;
      
      // Resaltar comentarios
      html = html.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span style="color: #6B7280; font-style: italic;">$1</span>');
      
      // Resaltar strings
      html = html.replace(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span style="color: #10B981;">$1$2$3</span>');
      
      // Resaltar palabras clave CSS
      html = html.replace(/\b(const|let|var|function|if|else|for|while|return)\b/g, '<span style="color: #8B5CF6;">$1</span>');
      
      // Resaltar selectores CSS
      html = html.replace(/([.#][\w-]+)/g, '<span style="color: #F59E0B;">$1</span>');
      
      block.innerHTML = html;
    });
  }
  
  // ===================== PROGRESS BAR LECTURA =====================
  
  function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #1c5197, #E6AD22);
      z-index: 1000;
      transition: width 0.25s ease;
    `;
    document.body.appendChild(progressBar);
    
    function updateProgress() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateProgress);
  }
  
  // ===================== TABLA DE CONTENIDOS FLOTANTE =====================
  
  function initFloatingTOC() {
    const sidebar = document.querySelector('.project-sidebar');
    if (!sidebar) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset;
      
      if (window.innerWidth > 1200) {
        if (scrollTop > 200) {
          sidebar.style.position = 'fixed';
          sidebar.style.top = '120px';
          sidebar.style.width = '280px';
        } else {
          sidebar.style.position = 'sticky';
          sidebar.style.top = '120px';
          sidebar.style.width = 'auto';
        }
      }
      
      lastScrollTop = scrollTop;
    });
  }
  
  // ===================== TOGGLE DE CONTENIDO DE NIVELES =====================
  
  function initContentToggle() {
    console.log('Initializing content toggle...');
    
    // La función toggleLevel ya está definida globalmente arriba
    
    // Event listeners para headers clickeables (como backup del onclick)
    document.querySelectorAll('.level-detail-header').forEach(header => {
      header.style.cursor = 'pointer'; // Asegurar que se vea clickeable
      header.addEventListener('click', function(e) {
        console.log('Header clicked via event listener:', this);
        // Evitar doble ejecución si hay onclick
        if (this.getAttribute('onclick')) {
          return; // El onclick se encarga
        }
        
        const content = this.nextElementSibling;
        if (content && content.classList.contains('level-content')) {
          const levelId = content.id;
          if (levelId) {
            window.toggleLevel(levelId);
          } else {
            console.error('No ID found for content:', content);
          }
        } else {
          console.error('No valid content found for header:', this);
        }
      });
    });
    
    console.log('Content toggle initialized, found headers:', document.querySelectorAll('.level-detail-header').length);
    console.log('Content elements found:', document.querySelectorAll('.level-content').length);
    
    // Test que la función funcione
    console.log('Testing toggleLevel function...');
    const firstContent = document.querySelector('.level-content');
    if (firstContent && firstContent.id) {
      console.log('First content ID:', firstContent.id);
    }
  }

  // ===================== SMOOTH SCROLL PARA NAVEGACIÓN DE NIVELES =====================
  
  function initLevelNavigation() {
    window.scrollToLevel = function(targetId) {
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 100;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    };
  }

  // ===================== COPY TO CLIPBOARD FUNCIONALIDAD =====================
  
  function initCopyToClipboard() {
    window.copyToClipboard = function(text) {
      // Si el parámetro es un ID, obtener el texto del elemento
      if (typeof text === 'string' && !text.includes('\n') && !text.includes(' ')) {
        const element = document.getElementById(text);
        if (element) {
          text = element.textContent || element.innerText;
        }
      }
      
      navigator.clipboard.writeText(text).then(function() {
        showCopyFeedback();
      }).catch(function(err) {
        console.error('Error al copiar al portapapeles: ', err);
        fallbackCopyTextToClipboard(text);
      });
    };

    function fallbackCopyTextToClipboard(text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          showCopyFeedback();
        }
      } catch (err) {
        console.error('Fallback: Error al copiar', err);
      }
      
      document.body.removeChild(textArea);
    }

    function showCopyFeedback() {
      const feedback = document.createElement('div');
      feedback.textContent = '¡Copiado!';
      feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-web);
        color: var(--primary-dark);
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInOut 2s ease-out forwards;
      `;
      
      // Añadir animación CSS si no existe
      if (!document.querySelector('#copy-feedback-styles')) {
        const style = document.createElement('style');
        style.id = 'copy-feedback-styles';
        style.textContent = `
          @keyframes slideInOut {
            0% { transform: translateX(100%); opacity: 0; }
            20%, 80% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }
      
      document.body.appendChild(feedback);
      setTimeout(() => {
        if (feedback.parentNode) {
          feedback.parentNode.removeChild(feedback);
        }
      }, 2000);
    }

    // Event listeners para botones de copia
    document.querySelectorAll('.copy-btn').forEach(button => {
      button.addEventListener('click', function() {
        const codeBlock = this.closest('.code-block');
        if (codeBlock) {
          const code = codeBlock.querySelector('code');
          if (code) {
            window.copyToClipboard(code.textContent);
          }
        }
      });
    });
  }

  // ===================== INIT TODAS LAS FUNCIONES =====================
  
  initSidebarNavigation();
  initScrollAnimations();
  initCounterAnimation();
  initParallaxEffect();
  initHoverEffects();
  initTimelineAnimation();
  initGlitchEffect();
  initCodeHighlight();
  initReadingProgress();
  initFloatingTOC();
  initContentToggle();
  initLevelNavigation();
  initCopyToClipboard();
  
  // Iniciar typing effect después de un delay
  setTimeout(initTypingEffect, 1000);
  
  // ===================== UTILIDADES =====================
  
  // Smooth scroll para todos los enlaces internos
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
  
  // Lazy loading para imágenes si las hay
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
  }
  
  // Prevenir scroll horizontal accidental
  let isScrolling = false;
  window.addEventListener('wheel', function(e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
    }
  }, { passive: false });
  
  // Debug info en consola
  console.log('%c🌐 Mi Página Web - Efectos Cargados', 'color: #1c5197; font-size: 14px; font-weight: bold;');
  console.log('✅ Navegación lateral activa');
  console.log('✅ Animaciones de scroll configuradas');
  console.log('✅ Efectos de hover aplicados');
  console.log('✅ Progress bar de lectura activo');
  console.log('✅ Toggle de contenido activado');
  console.log('✅ Copy-to-clipboard funcional');
  console.log('✅ Navegación de niveles activa');
  
});

// ===================== GESTIÓN DE ERRORES =====================

window.addEventListener('error', function(e) {
  console.warn('Error en mi-pagina-web-effects.js:', e.error);
});

// ===================== PERFORMANCE MONITORING =====================

if ('performance' in window) {
  window.addEventListener('load', function() {
    setTimeout(function() {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log(`⚡ Página cargada en ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
    }, 0);
  });
}
