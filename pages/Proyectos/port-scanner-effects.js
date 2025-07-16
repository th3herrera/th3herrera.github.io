// Port Scanner Effects and Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Marcar que JavaScript está cargado
    document.body.classList.add('js-loaded');
    
    // Inicializar todas las funciones
    initTerminalAnimation();
    initCodeTabs();
    initDemoSystem();
    initCopyButtons();
    initScrollAnimations();
    initPortScanAnimation();
    initAdvancedDemo();
    initCodeHighlighting();
    initNetworkVisualization();
    initCommandHistory();
    
    // Aplicar animaciones inmediatamente para elementos visibles
    setTimeout(() => {
        const visibleElements = document.querySelectorAll('.animate-on-scroll');
        visibleElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }, 100);
});

// Terminal Animation
function initTerminalAnimation() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            if (line.classList.contains('scanning-line')) {
                animateScanningDots(line);
            }
        }, (index + 1) * 800);
    });
}

function animateScanningDots(element) {
    const text = element.querySelector('.scanning-text');
    const originalText = text.textContent;
    let dotCount = 0;
    
    const interval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        const dots = '.'.repeat(dotCount);
        text.textContent = originalText + dots;
    }, 500);
    
    setTimeout(() => {
        clearInterval(interval);
        text.textContent = originalText;
    }, 3000);
}

// Code Tabs System
function initCodeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const codeContents = document.querySelectorAll('.code-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            codeContents.forEach(content => {
                content.style.display = 'none';
                content.style.opacity = '0';
            });
            
            // Add active class to clicked tab
            button.classList.add('active');
            
            // Show target content with animation
            const targetContent = document.getElementById(targetTab + '-code');
            if (targetContent) {
                targetContent.style.display = 'block';
                setTimeout(() => {
                    targetContent.style.opacity = '1';
                }, 50);
            }
        });
    });
}

// Demo System
function initDemoSystem() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    const demoContent = document.getElementById('demo-content');
    
    const demoScripts = {
        'port-scan': {
            title: 'Escaneo de Host Individual',
            content: `
                <div class="demo-line">
                    <span class="prompt">$</span>
                    <span class="command">./port_scan.sh 192.168.1.1</span>
                </div>
                <div class="demo-line output">
                    <span class="info">[*] Escaneando host: 192.168.1.1</span>
                </div>
                <div class="demo-line output">
                    <span class="info">[*] Iniciando escaneo de 65535 puertos...</span>
                </div>
                <div class="demo-line output scanning">
                    <span class="scanning-text">Escaneando</span>
                </div>
                <div class="demo-line output success" data-delay="2000">
                    <span class="success">[+] Host 192.168.1.1 - Puerto 22 (ABIERTO)</span>
                </div>
                <div class="demo-line output success" data-delay="2500">
                    <span class="success">[+] Host 192.168.1.1 - Puerto 80 (ABIERTO)</span>
                </div>
                <div class="demo-line output success" data-delay="3000">
                    <span class="success">[+] Host 192.168.1.1 - Puerto 443 (ABIERTO)</span>
                </div>
                <div class="demo-line output success" data-delay="3500">
                    <span class="success">[+] Host 192.168.1.1 - Puerto 8080 (ABIERTO)</span>
                </div>
                <div class="demo-line output" data-delay="4000">
                    <span class="info">[*] Escaneo completado. 4 puertos abiertos encontrados.</span>
                </div>
                <div class="demo-line" data-delay="4500">
                    <span class="prompt">$</span>
                    <span class="cursor">_</span>
                </div>
            `
        },
        'host-scan': {
            title: 'Escaneo de Red Local',
            content: `
                <div class="demo-line">
                    <span class="prompt">$</span>
                    <span class="command">./host_scan.sh 192.168.1</span>
                </div>
                <div class="demo-line output">
                    <span class="info">[*] Escaneando red: 192.168.1.0/24</span>
                </div>
                <div class="demo-line output">
                    <span class="info">[*] Puertos a escanear: 21, 22, 23, 25, 80, 139, 443, 445, 8080</span>
                </div>
                <div class="demo-line output scanning">
                    <span class="scanning-text">Escaneando hosts</span>
                </div>
                <div class="demo-line output success" data-delay="1500">
                    <span class="success">[+] Host 192.168.1.1 - Puerto 80 (ABIERTO)</span>
                </div>
                <div class="demo-line output success" data-delay="2000">
                    <span class="success">[+] Host 192.168.1.1 - Puerto 443 (ABIERTO)</span>
                </div>
                <div class="demo-line output success" data-delay="2500">
                    <span class="success">[+] Host 192.168.1.5 - Puerto 22 (ABIERTO)</span>
                </div>
                <div class="demo-line output success" data-delay="3000">
                    <span class="success">[+] Host 192.168.1.10 - Puerto 80 (ABIERTO)</span>
                </div>
                <div class="demo-line output success" data-delay="3500">
                    <span class="success">[+] Host 192.168.1.15 - Puerto 22 (ABIERTO)</span>
                </div>
                <div class="demo-line output success" data-delay="4000">
                    <span class="success">[+] Host 192.168.1.20 - Puerto 445 (ABIERTO)</span>
                </div>
                <div class="demo-line output" data-delay="4500">
                    <span class="info">[*] Escaneo de red completado. 6 puertos abiertos encontrados.</span>
                </div>
                <div class="demo-line" data-delay="5000">
                    <span class="prompt">$</span>
                    <span class="cursor">_</span>
                </div>
            `
        }
    };
    
    demoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const scriptType = button.getAttribute('data-script');
            
            // Update active button
            demoButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Clear and update content
            demoContent.innerHTML = '';
            
            setTimeout(() => {
                demoContent.innerHTML = demoScripts[scriptType].content;
                animateDemoLines();
            }, 200);
        });
    });
    
    // Initialize with port-scan demo
    if (demoContent) {
        demoContent.innerHTML = demoScripts['port-scan'].content;
        setTimeout(animateDemoLines, 500);
    }
}

