// ===================== HACKER EFFECTS SYSTEM =====================
class HackerEffects {
    constructor() {
        this.matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.particles = [];
        this.isMatrixActive = true;
        // Eliminamos scanLineActive
        
        this.init();
    }

    init() {
        this.createMatrixBackground();
        // Eliminamos this.createScanLine();
        this.addTerminalEffects();
        this.addLevelCardEffects();
        this.addTypingAnimations();
        this.startParticleSystem();
        
        // Start update loop
        this.update();
        
        console.log('%c[SYSTEM] Hacker effects initialized', 'color: #00ff41; font-family: monospace;');
        console.log('%c[ACCESS] Bandit CTF interface active', 'color: #00ffff; font-family: monospace;');
    }

    createMatrixBackground() {
        const matrixBg = document.createElement('div');
        matrixBg.className = 'matrix-bg';
        document.body.appendChild(matrixBg);

        // Create matrix characters
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createMatrixChar(matrixBg);
            }, i * 100);
        }

        // Continue creating characters
        setInterval(() => {
            if (this.isMatrixActive && Math.random() < 0.3) {
                this.createMatrixChar(matrixBg);
            }
        }, 200);
    }

    createMatrixChar(container) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (Math.random() * 3 + 2) + 's';
        char.style.opacity = Math.random() * 0.5 + 0.1;
        
        container.appendChild(char);

        // Remove character after animation
        setTimeout(() => {
            if (char.parentNode) {
                char.parentNode.removeChild(char);
            }
        }, 5000);
    }

    // Función createScanLine() ELIMINADA COMPLETAMENTE

    addTerminalEffects() {
        // Add typing effect to terminal content
        const terminalLines = document.querySelectorAll('.terminal-line');
        terminalLines.forEach((line, index) => {
            line.style.opacity = '0';
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.animation = 'hacker-fade-in 0.5s ease-in';
            }, index * 100);
        });

        // Add glitch effect to level indicators
        const levelIndicators = document.querySelectorAll('.level-indicator');
        levelIndicators.forEach(indicator => {
            indicator.addEventListener('mouseenter', () => {
                indicator.classList.add('glitch-text');
                indicator.setAttribute('data-text', indicator.textContent);
                
                setTimeout(() => {
                    indicator.classList.remove('glitch-text');
                }, 1000);
            });
        });
    }

    addLevelCardEffects() {
        const levelCards = document.querySelectorAll('.level-card-hacker');
        
        levelCards.forEach(card => {
            // Add hover sound effect (visual feedback)
            card.addEventListener('mouseenter', () => {
                this.createHoverEffect(card);
            });

            // Add click effect
            card.addEventListener('click', () => {
                this.createClickEffect(card);
            });

            // Intersection observer for fade-in animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'hacker-fade-in 0.8s ease-out';
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(card);
        });
    }

    createHoverEffect(element) {
        // Create temporary particle burst
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = '#00ff41';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            const rect = element.getBoundingClientRect();
            particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            
            document.body.appendChild(particle);
            
            // Animate particle
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`, opacity: 0 }
            ], {
                duration: 500,
                easing: 'ease-out'
            }).addEventListener('finish', () => {
                document.body.removeChild(particle);
            });
        }
    }

    createClickEffect(element) {
        // Add temporary compromised effect
        element.classList.add('compromised');
        setTimeout(() => {
            element.classList.remove('compromised');
            element.classList.add('access-granted');
            setTimeout(() => {
                element.classList.remove('access-granted');
            }, 1000);
        }, 500);
    }

    addTypingAnimations() {
        const terminalPrompts = document.querySelectorAll('.terminal-line');
        
        terminalPrompts.forEach((prompt, index) => {
            const text = prompt.textContent;
            prompt.textContent = '';
            
            setTimeout(() => {
                this.typeText(prompt, text, 50);
            }, index * 1000);
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    startParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-system';
        document.body.appendChild(particleContainer);

        setInterval(() => {
            if (Math.random() < 0.1) {
                this.createParticle(particleContainer);
            }
        }, 500);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 5 + 3) + 's';
        particle.style.background = this.getRandomHackerColor();
        
        container.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }

    getRandomHackerColor() {
        const colors = ['#00ff41', '#00ffff', '#ff0080', '#ffff00'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Copy to clipboard with hacker effect
    copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            button.textContent = '✓';
            button.style.background = '#00ff41';
            button.style.color = '#000';
            
            setTimeout(() => {
                button.textContent = '📋';
                button.style.background = '';
                button.style.color = '';
            }, 1000);
        });
    }

    // Konami code easter egg
    initKonamiCode() {
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        let userInput = [];

        document.addEventListener('keydown', (e) => {
            userInput.push(e.keyCode);
            
            if (userInput.length > konamiCode.length) {
                userInput.shift();
            }
            
            if (userInput.join(',') === konamiCode.join(',')) {
                this.activateMatrixMode();
                userInput = [];
            }
        });
    }

    activateMatrixMode() {
        document.body.style.background = '#000';
        this.isMatrixActive = true;
        
        // Create intense matrix effect
        const matrixBg = document.querySelector('.matrix-bg');
        for (let i = 0; i < 200; i++) {
            setTimeout(() => {
                this.createMatrixChar(matrixBg);
            }, i * 10);
        }
        
        console.log('%cMATRIX MODE ACTIVATED', 'color: #00ff41; font-size: 20px; font-family: monospace; text-shadow: 0 0 10px #00ff41;');
    }

    update() {
        // Continuous update loop for dynamic effects
        requestAnimationFrame(() => this.update());
        
        // Update particle positions if needed
        // Add any real-time effects here
    }
}

// Initialize hacker effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const hackerFX = new HackerEffects();
    
    // Show boot sequence on first visit
    if (!sessionStorage.getItem('banditVisited')) {
        hackerFX.displayBootSequence();
        sessionStorage.setItem('banditVisited', 'true');
    }
    
    // Initialize Konami code
    hackerFX.initKonamiCode();
    
    // Make copy buttons functional
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const credValue = e.target.previousElementSibling.textContent;
            hackerFX.copyToClipboard(credValue, e.target);
        });
    });
});

// Console ASCII art
console.log(`
 ██████╗  █████╗ ███╗   ██╗██████╗ ██╗████████╗     ██████╗████████╗███████╗
 ██╔══██╗██╔══██╗████╗  ██║██╔══██╗██║╚══██╔══╝    ██╔════╝╚══██╔══╝██╔════╝
 ██████╔╝███████║██╔██╗ ██║██║  ██║██║   ██║       ██║        ██║   █████╗  
 ██╔══██╗██╔══██║██║╚██╗██║██║  ██║██║   ██║       ██║        ██║   ██╔══╝  
 ██████╔╝██║  ██║██║ ╚████║██████╔╝██║   ██║       ╚██████╗   ██║   ██║     
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝   ╚═╝        ╚═════╝   ╚═╝   ╚═╝     
`);

console.log('%cWelcome to the Bandit CTF Hacker Interface', 'color: #00ff41; font-size: 16px; font-family: monospace;');
console.log('%cTry the Konami code for a surprise...', 'color: #00ffff; font-family: monospace;');

// ===================== SCROLL FUNCTIONALITY =====================
// Función para scroll suave a las secciones
function scrollToLevel(levelId) {
    const element = document.getElementById(levelId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===================== ANIMATION OBSERVERS =====================
// Animaciones de entrada cuando los elementos entran en viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos con animación
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-fade-in, .level-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });
});
// Agregar al final del archivo

// ===================== LEVEL GUIDE FUNCTIONALITY - UI/UX MEJORADA =====================
// Toggle level content visibility con animaciones mejoradas
function toggleLevel(levelId) {
    const content = document.getElementById(levelId);
    const levelDetail = content.parentElement;
    const section = levelDetail.closest('.levels-section');
    
    // Si el nivel ya está activo, cerrarlo
    if (content.classList.contains('active')) {
        closeLevel(content, levelDetail);
        return;
    }
    
    // Cerrar otros niveles abiertos en la misma sección
    const openLevels = section.querySelectorAll('.level-content.active');
    const openDetails = section.querySelectorAll('.level-detail.active');
    
    openLevels.forEach((level, index) => {
        setTimeout(() => {
            closeLevel(level, level.parentElement);
        }, index * 100);
    });
    
    // Abrir el nivel actual con delay
    setTimeout(() => {
        openLevel(content, levelDetail);
    }, openLevels.length * 100 + 200);
}

function openLevel(content, levelDetail) {
    content.classList.add('active');
    levelDetail.classList.add('active');
    
    // Scroll suave hacia el elemento
    setTimeout(() => {
        levelDetail.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        });
    }, 300);
    
    // Animar elementos internos
    animateContentElements(content);
}

function closeLevel(content, levelDetail) {
    content.classList.remove('active');
    levelDetail.classList.remove('active');
}

function animateContentElements(content) {
    const elements = content.querySelectorAll('.level-objective, .level-solution, .level-explanation');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150 + 200);
    });
}

// Copy to clipboard functionality mejorada
function copyToClipboard(text, button) {
    // Crear efecto visual inmediato
    if (button) {
        createRippleEffect(button);
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
    
    navigator.clipboard.writeText(text).then(() => {
        showCopyFeedback('✓ Copiado exitosamente');
        if (button) {
            updateButtonState(button, 'success');
        }
    }).catch(err => {
        console.error('Error copying text: ', err);
        fallbackCopyTextToClipboard(text);
        if (button) {
            updateButtonState(button, 'error');
        }
    });
}

function createRippleEffect(button) {
    const ripple = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(35, 244, 68, 0.4)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function updateButtonState(button, state) {
    const originalText = button.textContent;
    const originalBackground = button.style.background;
    
    if (state === 'success') {
        button.textContent = '✓';
        button.style.background = 'var(--accent-green)';
        button.style.color = 'var(--primary-dark)';
    } else if (state === 'error') {
        button.textContent = '✗';
        button.style.background = '#ef4444';
        button.style.color = 'white';
    }
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = originalBackground;
        button.style.color = '';
    }, 2000);
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showCopyFeedback('✓ Copiado (modo compatibilidad)');
    } catch (err) {
        console.error('Fallback: Unable to copy', err);
        showCopyFeedback('✗ Error al copiar', 'error');
    }

    document.body.removeChild(textArea);
}

function showCopyFeedback(message, type = 'success') {
    // Remover feedback anterior si existe
    const existingFeedback = document.querySelector('.copy-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    feedback.textContent = message;
    
    // Estilos dinámicos
    const styles = {
        position: 'fixed',
        top: '30px',
        right: '30px',
        padding: 'var(--space-md) var(--space-lg)',
        borderRadius: 'var(--radius-lg)',
        zIndex: '10000',
        fontSize: '0.9rem',
        fontWeight: '600',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        border: '1px solid',
        animation: 'feedbackSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-sm)'
    };
    
    if (type === 'success') {
        styles.background = 'linear-gradient(135deg, var(--accent-green), #059669)';
        styles.color = 'var(--primary-dark)';
        styles.borderColor = 'var(--accent-green)';
    } else {
        styles.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        styles.color = 'white';
        styles.borderColor = '#ef4444';
    }
    
    Object.assign(feedback.style, styles);
    document.body.appendChild(feedback);

    // Auto-remove después de 3 segundos
    setTimeout(() => {
        feedback.style.animation = 'feedbackSlideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            feedback.remove();
        }, 400);
    }, 3000);
}

// Inicializar efectos mejorados cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar efectos de entrada escalonados a los niveles
    const levelDetails = document.querySelectorAll('.level-detail');
    levelDetails.forEach((level, index) => {
        level.style.opacity = '0';
        level.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            level.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            level.style.opacity = '1';
            level.style.transform = 'translateY(0)';
        }, index * 150 + 300);
    });
    
    // Mejorar los botones de copia existentes
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Obtener el texto a copiar del elemento hermano anterior
            const textElement = e.target.previousElementSibling;
            if (textElement) {
                const textToCopy = textElement.textContent || textElement.value;
                copyToClipboard(textToCopy, e.target);
            }
        });
    });
    
    // Aplicar efectos de parallax sutil en scroll
    window.addEventListener('scroll', throttle(handleParallaxEffect, 16));
});

// Throttle function para optimizar performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function handleParallaxEffect() {
    const levelSections = document.querySelectorAll('.levels-section');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.2;
    
    levelSections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            section.style.transform = `translateY(${rate * 0.1}px)`;
        }
    });
}

// Agregar las animaciones CSS adicionales
const enhancedCSS = `
@keyframes feedbackSlideIn {
    from {
        opacity: 0;
        transform: translateX(100px) scale(0.8);
    }
    to {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
}

@keyframes feedbackSlideOut {
    from {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
    to {
        opacity: 0;
        transform: translateX(100px) scale(0.8);
    }
}

@keyframes ripple {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0;
    }
}

.copy-feedback {
    pointer-events: none;
    user-select: none;
}

/* Mejoras adicionales para la interactividad */
.level-detail-header {
    user-select: none;
}

.credential-value {
    user-select: all;
    cursor: text;
}

.code-block pre {
    user-select: all;
}
`;

// Inyectar CSS mejorado
const enhancedStyleSheet = document.createElement("style");
enhancedStyleSheet.innerText = enhancedCSS;
document.head.appendChild(enhancedStyleSheet);