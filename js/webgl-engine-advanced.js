/**
 * GOD DIGITAL MARKETING - ADVANCED WEBGL 4D ENGINE
 * Premium Three.js Implementation with Advanced Effects
 */

class AdvancedWebGL4DEngine {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.geometricShapes = [];
    this.animationId = null;
    this.mouse = { x: 0, y: 0 };
    this.isInitialized = false;
    this.clock = null;
    this.raycaster = null;
    this.stats = null;
    
    // Performance settings
    this.isMobile = this.detectMobile();
    this.particleCount = this.isMobile ? 1000 : 2000;
    this.shapeCount = this.isMobile ? 3 : 6;
    
    this.init();
  }

  detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  async init() {
    if (!this.checkWebGLSupport()) {
      console.warn('WebGL not supported, falling back to CSS animations');
      return;
    }

    try {
      // Load Three.js dynamically
      await this.loadThreeJS();
      
      this.setupScene();
      this.setupCamera();
      this.setupRenderer();
      this.setupLighting();
      this.setupRaycaster();
      this.createParticleSystem();
      this.createGeometricShapes();
      this.createPremiumLogo3D();
      this.setupPostProcessing();
      this.setupEventListeners();
      this.setupPerformanceMonitoring();
      this.startAnimation();
      
      this.isInitialized = true;
      console.log('Advanced WebGL 4D Engine initialized successfully');
      
      // Dispatch ready event
      document.dispatchEvent(new CustomEvent('webglEngineReady'));
      
    } catch (error) {
      console.error('Failed to initialize WebGL engine:', error);
      this.fallbackToCSS();
    }
  }

  async loadThreeJS() {
    // In a real implementation, you would load Three.js from CDN or npm
    // For this demo, we'll simulate the Three.js API
    if (typeof THREE === 'undefined') {
      // Load Three.js from CDN
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r159/three.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
  }

  checkWebGLSupport() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.fog = new THREE.Fog(0x000000, 50, 200);
    
    this.clock = new THREE.Clock();
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 30);
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isMobile,
      alpha: true,
      powerPreference: "high-performance"
    });
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    
    // Style the canvas
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '0';
    this.renderer.domElement.style.left = '0';
    this.renderer.domElement.style.pointerEvents = 'none';
    this.renderer.domElement.style.zIndex = '1';
  }

  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);
    
    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(-1, 1, 1);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);
    
    // Point lights for premium effect
    const pointLight1 = new THREE.PointLight(0xffffff, 0.5, 100);
    pointLight1.position.set(10, 10, 10);
    this.scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x808080, 0.3, 100);
    pointLight2.position.set(-10, -10, 10);
    this.scene.add(pointLight2);
  }

  setupRaycaster() {
    this.raycaster = new THREE.Raycaster();
  }

  createParticleSystem() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);
    const sizes = new Float32Array(this.particleCount);
    
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      
      // Positions
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;
      
      // Colors (monochrome palette)
      const colorValue = Math.random() > 0.5 ? 1 : 0.5;
      colors[i3] = colorValue;
      colors[i3 + 1] = colorValue;
      colors[i3 + 2] = colorValue;
      
      // Sizes
      sizes[i] = Math.random() * 2 + 1;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Custom shader material for premium particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        uniform float pixelRatio;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });
    
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createGeometricShapes() {
    const geometries = [
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.SphereGeometry(1.5, 32, 32),
      new THREE.ConeGeometry(1, 2, 8),
      new THREE.OctahedronGeometry(1.5),
      new THREE.TetrahedronGeometry(1.5),
      new THREE.IcosahedronGeometry(1.5)
    ];
    
    for (let i = 0; i < this.shapeCount; i++) {
      const geometry = geometries[i % geometries.length];
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
        emissive: 0x222222
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      );
      
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      // Store rotation speeds
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.02 + 0.01,
        floatRange: Math.random() * 5 + 2
      };
      
      this.geometricShapes.push(mesh);
      this.scene.add(mesh);
    }
  }

  createPremiumLogo3D() {
    // Create a 3D text logo (simplified version)
    const logoGroup = new THREE.Group();
    
    // Create letter shapes using basic geometries
    const letterMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x111111
    });
    
    // G
    const gGeometry = new THREE.TorusGeometry(2, 0.5, 8, 16, Math.PI * 1.5);
    const gMesh = new THREE.Mesh(gGeometry, letterMaterial);
    gMesh.position.set(-6, 0, 0);
    logoGroup.add(gMesh);
    
    // D
    const dGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 16, 1, false, 0, Math.PI);
    const dMesh = new THREE.Mesh(dGeometry, letterMaterial);
    dMesh.position.set(-2, 0, 0);
    dMesh.rotation.z = Math.PI / 2;
    logoGroup.add(dMesh);
    
    // M
    const mGeometry = new THREE.BoxGeometry(0.5, 4, 0.5);
    const mMesh1 = new THREE.Mesh(mGeometry, letterMaterial);
    mMesh1.position.set(2, 0, 0);
    logoGroup.add(mMesh1);
    
    const mMesh2 = new THREE.Mesh(mGeometry, letterMaterial);
    mMesh2.position.set(4, 0, 0);
    logoGroup.add(mMesh2);
    
    logoGroup.position.set(0, 10, -20);
    logoGroup.scale.set(0.5, 0.5, 0.5);
    
    // Add floating animation
    logoGroup.userData = {
      originalY: logoGroup.position.y,
      floatSpeed: 0.01,
      floatRange: 2
    };
    
    this.premiumLogo = logoGroup;
    this.scene.add(logoGroup);
  }

  setupPostProcessing() {
    // In a full implementation, you would add post-processing effects here
    // Such as bloom, depth of field, etc.
  }

  setupPerformanceMonitoring() {
    if (window.location.search.includes('debug')) {
      // Add performance stats (only in debug mode)
      this.stats = new Stats();
      this.stats.showPanel(0);
      document.body.appendChild(this.stats.dom);
    }
  }

  animate() {
    if (this.stats) this.stats.begin();
    
    const elapsedTime = this.clock.getElapsedTime();
    
    // Update particles
    if (this.particles) {
      this.particles.material.uniforms.time.value = elapsedTime;
      this.particles.rotation.y = elapsedTime * 0.1;
      
      // Animate particle positions
      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(elapsedTime + positions[i] * 0.01) * 0.01;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }
    
    // Update geometric shapes
    this.geometricShapes.forEach(shape => {
      shape.rotation.x += shape.userData.rotationSpeed.x;
      shape.rotation.y += shape.userData.rotationSpeed.y;
      shape.rotation.z += shape.userData.rotationSpeed.z;
      
      // Floating animation
      shape.position.y += Math.sin(elapsedTime * shape.userData.floatSpeed) * 0.01;
    });
    
    // Update premium logo
    if (this.premiumLogo) {
      this.premiumLogo.position.y = this.premiumLogo.userData.originalY + 
        Math.sin(elapsedTime * this.premiumLogo.userData.floatSpeed) * this.premiumLogo.userData.floatRange;
      this.premiumLogo.rotation.y = elapsedTime * 0.2;
    }
    
    // Camera movement based on mouse
    this.camera.position.x += (this.mouse.x * 5 - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouse.y * 5 - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);
    
    this.renderer.render(this.scene, this.camera);
    
    if (this.stats) this.stats.end();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  startAnimation() {
    if (this.isInitialized) {
      this.animate();
    }
  }

  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  setupEventListeners() {
    // Window resize
    window.addEventListener('resize', () => this.onWindowResize());
    
    // Mouse movement
    document.addEventListener('mousemove', (event) => this.onMouseMove(event));
    
    // Performance optimization
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopAnimation();
      } else {
        this.startAnimation();
      }
    });
    
    // Touch events for mobile
    document.addEventListener('touchmove', (event) => this.onTouchMove(event));
  }

  onWindowResize() {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onTouchMove(event) {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
  }

  addToContainer(container) {
    if (this.renderer && container) {
      container.appendChild(this.renderer.domElement);
    }
  }

  fallbackToCSS() {
    console.log('Falling back to CSS animations');
    document.body.classList.add('webgl-fallback');
  }

  destroy() {
    this.stopAnimation();
    
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
    
    if (this.stats && this.stats.dom) {
      document.body.removeChild(this.stats.dom);
    }
    
    this.isInitialized = false;
  }
}

// Initialize Advanced WebGL Engine when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const advancedEngine = new AdvancedWebGL4DEngine();
  
  // Add to hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    advancedEngine.addToContainer(heroSection);
  }
  
  // Make globally accessible
  window.AdvancedWebGL4DEngine = advancedEngine;
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdvancedWebGL4DEngine;
}
