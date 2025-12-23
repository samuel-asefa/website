import './style.css'

interface Skill {
  name: string;
  icon: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links: {
    demo?: string;
    github?: string;
  };
}

interface ContactMethod {
  iconClass: string;
  title: string;
  text: string;
  url: string;
  isMail?: boolean;
}

const SKILLS_DATA = {
  programmingLanguages: [
    { name: 'HTML', icon: '/images/html.png' },
    { name: 'CSS', icon: '/images/css.png' },
    { name: 'JavaScript', icon: '/images/javascript.png' },
    { name: 'Python', icon: '/images/python.png' },
    { name: 'Java', icon: '/images/java.png' },
    { name: 'C++', icon: '/images/cpp.png' },
    { name: 'C#', icon: '/images/csharp.png' },
    { name: 'Swift', icon: '/images/swift.png' },
    { name: 'Go', icon: '/images/go.png' },
  ],
  frameworks: [
    { name: 'React', icon: '/images/react.png' },
    { name: 'Node.js', icon: '/images/node.png' },
    { name: 'Tailwind', icon: '/images/tailwind.png' },
    { name: 'Flask', icon: '/images/flask.png' },
    { name: 'Flutter', icon: '/images/flutter.png' },
    { name: 'Unity', icon: '/images/unity.png' },
  ],
  technologies: [
    { name: 'Firebase', icon: '/images/firebase.png'},
    { name: 'Arduino', icon: '/images/arduino.png'},
    { name: 'Fusion 360', icon: '/images/fusion.png'},
    { name: 'Inventor', icon: '/images/inventor.png'},
    { name: 'OnShape', icon: '/images/onshape.png'},
    { name: '3D Printing', icon: '/images/3dprint.png'},

  ]
};

const SOFTWARE_PROJECTS: Project[] = [
  {
    title: 'RoboRoute',
    description: 'An advanced path planning and autonomous routine simulator for the VEX Robotics Competition game, High Stakes.',
    image: '/images/roboroute.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    links: {
      demo: 'https://samuel-asefa.github.io/RoboRoute/src',
      github: 'https://github.com/samuel-asefa/RoboRoute'
    }
  },
  {
    title: 'Sciolytics',
    description: 'A comprehensive platform for Science Olympiad teams to track progress, manage resources, and analyze performance data.',
    image: '/images/sciolytics.png',
    technologies: ['TypeScript', 'Firebase'],
    links: {
      demo: 'https://samuel-asefa.github.io/Sciolytics/src',
      github: 'https://github.com/samuel-asefa/Sciolytics'
    }
  },
  {
    title: 'Mathify',
    description: 'A dedicated practice tool for students preparing for the NJ Math League, featuring a vast question bank and timer.',
    image: '/images/mathify.png',
    technologies: ['JavaScript', 'Firebase'],
    links: {
      demo: 'https://math-ify.vercel.app/',
      github: 'https://github.com/samuel-asefa/Mathify'
    }
  },
  {
    title: 'CircuitSpace',
    description: 'An intuitive circuit planner for rocketry with circuit validation, mass calculation, and more.',
    image: '/images/circuitspace.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    links: {
      demo: 'https://samuel-asefa.github.io/CircuitSpace/',
      github: 'https://github.com/samuel-asefa/CircuitSpace'
    }
  },
  {
    title: 'Studently',
    description: 'An intuitive and minimalist task list application with clean UI.',
    image: '/images/studently.png',
    technologies: ['Svelte', 'JavaScript', 'HTML'],
    links: {
      demo: 'https://studentlyy.vercel.app/',
      github: 'https://github.com/samuel-asefa/Studently'
    }
  },
  {
    title: 'Graphify',
    description: 'A Java-based application for visualizing common graph theory algorithms, aiding in the understanding of complex data structures.',
    image: '/images/graphify.png',
    technologies: ['Java', 'JPanel'],
    links: {
      github: 'https://github.com/samuel-asefa/Graphify'
    }
  }
];