function animateDemoLines() {
    const demoLines = document.querySelectorAll('.demo-line');
    
    demoLines.forEach((line, index) => {
        const delay = line.getAttribute('data-delay') || (index * 300);
        
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            
            if (line.classList.contains('scanning')) {
                animateScanningDots(line);
            }
        }, parseInt(delay));
    });
}

// Copy to Clipboard
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const targetId = button.getAttribute('data-clipboard-target');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                try {
                    await navigator.clipboard.writeText(targetElement.textContent);
                    
                    // Visual feedback
                    const originalText = button.textContent;
                    button.textContent = '✅ Copiado!';
                    button.style.background = '#10b981';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.background = '';
                    }, 2000);
                } catch (err) {
                    console.error('Error al copiar:', err);
                    button.textContent = '❌ Error';
                    setTimeout(() => {
                        button.textContent = '📋 Copiar';
                    }, 2000);
                }
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Port Scan Animation
function initPortScanAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        const suffix = stat.textContent.replace(/[\d]/g, '');
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    });
}

// Enhanced Demo System with Real-time Simulation
function initAdvancedDemo() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    const terminalContent = document.getElementById('demo-content');
    
    // Simulate real port scanning with progress
    function simulatePortScan(host, isNetwork = false) {
        const lines = [];
        
        if (isNetwork) {
            lines.push(`[*] Iniciando escaneo de red: ${host}.0/24`);
            lines.push(`[*] Hosts a escanear: 1-254`);
            lines.push(`[*] Puertos comunes: 21,22,23,25,80,139,443,445,8080`);
            
            // Simulate finding hosts
            const hosts = [1, 5, 10, 15, 20, 25];
            const ports = [21, 22, 80, 139, 443, 445, 8080];
            
            hosts.forEach((hostNum, index) => {
                const randomPort = ports[Math.floor(Math.random() * ports.length)];
                lines.push(`[+] Host ${host}.${hostNum} - Puerto ${randomPort} (ABIERTO)`);
            });
            
            lines.push(`[*] Escaneo completado. ${hosts.length} hosts activos encontrados.`);
        } else {
            lines.push(`[*] Iniciando escaneo completo del host: ${host}`);
            lines.push(`[*] Rango de puertos: 1-65535`);
            lines.push(`[*] Método: TCP Connect via /dev/tcp`);
            
            // Common open ports
            const openPorts = [22, 80, 443, 8080, 3306, 5432];
            openPorts.forEach(port => {
                lines.push(`[+] Host ${host} - Puerto ${port} (ABIERTO)`);
            });
            
            lines.push(`[*] Escaneo completado en 127 segundos. ${openPorts.length} puertos abiertos.`);
        }
        
        return lines;
    }
    
    // Enhanced animation with typing effect
    function typeWriterEffect(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function typeChar() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            }
        }
        
        typeChar();
    }
    
    // Add real-time port counter
    function createPortCounter() {
        const counter = document.createElement('div');
        counter.className = 'port-counter';
        counter.innerHTML = `
            <div class="counter-label">Puertos escaneados:</div>
            <div class="counter-value">0</div>
        `;
        return counter;
    }
    
    // Performance metrics display
    function showPerformanceMetrics() {
        const metrics = document.createElement('div');
        metrics.className = 'performance-metrics';
        metrics.innerHTML = `
            <div class="metric">
                <span class="metric-label">Velocidad:</span>
                <span class="metric-value">~850 puertos/min</span>
            </div>
            <div class="metric">
                <span class="metric-label">CPU:</span>
                <span class="metric-value">12%</span>
            </div>
            <div class="metric">
                <span class="metric-label">RAM:</span>
                <span class="metric-value">45 MB</span>
            </div>
        `;
        return metrics;
    }
}

