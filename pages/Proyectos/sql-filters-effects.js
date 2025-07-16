// =======================
// EFECTOS SQL FILTERS PAGE
// =======================

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initCodeHighlighting();
    initSecurityEffects();
    initParallaxEffects();
    initTypewriterEffect();
    initFlowDiagramAnimation();
});



// =======================
// RESALTADO DE CÓDIGO SQL MEJORADO
// =======================
function initCodeHighlighting() {
    // Aplicar syntax highlighting avanzado para SQL
    const codeBlocks = document.querySelectorAll('code.language-sql');
    
    codeBlocks.forEach(block => {
        let html = block.innerHTML;
        
        // Palabras clave de SQL (más completo)
        html = html.replace(/\b(SELECT|FROM|WHERE|AND|OR|NOT|LIKE|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TABLE|DATABASE|INDEX|PRIMARY|KEY|FOREIGN|REFERENCES|NULL|TRUE|FALSE|DISTINCT|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|INNER|LEFT|RIGHT|OUTER|JOIN|UNION|AS|IN|EXISTS|BETWEEN|IS|CASE|WHEN|THEN|ELSE|END|COUNT|SUM|AVG|MIN|MAX|UPPER|LOWER|LENGTH|SUBSTRING|TRIM|REPLACE|CONCAT|NOW|DATE|TIME|YEAR|MONTH|DAY|ASC|DESC|ALL|ANY|SOME|TOP|UNIQUE|CONSTRAINT|CHECK|DEFAULT|AUTO_INCREMENT|UNSIGNED|ZEROFILL)\b/gi, 
            '<span class="sql-keyword">$1</span>');
        
        // Tipos de datos SQL
        html = html.replace(/\b(VARCHAR|CHAR|TEXT|TINYTEXT|MEDIUMTEXT|LONGTEXT|INT|INTEGER|BIGINT|SMALLINT|TINYINT|DECIMAL|NUMERIC|FLOAT|DOUBLE|REAL|DATE|TIME|DATETIME|TIMESTAMP|YEAR|BOOLEAN|BOOL|BINARY|VARBINARY|BLOB|TINYBLOB|MEDIUMBLOB|LONGBLOB|ENUM|SET|JSON)\b/gi, 
            '<span class="sql-datatype">$1</span>');
        
        // Funciones SQL
        html = html.replace(/\b(COUNT|SUM|AVG|MIN|MAX|UPPER|LOWER|LENGTH|SUBSTRING|TRIM|REPLACE|CONCAT|NOW|DATE|TIME|YEAR|MONTH|DAY|ABS|CEIL|FLOOR|ROUND|RAND|SQRT|POWER|COALESCE|ISNULL|IFNULL|NULLIF)(?=\s*\()/gi, 
            '<span class="sql-function">$1</span>');
        
        // Strings (cadenas de texto)
        html = html.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="sql-string">$1</span>');
        html = html.replace(/"([^"\\]|\\.)*"/g, '<span class="sql-string">$&</span>');
        
        // Comentarios SQL
        html = html.replace(/(--.*$)/gm, '<span class="sql-comment">$1</span>');
        html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="sql-comment">$1</span>');
        
        // Números
        html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="sql-number">$1</span>');
        
        // Operadores
        html = html.replace(/(\=|\>|\<|\>=|\<=|\<>|\!=|\+|\-|\*|\/|\%)/g, '<span class="sql-operator">$1</span>');
        
        // Nombres de tablas específicas del proyecto
        html = html.replace(/\b(log_in_attempts|employees)\b/g, '<span class="sql-table">$1</span>');
        
        // Nombres de columnas específicas del proyecto
        html = html.replace(/\b(login_time|login_date|success|country|department|office|username|password|user_id|employee_id|first_name|last_name|email|phone|address|city|state|zip_code|created_at|updated_at)\b/g, 
            '<span class="sql-column">$1</span>');
        
        // Valores booleanos especiales
        html = html.replace(/\b(TRUE|FALSE|NULL)\b/gi, '<span class="sql-boolean">$1</span>');
        
        block.innerHTML = html;
    });
}