const HARDWARE_PROJECTS: Project[] = [
  {
    title: 'Dexarm',
    description: 'An affordable prosthetic arm designed to restore essential arm and hand functionality for everyday tasks.',
    image: '/images/dexarm.jpg',
    technologies: ['C++', 'Arduino'],
    links: {
      github: 'https://github.com/samuel-asefa/Dexarm'

    }
  },
  {
    title: 'SurroundScanner',
    description: 'Device to help the visually impaired using ultrasonic sensors to detect obstacles in all directions.',
    image: '/images/surroundscanner.png',
    technologies: ['C++', 'Arduino', '3D Printing'],
    links: {
      demo: 'youtube.com/watch?v=4vD-6Ere7GE',
      github: 'https://github.com/samuel-asefa/SurroundScanner'
    }
  },

  {
    title: 'VEX Robot',
    description: 'A competition robot built for the Push Back VEX Robotics Competition programmed with a custom PID library.',
    image: '/images/push-back-robot.jpeg',
    technologies: ['VEX', 'C++'],
    links: {
      github: 'https://github.com/750W/push-back'
    }
  }
];

const CONTACT_DATA: ContactMethod[] = [
  {
    iconClass: 'fas fa-envelope',
    title: 'Email',
    text: 'samuelasefa20@gmail.com',
    url: 'mailto:samuelasefa20@gmail.com',
    isMail: true
  },
  {
    iconClass: 'fab fa-linkedin',
    title: 'LinkedIn',
    text: 'linkedin.com/in/samuelasefa',
    url: 'https://www.linkedin.com/in/samuelasefa/'
  },
  {
    iconClass: 'fab fa-github',
    title: 'GitHub',
    text: 'github.com/samuel-asefa',
    url: 'https://github.com/samuel-asefa'
  }
];

class PortfolioApp {
  private intersectionObserver: IntersectionObserver | null = null;

  constructor() {
    this.initializeApp();
  }

  private initializeApp(): void {
    this.handleLoadingScreen();
    this.initializeCustomCursor();
    this.initializeMobileMenu();
    this.initializeSmoothScrolling();
    this.initializeHeaderScroll();
    this.initializeBackToTop();
    this.initializeIntersectionObserver();
    this.injectProjectsHTML();
    this.renderAllComponents();
    this.initializeCircuitBackground();
  }

