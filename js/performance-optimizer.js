/**
 * GOD DIGITAL MARKETING - PERFORMANCE OPTIMIZER
 * Advanced Performance Monitoring and Optimization
 */

class PerformanceOptimizer {
  constructor() {
    this.metrics = {
      loadTime: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      firstInputDelay: 0,
      cumulativeLayoutShift: 0,
      timeToInteractive: 0
    };
    
    this.thresholds = {
      loadTime: 1500, // 1.5 seconds
      firstContentfulPaint: 1800,
      largestContentfulPaint: 2500,
      firstInputDelay: 100,
      cumulativeLayoutShift: 0.1,
      timeToInteractive: 3800
    };
    
    this.optimizations = [];
    this.isMonitoring = false;
    
    this.init();
  }

  init() {
    this.setupPerformanceObserver();
    this.measureCoreWebVitals();
    this.setupResourceOptimization();
    this.setupImageOptimization();
    this.setupCriticalResourcePrioritization();
    this.setupServiceWorker();
    this.startMonitoring();
  }

  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.largestContentfulPaint = lastEntry.startTime;
        this.evaluateMetric('largestContentfulPaint', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
          this.evaluateMetric('firstInputDelay', this.metrics.firstInputDelay);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cumulativeLayoutShift = clsValue;
        this.evaluateMetric('cumulativeLayoutShift', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Navigation timing
      const navigationObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          this.metrics.loadTime = entry.loadEventEnd - entry.loadEventStart;
          this.metrics.timeToInteractive = entry.domInteractive - entry.fetchStart;
          this.evaluateMetric('loadTime', this.metrics.loadTime);
          this.evaluateMetric('timeToInteractive', this.metrics.timeToInteractive);
        });
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });
    }
  }

  measureCoreWebVitals() {
    // First Contentful Paint
    if ('performance' in window && 'getEntriesByType' in performance) {
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        this.metrics.firstContentfulPaint = fcpEntry.startTime;
        this.evaluateMetric('firstContentfulPaint', fcpEntry.startTime);
      }
    }
  }

  evaluateMetric(metricName, value) {
    const threshold = this.thresholds[metricName];
    const status = value <= threshold ? 'good' : 'needs-improvement';
    
    console.log(`${metricName}: ${value}ms (${status})`);
    
    if (status === 'needs-improvement') {
      this.suggestOptimization(metricName, value, threshold);
    }
    
    // Send to analytics
    this.trackPerformanceMetric(metricName, value, status);
  }

  suggestOptimization(metricName, value, threshold) {
    const suggestions = {
      loadTime: [
        'Enable gzip compression',
        'Optimize images (WebP format)',
        'Minify CSS and JavaScript',
        'Use CDN for static assets',
        'Implement critical CSS inlining'
      ],
      firstContentfulPaint: [
        'Optimize server response time',
        'Eliminate render-blocking resources',
        'Preload critical resources',
        'Use efficient cache policy'
      ],
      largestContentfulPaint: [
        'Optimize images and videos',
        'Preload important resources',
        'Remove unused CSS',
        'Improve server response times'
      ],
      firstInputDelay: [
        'Reduce JavaScript execution time',
        'Remove unused JavaScript',
        'Use web workers for heavy tasks',
        'Implement code splitting'
      ],
      cumulativeLayoutShift: [
        'Add size attributes to images',
        'Reserve space for ads and embeds',
        'Avoid inserting content above existing content',
        'Use CSS aspect-ratio for responsive images'
      ],
      timeToInteractive: [
        'Reduce main thread work',
        'Minimize critical request depth',
        'Preload key requests',
        'Optimize third-party code'
      ]
    };

    const metricSuggestions = suggestions[metricName] || [];
    this.optimizations.push({
      metric: metricName,
      currentValue: value,
      threshold: threshold,
      suggestions: metricSuggestions,
      timestamp: Date.now()
    });
  }

  setupResourceOptimization() {
    // Preload critical resources
    const criticalResources = [
      { href: '/css/premium-design-system.css', as: 'style' },
      { href: '/css/4d-animations.css', as: 'style' },
      { href: '/js/premium-core.js', as: 'script' },
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;900&display=swap', as: 'style' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.as === 'style') {
        link.onload = () => {
          link.rel = 'stylesheet';
        };
      }
      document.head.appendChild(link);
    });
  }

  setupImageOptimization() {
    // Lazy loading with Intersection Observer
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Load high-quality image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            
            // Add fade-in effect
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s';
            img.onload = () => {
              img.style.opacity = '1';
            };
          }
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });

    // Convert images to WebP if supported
    this.setupWebPSupport();
  }

  setupWebPSupport() {
    const supportsWebP = () => {
      return new Promise((resolve) => {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
          resolve(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
      });
    };

    supportsWebP().then(supported => {
      if (supported) {
        document.body.classList.add('webp-supported');
        // Replace image sources with WebP versions
        document.querySelectorAll('img[data-webp]').forEach(img => {
          img.src = img.dataset.webp;
        });
      }
    });
  }

  setupCriticalResourcePrioritization() {
    // Prioritize critical resources
    const criticalCSS = `
      /* Critical above-the-fold styles */
      body { margin: 0; background: #000; color: #fff; font-family: 'Inter', sans-serif; }
      .loading-4d { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #000; display: flex; align-items: center; justify-content: center; z-index: 9999; }
      .hero-section { min-height: 100vh; background: linear-gradient(135deg, #000000 0%, #1A1A1A 50%, #000000 100%); display: flex; align-items: center; justify-content: center; position: relative; }
    `;

    // Inline critical CSS
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);

    // Defer non-critical CSS
    const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    nonCriticalCSS.forEach(link => {
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
    });
  }

  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
          this.createServiceWorkerFile();
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }

  createServiceWorkerFile() {
    // This would typically be a separate file
    const swContent = `
      const CACHE_NAME = 'god-digital-marketing-v1';
      const urlsToCache = [
        '/',
        '/css/premium-design-system.css',
        '/css/4d-animations.css',
        '/css/style.css',
        '/js/premium-core.js',
        '/js/webgl-engine-advanced.js'
      ];

      self.addEventListener('install', event => {
        event.waitUntil(
          caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
        );
      });

      self.addEventListener('fetch', event => {
        event.respondWith(
          caches.match(event.request)
            .then(response => {
              return response || fetch(event.request);
            })
        );
      });
    `;

    // In a real implementation, you would save this to a file
    console.log('Service Worker content ready for deployment');
  }

  startMonitoring() {
    this.isMonitoring = true;
    
    // Monitor performance every 30 seconds
    setInterval(() => {
      this.checkPerformanceHealth();
    }, 30000);

    // Monitor memory usage
    if ('memory' in performance) {
      setInterval(() => {
        this.monitorMemoryUsage();
      }, 10000);
    }

    // Monitor frame rate
    this.monitorFrameRate();
  }

  checkPerformanceHealth() {
    const healthScore = this.calculateHealthScore();
    
    if (healthScore < 80) {
      console.warn(`Performance health score: ${healthScore}%`);
      this.implementEmergencyOptimizations();
    }
    
    this.trackPerformanceMetric('health_score', healthScore, 'info');
  }

  calculateHealthScore() {
    let score = 100;
    
    Object.keys(this.metrics).forEach(metric => {
      const value = this.metrics[metric];
      const threshold = this.thresholds[metric];
      
      if (value > threshold) {
        const penalty = Math.min(30, (value - threshold) / threshold * 20);
        score -= penalty;
      }
    });
    
    return Math.max(0, Math.round(score));
  }

  monitorMemoryUsage() {
    if ('memory' in performance) {
      const memory = performance.memory;
      const memoryUsage = {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
      };
      
      const usagePercent = (memoryUsage.used / memoryUsage.limit) * 100;
      
      if (usagePercent > 80) {
        console.warn(`High memory usage: ${usagePercent.toFixed(1)}%`);
        this.optimizeMemoryUsage();
      }
      
      this.trackPerformanceMetric('memory_usage', usagePercent, 'info');
    }
  }

  monitorFrameRate() {
    let lastTime = performance.now();
    let frameCount = 0;
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        if (fps < 50) {
          console.warn(`Low frame rate detected: ${fps} FPS`);
          this.optimizeAnimations();
        }
        
        this.trackPerformanceMetric('frame_rate', fps, 'info');
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }

  implementEmergencyOptimizations() {
    // Reduce particle count
    if (window.AdvancedWebGL4DEngine && window.AdvancedWebGL4DEngine.particles) {
      const particleCount = window.AdvancedWebGL4DEngine.particleCount;
      window.AdvancedWebGL4DEngine.particleCount = Math.max(500, particleCount * 0.7);
    }
    
    // Disable non-essential animations
    document.body.classList.add('performance-mode');
    
    // Reduce animation frame rate
    this.throttleAnimations();
  }

  optimizeMemoryUsage() {
    // Force garbage collection (if available)
    if (window.gc) {
      window.gc();
    }
    
    // Clear unused textures and geometries
    if (window.AdvancedWebGL4DEngine && window.AdvancedWebGL4DEngine.renderer) {
      window.AdvancedWebGL4DEngine.renderer.dispose();
    }
  }

  optimizeAnimations() {
    // Reduce animation complexity
    document.body.classList.add('reduced-animations');
    
    // Lower particle count
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      if (index % 2 === 0) {
        particle.style.display = 'none';
      }
    });
  }

  throttleAnimations() {
    // Implement frame rate throttling
    let lastFrame = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    
    const originalRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback) => {
      return originalRAF((timestamp) => {
        if (timestamp - lastFrame >= frameInterval) {
          lastFrame = timestamp;
          callback(timestamp);
        }
      });
    };
  }

  trackPerformanceMetric(name, value, type) {
    // Send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
        metric_type: type
      });
    }
    
    // Log to console in development
    if (window.location.hostname === 'localhost') {
      console.log(`Performance: ${name} = ${value} (${type})`);
    }
  }

  generatePerformanceReport() {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: this.metrics,
      thresholds: this.thresholds,
      optimizations: this.optimizations,
      healthScore: this.calculateHealthScore(),
      recommendations: this.generateRecommendations()
    };
    
    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    
    this.optimizations.forEach(opt => {
      recommendations.push({
        priority: opt.currentValue > opt.threshold * 2 ? 'high' : 'medium',
        metric: opt.metric,
        suggestions: opt.suggestions
      });
    });
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  exportReport() {
    const report = this.generatePerformanceReport();
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Initialize Performance Optimizer
const performanceOptimizer = new PerformanceOptimizer();

// Global access
window.PerformanceOptimizer = performanceOptimizer;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PerformanceOptimizer;
}