// Interactive Code Highlighting
function initCodeHighlighting() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        // Add line numbers
        const lines = block.textContent.split('\n');
        const numberedLines = lines.map((line, index) => {
            if (line.trim() === '') return line;
            return `<span class="line-number">${index + 1}</span>${line}`;
        }).join('\n');
        
        block.innerHTML = numberedLines;
        
        // Add interactive highlighting on hover
        block.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('line-number')) {
                const lineElement = e.target.parentElement;
                lineElement.classList.add('highlighted-line');
            }
        });
        
        block.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('line-number')) {
                const lineElement = e.target.parentElement;
                lineElement.classList.remove('highlighted-line');
            }
        });
    });
}

// Network Topology Visualization (Simple)
function initNetworkVisualization() {
    const section = document.querySelector('.results-section');
    if (!section) return;
    
    const visualization = document.createElement('div');
    visualization.className = 'network-visualization';
    visualization.innerHTML = `
        <h3>🌐 Visualización de Red Escaneada</h3>
        <div class="network-diagram">
            <div class="network-node router">
                <span class="node-icon">🌐</span>
                <span class="node-label">Router<br>192.168.1.1</span>
                <span class="node-status active">Activo</span>
            </div>
            <div class="network-connections">
                <div class="connection-line"></div>
            </div>
            <div class="network-devices">
                <div class="network-node device">
                    <span class="node-icon">💻</span>
                    <span class="node-label">PC-001<br>192.168.1.5</span>
                    <span class="node-status active">SSH:22</span>
                </div>
                <div class="network-node device">
                    <span class="node-icon">🖥️</span>
                    <span class="node-label">Server<br>192.168.1.10</span>
                    <span class="node-status active">HTTP:80</span>
                </div>
                <div class="network-node device">
                    <span class="node-icon">🖨️</span>
                    <span class="node-label">Printer<br>192.168.1.15</span>
                    <span class="node-status inactive">Inactivo</span>
                </div>
            </div>
        </div>
    `;
    
    section.appendChild(visualization);
}

// Terminal Command History
function initCommandHistory() {
    const terminalInputs = document.querySelectorAll('.terminal-input');
    let commandHistory = [
        './port_scan.sh 192.168.1.1',
        './host_scan.sh 192.168.1',
        './port_scan.sh example.com',
        './host_scan.sh 10.0.1'
    ];
    let historyIndex = -1;
    
    terminalInputs.forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.value = commandHistory[commandHistory.length - 1 - historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    input.value = commandHistory[commandHistory.length - 1 - historyIndex];
                } else if (historyIndex === 0) {
                    historyIndex = -1;
                    input.value = '';
                }
            }
        });
    });
}

// CSS Styles for demo animations
const demoStyles = `
    .demo-line {
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        margin-bottom: 0.5rem;
    }
    
    .demo-line .prompt {
        color: #4ade80;
        margin-right: 0.5rem;
    }
    
    .demo-line .command {
        color: #e5e7eb;
    }
    
    .demo-line.output {
        color: #d1d5db;
    }
    
    .demo-line .success {
        color: #4ade80;
    }
    
    .demo-line .info {
        color: #60a5fa;
    }
    
    .demo-line .scanning-text {
        color: #fbbf24;
    }
    
    .demo-line .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;

// Inject demo styles
const styleElement = document.createElement('style');
styleElement.textContent = demoStyles;
document.head.appendChild(styleElement);

// Initialize additional effects on load
window.addEventListener('load', () => {
    setTimeout(() => {
        initNetworkVisualization();
        initParticleSystem();
    }, 1000);
});

// Performance optimization
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

// Add smooth scroll for anchor links
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

// Add loading states for interactive elements
function addLoadingStates() {
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary, .demo-btn, .tab-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}
