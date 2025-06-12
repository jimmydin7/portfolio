// Project data with image paths
const projectData = {
  canalyze: {
    name: 'Canalyze',
    images: ['projects/canalyze/canalyze_1.png', 'projects/canalyze/canalyze_2.png']
  },
  matchdev: {
    name: 'Matchdev',
    images: ['projects/matchdev/matchdev_1.png', 'projects/matchdev/matchdev_2.png']
  },
  soulharbor: {
    name: 'Soulharbor',
    images: ['projects/soulharbor/soulharbor_1.png', 'projects/soulharbor/soulharbor_2.png']
  },
  back2basics: {
    name: 'Back2Basics Minecraft Server',
    images: ['projects/back2basics/back2basics_1.png']
  },
  handmotion: {
    name: 'Hand Motion ML Detector',
    images: ['projects/handmotion/handmotion_1.png', 'projects/handmotion/handmotion_2.png']
  }
};

// Fallback images for when project images are not available
const fallbackImages = {
  canalyze: [
    'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
  ],
  matchdev: [
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
  ],
  soulharbor: [
    'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/4050334/pexels-photo-4050334.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
  ],
  back2basics: [
    'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
  ],
  handmotion: [
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
  ]
};

// Initialize particles.js
function initParticles() {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 1 } },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
}

// Smooth scrolling for internal links
function initSmoothScrolling() {
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
}

// Intersection Observer for animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.project-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize particles
  initParticles();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Add loading state handling for images
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
      this.style.opacity = '1';
    });
    
    // Set initial opacity for smooth loading
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  });
});

// Performance optimization: Preload critical images
function preloadCriticalImages() {
  const criticalImages = [
    'projects/canalyze/canalyze_1.png',
    'projects/matchdev/matchdev_1.png',
    'projects/soulharbor/soulharbor_1.png'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Call preload function
preloadCriticalImages();

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');

const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

timelineItems.forEach(item => {
  observer.observe(item);
});