/* ========================================
   CRITICAL JAVASCRIPT FIXES FOR CODESPACE
   Immediate fixes for functionality and animations
   ======================================== */

// Ensure DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('God Digital Marketing - Critical fixes loaded');
    
    // Initialize all critical functions
    initializeNavigation();
    initializeAnimations();
    initializeParticles();
    initializeCounters();
    initializeScrollEffects();
    initializeMobileMenu();
    
    // Hide loading screen
    setTimeout(() => {
        const loader = document.querySelector('.loading-4d');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }
    }, 1000);
});

// Navigation functionality
function initializeNavigation() {
    const nav = document.querySelector('.premium-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
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
    
    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (nav) {
            if (currentScrollY > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.95)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'var(--divine-black)';
                nav.style.backdropFilter = 'none';
            }
        }
        
        lastScrollY = currentScrollY;
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Particle system
function initializeParticles() {
    const particleContainers = document.querySelectorAll('.particles-container');
    
    particleContainers.forEach(container => {
        createParticles(container);
    });
}

function createParticles(container) {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        
        // Random opacity
        particle.style.opacity = 0.3 + Math.random() * 0.4;
        
        container.appendChild(particle);
    }
}

// Counter animations
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number
        let displayValue = Math.floor(current);
        if (element.textContent.includes('$')) {
            displayValue = '$' + displayValue + 'M+';
        } else {
            displayValue = displayValue + '+';
        }
        
        element.textContent = displayValue;
    }, 16);
}

// Scroll reveal animations
function initializeScrollEffects() {
    const revealElements = document.querySelectorAll('.scroll-reveal-4d');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// General animations
function initializeAnimations() {
    // Add CSS for scroll reveal animations
    const style = document.createElement('style');
    style.textContent = `
        .scroll-reveal-4d {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-reveal-4d.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-reveal-4d.delay-1 {
            transition-delay: 0.1s;
        }
        
        .scroll-reveal-4d.delay-2 {
            transition-delay: 0.2s;
        }
        
        .scroll-reveal-4d.delay-3 {
            transition-delay: 0.3s;
        }
        
        .scroll-reveal-4d.delay-4 {
            transition-delay: 0.4s;
        }
        
        /* Mobile menu styles */
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 100%;
                left: 0;
                width: 100%;
                background: var(--divine-black);
                border-top: 1px solid var(--charcoal);
                flex-direction: column;
                padding: var(--space-lg);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .nav-menu.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-menu .nav-link {
                padding: var(--space-md) 0;
                border-bottom: 1px solid var(--charcoal);
                width: 100%;
                text-align: center;
            }
            
            .nav-menu .nav-link:last-child {
                border-bottom: none;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
        
        /* Particle animations */
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--cosmic-white);
            border-radius: 50%;
            opacity: 0.4;
            animation: particleFloat 8s linear infinite;
        }
        
        /* Button hover effects */
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: left 0.5s ease;
        }
        
        .btn:hover::before {
            left: 100%;
        }
        
        /* Card hover effects */
        .card {
            position: relative;
            overflow: hidden;
        }
        
        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .card:hover::before {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// Utility functions
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

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any size-dependent elements
    console.log('Window resized, recalculating layouts...');
}, 250));

// Export functions for global access
window.GodDigitalMarketing = {
    initializeNavigation,
    initializeAnimations,
    initializeParticles,
    initializeCounters,
    initializeScrollEffects,
    initializeMobileMenu
};