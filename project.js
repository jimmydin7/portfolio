// Project data with detailed information
const projectData = {
  canalyze: {
    name: 'Canalyze',
    description: 'AI cancer prediction platform that helps users understand their risk factors and get personalized recommendations.',
    images: ['projects/canalyze/canalyze_1.png', 'projects/canalyze/canalyze_2.png'],
    features: [
      'AI-powered cancer risk prediction',
      'Personalized recommendations',
      'Medical data analysis',
      'User-friendly interface'
    ],
    technologies: ['Python', 'TensorFlow', 'React', 'Node.js'],
    github: 'https://github.com/yourusername/canalyze',
    live: 'https://canalyze.example.com'
  },
  matchdev: {
    name: 'Matchdev',
    description: 'A platform connecting developers based on their skills and interests, similar to a dating app but for professional networking.',
    images: ['projects/matchdev/matchdev_1.png', 'projects/matchdev/matchdev_2.png'],
    features: [
      'Developer matching algorithm',
      'Profile customization',
      'Skill-based filtering',
      'Real-time chat'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    github: 'https://github.com/yourusername/matchdev',
    live: 'https://matchdev.example.com'
  },
  soulharbor: {
    name: 'Soulharbor',
    description: 'A Discord bot designed for spiritual communities, featuring AI-powered conversations and custom games.',
    images: ['projects/soulharbor/soulharbor_1.png', 'projects/soulharbor/soulharbor_2.png'],
    features: [
      'AI conversation memory',
      'Custom spiritual games',
      'Meditation timers',
      'Community tools'
    ],
    technologies: ['Python', 'Discord.py', 'OpenAI API', 'MongoDB'],
    github: 'https://github.com/yourusername/soulharbor',
    live: 'https://discord.gg/soulharbor'
  },
  back2basics: {
    name: 'Back2Basics Minecraft Server',
    description: 'A comprehensive website for a Minecraft server, featuring announcements, ban appeals, and admin tools.',
    images: ['projects/back2basics/back2basics_1.png'],
    features: [
      'Announcements feed',
      'Ban appeal system',
      'Admin dashboard',
      'Server status'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/yourusername/back2basics',
    live: 'https://back2basics.example.com'
  },
  handmotion: {
    name: 'Hand Motion ML Detector',
    description: 'A computer vision application that controls PC volume using hand gestures, built with machine learning.',
    images: ['projects/handmotion/handmotion_1.png', 'projects/handmotion/handmotion_2.png'],
    features: [
      'Hand gesture recognition',
      'Volume control',
      'Real-time processing',
      'Custom gesture training'
    ],
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'MediaPipe'],
    github: 'https://github.com/yourusername/handmotion',
    live: 'https://handmotion.example.com'
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

// Get project ID from URL
function getProjectId() {
  const path = window.location.pathname;
  const match = path.match(/\/project\/([^\/]+)/);
  return match ? match[1] : null;
}

// Load project images
async function loadProjectImages(projectKey) {
  const project = projectData[projectKey];
  const images = [];
  
  for (const imagePath of project.images) {
    try {
      const imageExists = await checkImageExists(imagePath);
      if (imageExists) {
        images.push(imagePath);
      }
    } catch (error) {
      console.log(`Image not found: ${imagePath}`);
    }
  }
  
  return images.length > 0 ? images : fallbackImages[projectKey] || [];
}

// Check if image exists
function checkImageExists(imagePath) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imagePath;
  });
}

// Render project content
async function renderProjectContent() {
  const projectId = getProjectId();
  if (!projectId || !projectData[projectId]) {
    window.location.href = '/';
    return;
  }

  const project = projectData[projectId];
  const images = await loadProjectImages(projectId);
  
  const content = document.getElementById('project-content');
  content.innerHTML = `
    <h1 class="text-4xl font-bold mb-8">${project.name}</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div class="space-y-6">
        <p class="text-lg">${project.description}</p>
        
        <div>
          <h2 class="text-2xl font-semibold mb-4">Features</h2>
          <ul class="list-disc list-inside space-y-2">
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        
        <div>
          <h2 class="text-2xl font-semibold mb-4">Technologies</h2>
          <div class="flex flex-wrap gap-2">
            ${project.technologies.map(tech => 
              `<span class="px-3 py-1 bg-secondary rounded-full text-sm">${tech}</span>`
            ).join('')}
          </div>
        </div>
        
        <div class="flex gap-4">
          ${project.github ? `
            <a href="${project.github}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-accent transition-colors rounded">
              <i class="fab fa-github"></i> GitHub
            </a>
          ` : ''}
          ${project.live ? `
            <a href="${project.live}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-blue-600 transition-colors rounded">
              <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
          ` : ''}
        </div>
      </div>
      
      <div class="space-y-4">
        ${images.map((image, index) => `
          <img src="${image}" 
               alt="${project.name} screenshot ${index + 1}" 
               class="w-full h-auto rounded-lg shadow-lg"
               loading="lazy">
        `).join('')}
      </div>
    </div>
  `;
}

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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  renderProjectContent();
  initParticles();
}); 