// =======================
// EFECTOS DE SEGURIDAD
// =======================
function initSecurityEffects() {
    // Efecto de "scanning" en las tarjetas de casos de prueba
    const testCases = document.querySelectorAll('.test-case');
    
    testCases.forEach((testCase, index) => {
        // Añadir efecto de escaneo cuando se hace hover
        testCase.addEventListener('mouseenter', function() {
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            
            // Crear efecto de línea de escaneo
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, #e11d48, transparent);
                animation: scan 1.5s ease-in-out;
                z-index: 10;
            `;
            
            this.appendChild(scanLine);
            
            // Remover el elemento después de la animación
            setTimeout(() => {
                if (scanLine.parentNode) {
                    scanLine.parentNode.removeChild(scanLine);
                }
            }, 1500);
        });
    });
    
    // Agregar estilos CSS para la animación de escaneo
    if (!document.getElementById('scan-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'scan-animation-styles';
        style.textContent = `
            @keyframes scan {
                0% { left: -100%; }
                100% { left: 100%; }
            }
            
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// =======================
// EFECTOS PARALLAX
// =======================
function initParallaxEffects() {
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.hero-section::before');
                
                // Efecto parallax sutil en el hero
                const heroSection = document.querySelector('.hero-section');
                if (heroSection) {
                    const speed = scrolled * 0.5;
                    heroSection.style.transform = `translateY(${speed}px)`;
                }
                
                // Efecto de profundidad en las tarjetas
                const cards = document.querySelectorAll('.feature-card, .overview-card');
                cards.forEach((card, index) => {
                    const rect = card.getBoundingClientRect();
                    const speed = (window.innerHeight - rect.top) * 0.01;
                    card.style.transform = `translateY(${speed}px)`;
                });
                
                isScrolling = false;
            });
        }
        isScrolling = true;
    });
}

// =======================
// EFECTO TYPEWRITER
// =======================
function initTypewriterEffect() {
    const codeBlocks = document.querySelectorAll('.code-example code');
    
    codeBlocks.forEach(block => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typewriterEffect(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(block);
    });
}

function typewriterEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid #e11d48';
    
    let index = 0;
    const speed = 15; // milisegundos entre caracteres
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            // Parpadeo del cursor al finalizar
            let blinkCount = 0;
            const blink = setInterval(() => {
                element.style.borderRight = element.style.borderRight === 'none' 
                    ? '2px solid #e11d48' 
                    : 'none';
                blinkCount++;
                if (blinkCount > 6) {
                    clearInterval(blink);
                    element.style.borderRight = 'none';
                }
            }, 500);
        }
    }
    
    // Iniciar el efecto con un pequeño retraso
    setTimeout(type, 500);
}

// =======================
// ANIMACIÓN DEL DIAGRAMA DE FLUJO
// =======================
function initFlowDiagramAnimation() {
    const flowSteps = document.querySelectorAll('.flow-step');
    const flowArrows = document.querySelectorAll('.flow-arrow');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateFlowDiagram();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (flowSteps.length > 0) {
        observer.observe(flowSteps[0]);
    }
    
    function animateFlowDiagram() {
        flowSteps.forEach((step, index) => {
            setTimeout(() => {
                step.style.animation = 'slideInRight 0.6s ease-out both';
                
                // Animar la flecha después del paso
                if (flowArrows[index]) {
                    setTimeout(() => {
                        flowArrows[index].style.animation = 'fadeIn 0.3s ease-out both';
                        flowArrows[index].style.color = '#e11d48';
                    }, 300);
                }
            }, index * 400);
        });
    }
    
    // Agregar estilos para la animación del diagrama
    if (!document.getElementById('flow-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'flow-animation-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            .flow-arrow {
                opacity: 0;
                transition: color 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// =======================
// EFECTOS DE MOUSE
// =======================
document.addEventListener('mousemove', (e) => {
    // Efecto parallax sutil en las tarjetas con el mouse
    const cards = document.querySelectorAll('.feature-card, .overview-card, .conclusion-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach((card, index) => {
        const speed = (index % 3 + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        card.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// =======================
// EFECTOS DE HOVER MEJORADOS
// =======================
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de brillo en botones
    const buttons = document.querySelectorAll('.hero-cta, .project-link');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            
            const shine = document.createElement('div');
            shine.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                animation: shine 0.6s ease-out;
            `;
            
            this.appendChild(shine);
            
            setTimeout(() => {
                if (shine.parentNode) {
                    shine.parentNode.removeChild(shine);
                }
            }, 600);
        });
    });
    
    // Agregar animación de brillo
    if (!document.getElementById('shine-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'shine-animation-styles';
        style.textContent = `
            @keyframes shine {
                0% { left: -100%; }
                100% { left: 100%; }
            }
        `;
        document.head.appendChild(style);
    }
});

// =======================
// EFECTOS DE SCROLL SUAVES
// =======================
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

// =======================
// EFECTO DE CARGA DE PÁGINA
// =======================
window.addEventListener('load', function() {
    // Ocultar cualquier loader si existe
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    // Activar animaciones iniciales
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-stats, .hero-actions');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = `fadeInUp 0.8s ease-out both`;
        }, index * 100);
    });
});

// Corregir las animaciones para evitar superposición
document.addEventListener('DOMContentLoaded', function() {
  // Eliminar cualquier posicionamiento fijo en las animaciones
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // No modificar position aquí
      }
    });
  }, observerOptions);

  // Observar elementos sin cambiar su posición
  document.querySelectorAll('.overview-card, .feature-card').forEach(el => {
    observer.observe(el);
  });

  // Eliminar cualquier scroll behavior problemático
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start' // Cambiar de 'center' a 'start'
        });
      }
    });
  });
});