  private handleLoadingScreen(): void {
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (loadingScreen) {
          loadingScreen.style.opacity = '0';
          setTimeout(() => loadingScreen.style.display = 'none', 500);
        }
      }, 1000);
    });
  }

  

  private initializeCustomCursor(): void {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.backgroundColor = 'rgba(0, 170, 255, 0.2)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'transparent';
      });
    });
  }

  private initializeMobileMenu(): void {
    const hamburger = document.querySelector('.hamburger') as HTMLButtonElement;
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    if (!hamburger || !navLinks) return;

    const toggleMenu = () => {
      const isActive = hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(isActive));
    };

    hamburger.addEventListener('click', toggleMenu);
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  }
  
  private initializeSmoothScrolling(): void {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const targetElement = document.querySelector(href) as HTMLElement;
        if (targetElement) {
          const headerOffset = (document.getElementById('header') as HTMLElement)?.offsetHeight || 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  private initializeHeaderScroll(): void {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
      this.updateActiveNavLink();
    });
  }

  private updateActiveNavLink(): void {
    let currentSectionId = '';
    const sections = document.querySelectorAll('main section[id]');
    const headerOffset = (document.getElementById('header') as HTMLElement)?.offsetHeight || 80;

    sections.forEach(section => {
      const sectionElement = section as HTMLElement;
      const sectionTop = sectionElement.offsetTop - headerOffset - 1;
      if (window.scrollY >= sectionTop) {
        currentSectionId = sectionElement.id;
      }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const linkElement = link as HTMLAnchorElement;
      linkElement.classList.remove('active');
      if (linkElement.getAttribute('href') === `#${currentSectionId}`) {
        linkElement.classList.add('active');
      }
    });
  }

  private initializeBackToTop(): void {
    const backToTopBtn = document.querySelector('.back-to-top') as HTMLButtonElement;
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('show', window.pageYOffset > 300);
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  private initializeIntersectionObserver(): void {
    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.about, .skills-category, .project-card, .contact-card, .section-header').forEach(el => {
      el.classList.add('fade-in');
      this.intersectionObserver?.observe(el);
    });
  }

  private injectProjectsHTML(): void {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    projectsSection.innerHTML = `
      <div class="section-header fade-in">
        <h2>Projects</h2>
        <div class="section-line"></div>
      </div>
      
      <div class="projects-content">
        <div class="project-category">
          <h3 class="category-title">Software Projects</h3>
          <div id="software-projects-grid" class="projects-grid"></div>
        </div>
        
        <div class="project-category">
          <h3 class="category-title">Hardware Projects</h3>
          <div id="hardware-projects-grid" class="projects-grid"></div>
        </div>
      </div>
    `;
  }

  private renderAllComponents(): void {
    this.renderSkillCategory('programming-languages-grid', SKILLS_DATA.programmingLanguages);
    this.renderSkillCategory('frameworks-grid', SKILLS_DATA.frameworks);
    this.renderSkillCategory('technologies-grid', SKILLS_DATA.technologies);
    this.renderProjects();
    this.renderContactInfo();
  }

  private renderSkillCategory(containerId: string, skills: Skill[]): void {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = skills.map(skill => `
      <div class="skill-item" title="${skill.name}">
        <img src="${skill.icon}" alt="${skill.name} icon" loading="lazy">
        <span>${skill.name}</span>
      </div>
    `).join('');
  }

  private renderProjects(): void {
    this.renderProjectCategory('software-projects-grid', SOFTWARE_PROJECTS);
    this.renderProjectCategory('hardware-projects-grid', HARDWARE_PROJECTS);
  }

  private renderProjectCategory(containerId: string, projects: Project[]): void {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = projects.map(project => `
      <article class="project-card fade-in">
        <div class="project-img">
          <img src="${project.image}" alt="${project.title} screenshot" loading="lazy">
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tech">
            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
          </div>
          <div class="project-links">
            ${project.links.demo ? `<a href="${project.links.demo}" target="_blank" rel="noopener" class="btn primary-btn">Project Demo</a>` : ''}
            ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener" class="btn secondary-btn">GitHub</a>` : ''}
          </div>
        </div>
      </article>
    `).join('');
    container.querySelectorAll('.project-card').forEach(el => this.intersectionObserver?.observe(el));
  }
  
  private renderContactInfo(): void {
    const container = document.getElementById('contact-info-grid');
    if (!container) return;
    container.innerHTML = CONTACT_DATA.map(contact => `
      <div class="contact-card fade-in">
        <i class="${contact.iconClass}"></i>
        <h3>${contact.title}</h3>
        <a href="${contact.url}" ${!contact.isMail ? 'target="_blank" rel="noopener"' : ''}>${contact.text}</a>
      </div>
    `).join('');
    document.querySelectorAll('.contact-card').forEach(el => this.intersectionObserver?.observe(el));
  }

  private initializeCircuitBackground(): void {
    const container = document.getElementById('circuit-background');
    if (!container) return;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    container.appendChild(svg);

    const nodes: { x: number, y: number }[] = [];
    const gridSize = 80;
    const numCols = Math.ceil(window.innerWidth / gridSize);
    const numRows = Math.ceil(window.innerHeight / gridSize);

    for (let i = 0; i <= numCols; i++) {
      for (let j = 0; j <= numRows; j++) {
        if (Math.random() > 0.5) {
          nodes.push({ x: i * gridSize, y: j * gridSize });
        }
      }
    }

    nodes.forEach(node => {
      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', String(node.x));
      circle.setAttribute('cy', String(node.y));
      circle.setAttribute('r', '2');
      circle.setAttribute('fill', 'var(--accent-color)');
      svg.appendChild(circle);
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (dist < gridSize * 1.5 && Math.random() > 0.8) {
          const line = document.createElementNS(svgNS, 'line');
          line.setAttribute('x1', String(nodes[i].x));
          line.setAttribute('y1', String(nodes[i].y));
          line.setAttribute('x2', String(nodes[j].x));
          line.setAttribute('y2', String(nodes[j].y));
          line.setAttribute('stroke', 'var(--border-color)');
          line.setAttribute('stroke-width', '1');
          svg.insertBefore(line, svg.firstChild);
        }
      }
    }
    
    setInterval(() => {
        const lines = svg.querySelectorAll('line');
        const randomIndex = Math.floor(Math.random() * lines.length);
        const randomLine = lines[randomIndex];
        if (randomLine) {
            randomLine.style.transition = 'stroke 0.2s';
            randomLine.setAttribute('stroke', 'var(--accent-color)');
            setTimeout(() => {
                randomLine.setAttribute('stroke', 'var(--border-color)');
            }, 300);
        }
    }, 100);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});