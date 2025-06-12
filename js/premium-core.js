/**
 * GOD DIGITAL MARKETING - PREMIUM CORE FUNCTIONALITY
 * Revolutionary 4D Website Core JavaScript with Production Features
 */

class PremiumCore {
  constructor() {
    this.isLoaded = false;
    this.animations = [];
    this.observers = [];
    this.countersAnimated = false;
    this.init();
  }

  init() {
    this.setupLoadingScreen();
    this.setupScrollAnimations();
    this.setupParticleSystem();
    this.setup4DElements();
    this.setupPerformanceOptimizations();
    this.setupAccessibility();
    this.setupAnalytics();
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }
  }

  onDOMReady() {
    this.hideLoadingScreen();
    this.startAnimations();
    this.setupEventListeners();
    this.setupFormHandlers();
    this.isLoaded = true;
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('premiumCoreLoaded'));
    
    // Track page load
    this.trackEvent('page_loaded', { page: 'homepage' });
  }

  setupLoadingScreen() {
    const loadingHTML = `
      <div class="loading-4d" id="loadingScreen">
        <div class="loading-content">
          <div class="loading-spinner-4d"></div>
          <div class="loading-text">
            <h3>God Digital Marketing</h3>
            <p>Loading Premium Experience...</p>
          </div>
        </div>
      </div>
    `;
    
    if (!document.getElementById('loadingScreen')) {
      document.body.insertAdjacentHTML('afterbegin', loadingHTML);
    }
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.remove();
        }, 600);
      }, 1500); // Show loading for 1.5 seconds minimum
    }
  }

  setupScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // Add staggered delays for multiple elements
          const siblings = entry.target.parentElement.querySelectorAll('.scroll-reveal-4d');
          siblings.forEach((sibling, index) => {
            if (sibling === entry.target) {
              sibling.style.transitionDelay = `${index * 0.1}s`;
            }
          });

          // Trigger counter animations for metrics
          if (entry.target.classList.contains('hero-metrics') && !this.countersAnimated) {
            this.animateCounters();
            this.countersAnimated = true;
          }

          // Trigger metric animations in results section
          if (entry.target.classList.contains('results-metrics')) {
            this.animateMetricBars();
          }
        }
      });
    }, observerOptions);

    // Observe all scroll reveal elements
    document.querySelectorAll('.scroll-reveal-4d').forEach(el => {
      this.scrollObserver.observe(el);
    });
  }

  animateCounters() {
    const counters = document.querySelectorAll('.metric-number[data-count]');
    
    counters.forEach((counter, index) => {
      setTimeout(() => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            if (counter.textContent.includes('$')) {
              counter.textContent = `$${Math.floor(current)}M+`;
            } else {
              counter.textContent = `${Math.floor(current)}+`;
            }
            requestAnimationFrame(updateCounter);
          } else {
            if (counter.textContent.includes('$')) {
              counter.textContent = `$${target}M+`;
            } else {
              counter.textContent = `${target}+`;
            }
          }
        };
        
        updateCounter();
      }, index * 200); // Stagger the animations
    });
  }

  animateMetricBars() {
    const metricFills = document.querySelectorAll('.metric-fill');
    metricFills.forEach((fill, index) => {
      setTimeout(() => {
        const width = fill.style.width;
        fill.style.width = '0%';
        fill.style.transition = 'width 2s ease-out';
        setTimeout(() => {
          fill.style.width = width;
        }, 100);
      }, index * 300);
    });
  }

  setupParticleSystem() {
    const particleContainers = document.querySelectorAll('.particles-container');
    
    particleContainers.forEach(container => {
      this.createParticles(container, 50);
    });
  }

  createParticles(container, count) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random positioning and timing
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (8 + Math.random() * 4) + 's';
      
      container.appendChild(particle);
    }
  }

  setup4DElements() {
    // Add 4D classes to elements
    document.querySelectorAll('.card').forEach(card => {
      card.classList.add('card-4d');
    });

    // Setup hero 4D elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCTA = document.querySelector('.hero-cta');

    if (heroTitle) heroTitle.classList.add('hero-title-4d');
    if (heroSubtitle) heroSubtitle.classList.add('hero-subtitle-4d');
    if (heroCTA) heroCTA.classList.add('hero-cta-4d');

    // Setup service icons
    document.querySelectorAll('.service-icon').forEach(icon => {
      icon.classList.add('service-icon-4d');
    });
  }

  setupFormHandlers() {
    // Contact form handling
    const contactForms = document.querySelectorAll('form[data-form="contact"]');
    contactForms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleContactForm(e));
    });

    // Newsletter signup
    const newsletterForms = document.querySelectorAll('form[data-form="newsletter"]');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleNewsletterForm(e));
    });
  }

  handleContactForm(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
      this.showNotification('Thank you! We\'ll contact you within 24 hours.', 'success');
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Track conversion
      this.trackEvent('contact_form_submitted', {
        form_type: 'contact',
        page: window.location.pathname
      });
    }, 2000);
  }

  handleNewsletterForm(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    
    // Basic email validation
    if (!this.isValidEmail(email)) {
      this.showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Show success message
    this.showNotification('Successfully subscribed to our newsletter!', 'success');
    form.reset();
    
    // Track subscription
    this.trackEvent('newsletter_subscribed', { email_domain: email.split('@')[1] });
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });
  }

  setupAnalytics() {
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', this.throttle(() => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
          this.trackEvent('scroll_depth', { percent: maxScroll });
        }
      }
    }, 1000));

    // Track time on page
    this.startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Math.round((Date.now() - this.startTime) / 1000);
      this.trackEvent('time_on_page', { seconds: timeOnPage });
    });
  }

  trackEvent(eventName, parameters = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', eventName, parameters);
    }
    
    // Console log for development
    console.log('Event tracked:', eventName, parameters);
  }

  setupPerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
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

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // Preload critical resources
    this.preloadCriticalResources();
  }

  preloadCriticalResources() {
    const criticalResources = [
      '/css/premium-design-system.css',
      '/css/4d-animations.css',
      '/js/webgl-engine.js'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = resource.endsWith('.css') ? 'style' : 'script';
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  setupAccessibility() {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduced-motion');
    }

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  setupEventListeners() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Track navigation
          this.trackEvent('internal_link_clicked', {
            target: anchor.getAttribute('href'),
            text: anchor.textContent.trim()
          });
        }
      });
    });

    // CTA button tracking
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.trackEvent('cta_clicked', {
          button_text: btn.textContent.trim(),
          button_class: btn.className,
          page_section: this.getPageSection(btn)
        });
      });
    });
  }

  getPageSection(element) {
    const section = element.closest('section');
    return section ? section.id || section.className.split(' ')[0] : 'unknown';
  }

  // Utility methods
  debounce(func, wait) {
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

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  startAnimations() {
    // Start particle animations
    document.querySelectorAll('.particle').forEach((particle, index) => {
      setTimeout(() => {
        particle.style.animationPlayState = 'running';
      }, index * 100);
    });

    // Start 4D shape animations
    document.querySelectorAll('.shape-4d').forEach(shape => {
      shape.style.animationPlayState = 'running';
    });
  }

  // Cleanup method
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.animations.forEach(animation => animation.cancel());
    this.isLoaded = false;
  }
}

// Initialize Premium Core
const premiumCore = new PremiumCore();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PremiumCore;
}

// Global access
window.PremiumCore = premiumCore;
