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
    website?: string;
    paper?: string;
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

interface Course {
  name: string;
  level: 'AP' | 'Honors' | 'Regular';
  summer?: boolean;
}

interface YearCourses {
  year: string;
  grade: string;
  courses: Course[];
  uwGPA?: number;
  wGPA?: number;
}

interface Club {
  name: string;
  role: string;
  years: string;
  description: string[];
  link?: string;
}

interface AwardMedia {
  title: string;
  image?: string;
  link?: string;
  imagePosition?: string;
}

interface Award {
  title: string;
  issuer: string;
  date?: string;
  description: string[];
  media?: AwardMedia[];
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
    { name: 'Pandas', icon: '/images/pandas.png' },
    { name: 'Flutter', icon: '/images/flutter.png' },
    { name: 'Unity', icon: '/images/unity.png' },
  ],
  technologies: [
    { name: 'Firebase', icon: '/images/firebase.png' },
    { name: 'Arduino', icon: '/images/arduino.png' },
    { name: 'Android Studio', icon: '/images/androidstudio.png' },
    { name: 'Fusion 360', icon: '/images/fusion.png' },
    { name: 'Inventor', icon: '/images/inventor.png' },
    { name: 'OnShape', icon: '/images/onshape.png' },
    { name: '3D Printing', icon: '/images/3dprint.png' },
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
      demo: 'https://sciolytics.vercel.app',
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
    image: '/images/dexarm.png',
    technologies: ['C++', 'Arduino'],
    links: {
      website: 'https://vividsense.vercel.app/product/dexarm',
      github: 'https://github.com/samuel-asefa/Dexarm'
    }
  },
  {
    title: 'SurroundScanner',
    description: 'Device to help the visually impaired using ultrasonic sensors to detect obstacles in all directions.',
    image: '/images/surroundscanner.png',
    technologies: ['C++', 'Arduino', '3D Printing'],
    links: {
      website: 'https://vividsense.vercel.app/product/surrounding-scanner',
      github: 'https://github.com/samuel-asefa/SurroundScanner'
    }
  },
  {
    title: 'VEX Robot',
    description: 'A competition robot built for the Push Back VEX Robotics Competition programmed with a custom PID library.',
    image: '/images/push-back-robot.jpeg',
    technologies: ['VEX', 'C++'],
    links: {
      github: 'https://github.com/750W'
    }
  }
];

const RESEARCH_PROJECTS: Project[] = [
  {
    title: 'TEG Powered Cooking Pollution Capturing Device',
    description: 'Conducted research on Thermoelectric Powered Regeneration of Incomplete Combustion Cooking Pollutant Capturing Amines.',
    image: '/images/teg-research.png',
    technologies: ['CAD', 'COMSOL'],
    links: {
      paper: 'https://www.cambridge.org/engage/coe/article-details/691404bcef936fb4a2b1b9fa'
    }
  },
  {
    title: 'Life Expectancy Prediction Model',
    description: 'A machine learning project predicting country-level life expectancy using economic, educational, and environmental factors.',
    image: '/images/life-expectancy-prediction-model.jpg',
    technologies: ['Python', 'Pandas', 'Scikit-learn'],
    links: {
      github: 'https://github.com/samuel-asefa/LifeExpectancyModel'
    }
  },
  {
    title: 'Global Trade Prediction Model',
    description: 'A machine learning project predicting bilateral trade flows between countries using economic indicators, geographic factors, and policy variables.',
    image: '/images/global-trade-prediction-model.png',
    technologies: ['Python', 'Pandas', 'Scikit-learn'],
    links: {
      github: 'https://github.com/samuel-asefa/GlobalTradeModel'
    }
  }
];

const COURSES_DATA: YearCourses[] = [
  {
    year: '2025-26',
    grade: 'Grade 11',
    uwGPA: 3.96,
    wGPA: 4.83,
    courses: [
      { name: 'AP English III-Lang/Comp.', level: 'AP' },
      { name: 'AP World History: Modern', level: 'AP' },
      { name: 'AP Calculus-BC', level: 'AP' },
      { name: 'AP Physics C', level: 'AP' },
      { name: 'CS Academy: Virtual Reality & Game Design', level: 'AP' },
      { name: 'CS Academy: Mobile App Development', level: 'AP' },
      { name: 'Advanced Biology', level: 'Regular', summer: true },
      { name: 'On Line Personal Financial Mgmt', level: 'Regular', summer: true },
    ]
  },
  {
    year: '2024-25',
    grade: 'Grade 10',
    uwGPA: 3.96,
    wGPA: 4.65,
    courses: [
      { name: 'AP US History', level: 'AP' },
      { name: 'AP Calculus-AB', level: 'AP' },
      { name: 'AP Computer Science A', level: 'AP' },
      { name: 'AP Chemistry', level: 'AP' },
      { name: 'Honors Spanish III', level: 'Honors' },
      { name: 'Option II-Honors Precalc w/ Calc. Enrich', level: 'Honors', summer: true },
      { name: 'Academic English II', level: 'Regular' },
    ]
  },
  {
    year: '2023-24',
    grade: 'Grade 09',
    uwGPA: 3.88,
    wGPA: 4.13,
    courses: [
      { name: 'AP Physics I', level: 'AP' },
      { name: 'Honors American Government', level: 'Honors' },
      { name: 'Honors Algebra II', level: 'Honors' },
      { name: 'Option II-Honors Chemistry', level: 'Honors', summer: true },
      { name: 'Academic English I', level: 'Regular' },
      { name: 'Computer Science In The 21st Century', level: 'Regular' },
      { name: 'Spanish II', level: 'Regular' },
      { name: 'Freshmen Band', level: 'Regular' },
    ]
  }
];

const CLUBS_DATA: Club[] = [
  {
    name: 'VEX Robotics',
    role: 'Workshop Lead · Lead Builder',
    years: '2023 – Present',
    description: [
      'Taught 10+ recruits CAD and build fundamentals through structured workshops',
      'Created interactive lessons with CAD to help students learn robot design and assembly',
      'Utilized CAD software to prototype multiple iterations of our robots design',
      'Built and improved designs through competition and practice'
    ],
    link: 'https://750w.github.io'
  },
  {
    name: 'Aerospace Team',
    role: 'Electronics Lead',
    years: '2024 – Present',
    description: [
      'Built and programmed airbrakes system including wiring and a custom PCB',
      'Designed circuitry for NDVI mapping payload and onboard data collection',
      'Designed and 3D printed all rocket components (fin can, transition piece, airbrakes)',
      'Ran Finite Element Analysis and other simulations to optimize rocket design'
    ],
    link: 'https://sbaerospace.github.io'
  },
  {
    name: 'XSTEM Club',
    role: 'Executive Board',
    years: '2023 – Present',
    description: [
      'Organized school-wide STEM workshops and competitions, managing logistics for large-scale events',
      'Led weekly sessions on cutting-edge engineering and technology topics for club members',
      'Mentored students in hands-on projects and technical skill development'
    ],
    link: 'https://x-stem.github.io'
  },
  {
    name: 'Science Olympiad',
    role: 'Executive Board',
    years: '2023 – Present',
    description: [
      'Led build events and managed $1,000+ in materials and devices',
      'Oversaw design and iteration of team-built devices across multiple competition cycles'
    ],
    link: 'https://sbscioly.github.io'
  },
  {
    name: 'Computer Science Club',
    role: 'Executive Board',
    years: '2023 – Present',
    description: [
      'Co-led a Circuits & Electronics workshop to 50+ students based in C++',
      'Helped organize school-wide hackathon with 70+ participants',
    ],
    link: 'https://sbcsclub.vercel.app'
  },
  {
    name: 'Mathletes',
    role: 'Member',
    years: '2023 – Present',
    description: [
      'Competed in the NJ Math League and other regional mathematics competitions',
    ]
  },
];

const AWARDS_DATA: Award[] = [
  {
    title: 'NJ Science League - AP Physics C Team Plaque',
    issuer: 'NJ Science League',
    date: 'May 2026',
    description: [
      'Placed 3rd out of 33 teams (Top 9%) in the New Jersey Science League AP Physics C competition; tied for 13th individually among 92 statewide competitors.'
    ]
  },
  {
    title: 'LaunchSB - 1st Place',
    issuer: 'SBHS XSTEM',
    date: 'Apr 2026',
    description: [
      "Earned 1st Place (out of 40+ teams) for VividSense's Dexarm, an affordable prosthetic arm."
    ],
    media: [
      { title: 'Website', image: '/images/dexarm.png', link: 'https://vividsense.vercel.app/product/dexarm' }
    ]
  },
  {
    title: 'Garden State Cyber CTF - Top 7%',
    issuer: 'NJCCIC',
    date: 'Mar 2026',
    description: [
      'Placed 29th out of 420 teams (Top 7%) in the Garden State Capture the Flag cybersecurity competition.'
    ]
  },
  {
    title: 'USA Computing Olympiad Gold',
    issuer: 'USA Computing Olympiad',
    date: 'Feb 2026',
    description: [
      'Advanced to the Gold Division of USACO with a perfect score in the Silver division.'
    ]
  },
  {
    title: 'NASA TechRise Challenge Winner',
    issuer: 'NASA',
    date: 'Jan 2026',
    description: [
      'Selected as a winner in the High-Altitude Balloon category for proposing an NDVI mapping payload using machine-learning receiving $1,500 in funding.'
    ],
    media: [
      { title: 'TechRise Winner', image: '/images/techrise.webp' },
      { title: 'NASA Payload', image: '/images/nasapayload.jpeg' }
    ]
  },
  {
    title: 'AP Scholar with Distinction Award',
    issuer: 'College Board',
    date: 'Jul 2025',
    description: [
      'Awarded for achieving an average score of at least 3.5 on all AP Exams taken, and scores of 3 or higher on five or more exams.'
    ],
    media: [
      { title: 'Award Certificate', image: '/images/apscholar.png' }
    ]
  },
  {
    title: '2x Presidential Volunteer Service Award Gold',
    issuer: 'Corporation for National and Community Service',
    date: 'Apr 2025',
    description: [
      'Volunteered 200+ hours with RoboZone and TurboTutors over a 2 year period.'
    ],
    media: [
      { title: '2024-25 Certificate', image: '/images/pvsa2024.jpeg' },
      { title: '2023-24 Certificate', image: '/images/pvsa2023.jpeg' },
      { title: '2023-25 Medals', image: '/images/pvsamedals.jpeg' }
    ]
  },
  {
    title: 'American Rocketry Challenge 2025 National Finalist',
    issuer: 'National Association of Rocketry',
    date: 'Apr 2025',
    description: [
      'Qualified for the national competition in the American Rocketry Challenge (Top 100 of 1,001 contestants); placed 50th at national competition in Virginia.'
    ],
    media: [
      { title: 'ARC Competition', image: '/images/arc.jpg' }
    ]
  },
  {
    title: 'LaunchSB - 2nd Place',
    issuer: 'SBHS XSTEM',
    date: 'Apr 2025',
    description: [
      "Earned 2nd Place (out of 40+ teams) for VividSense's Surround Scanner, an affordable and intuitive device to aid the visually impaired with navigation."
    ],
    media: [
      { title: 'Website', image: '/images/surroundscanner.png', link: 'https://vividsense.vercel.app/product/surrounding-scanner' }
    ]
  },
  {
    title: 'VEX Workforce Readiness Finalist',
    issuer: 'VEX Robotics',
    date: 'Mar 2025',
    description: [
      'Top 6 finalist (out of ~50 teams) for a proposal on Aerospace Automation focusing on robotics-driven manufacturing; awarded $100.'
    ],
    media: [
      { title: '2025 Winners', image: '/images/onlinechallenges.jpg', link: 'https://recfoundation.net/2025-online-challenges-winners-announced/' },
      { title: 'Proposal', image: '/images/proposalpicture.png', link: '/images/Proposal.pdf', imagePosition: 'top' }
    ]
  },
  {
    title: 'LaunchSB - 3rd Place',
    issuer: 'SBHS XSTEM',
    date: 'Apr 2024',
    description: [
      'Earned 3rd Place (out of 30+ teams) for BeniFlow, a device that redirects incomplete combustion cooking pollutants away from households.'
    ]
  },
  {
    title: 'International Geography Bee',
    issuer: 'International Academic Competitions',
    date: 'Jul 2022',
    description: [
      '1st Place - Geographeud',
      '2nd Place - Climate Change Task Force',
      '3rd Place - Geography Bowl'
    ]
  },
  {
    title: 'Robotics Awards',
    issuer: 'VEX Robotics',
    description: [
      'Excellence Award @ CCHS High Stakes Tournament',
      'Amaze Award @ SBHS Over Under Tournament',
      'Amaze Award @ SBHS Push Back Tournament',
      'Amaze Award @ Pirate Popoff Push Back Tournament',
      '3x States Qualification'
    ]
  },
  {
    title: 'Science Olympiad Invitational Awards',
    issuer: 'Science Olympiad',
    description: [
      '1st Place in Air Trajectory @ UCC NJ Regional Science Olympiad Competition, 2023-2024',
      '5th Place in Air Trajectory @ Yale University Science Olympiad Invitational, 2023-2024',
      '10th Place in Air Trajectory (Top 7% of 160 teams) @ Mason Science Olympiad Satellite Invitational, 2024-2025',
      '7th Place (Top 4% of 200 teams) in Hovercraft @ Mason Science Olympiad Satellite Invitational, 2025-2026',
      '7th Place in Hovercraft @ Yale University Science Olympiad Invitational, 2025-2026',
      '3rd Place in Engineering CAD @ Yale University Science Olympiad Invitational, 2025-2026'
    ]
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
    this.initializeDynamicYear();
    this.initializeCustomCursor();
    this.initializeMobileMenu();
    this.initializeSmoothScrolling();
    this.initializeHeaderScroll();
    this.initializeBackToTop();
    this.initializeIntersectionObserver();
    this.injectProjectsHTML();
    this.renderAllComponents();
    this.initializeCircuitBackground();
    this.initializeProjectFilters();
    this.initializeEducationTabs();
    this.initializeImageModal();
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

  private initializeDynamicYear(): void {
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear().toString();
    }
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
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        cursor.style.backdropFilter = 'blur(4px)';
        cursor.style.setProperty('-webkit-backdrop-filter', 'blur(4px)');
        cursor.style.borderColor = 'transparent';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.backdropFilter = 'none';
        cursor.style.setProperty('-webkit-backdrop-filter', 'none');
        cursor.style.borderColor = 'var(--accent-color)';
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
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
        const url = new URL(this.href);
        // If it's on a different page, let the browser navigate normally
        if (url.pathname !== window.location.pathname && url.pathname !== window.location.pathname + 'index.html') {
          // Note: local dev handles '/' and '/index.html' similarly, but let's be safe.
          const isRootPath = window.location.pathname === '/' || window.location.pathname === '';
          if (!(isRootPath && url.pathname.endsWith('/index.html'))) {
            return;
          }
        }

        const hash = url.hash;
        if (!hash || hash === '#') return;

        const targetElement = document.querySelector(hash) as HTMLElement;
        if (targetElement) {
          e.preventDefault();
          const headerOffset = (document.getElementById('header') as HTMLElement)?.offsetHeight || 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // update URL hash without jump
          window.history.pushState(null, '', hash);
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
      const href = linkElement.getAttribute('href');
      if (href && href.endsWith(`#${currentSectionId}`)) {
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
      
      <div class="project-filters">
        <button class="filter-btn active" data-filter="all">All Projects</button>
        <button class="filter-btn" data-filter="software">Software</button>
        <button class="filter-btn" data-filter="hardware">Hardware</button>
        <button class="filter-btn" data-filter="research">Research</button>
      </div>
      
      <div class="projects-content">
        <div class="project-category" data-category="software">
          <h3 class="category-title">Software Projects</h3>
          <div id="software-projects-grid" class="projects-grid"></div>
        </div>
        
        <div class="project-category" data-category="hardware">
          <h3 class="category-title">Hardware Projects</h3>
          <div id="hardware-projects-grid" class="projects-grid"></div>
        </div>
        
        <div class="project-category" data-category="research">
          <h3 class="category-title">Research Projects</h3>
          <div id="research-projects-grid" class="projects-grid"></div>
        </div>
      </div>
    `;
  }

  private initializeProjectFilters(): void {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categories = document.querySelectorAll('.project-category');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        if (!filter) return;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        categories.forEach(category => {
          const categoryType = category.getAttribute('data-category');
          if (filter === 'all' || filter === categoryType) {
            category.classList.remove('hidden');
          } else {
            category.classList.add('hidden');
          }
        });
      });
    });
  }

  private renderAllComponents(): void {
    this.renderSkillCategory('programming-languages-grid', SKILLS_DATA.programmingLanguages);
    this.renderSkillCategory('frameworks-grid', SKILLS_DATA.frameworks);
    this.renderSkillCategory('technologies-grid', SKILLS_DATA.technologies);
    this.renderProjects();
    this.renderEducation();
    this.renderAwards();
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
    this.renderProjectCategory('research-projects-grid', RESEARCH_PROJECTS);
  }

  private renderProjectCategory(containerId: string, projects: Project[]): void {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = projects.map(project => `
      <article class="project-card fade-in">
        <div class="project-img">
          <img src="${project.image}" alt="${project.title} screenshot" loading="lazy" style="cursor: pointer;">
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tech">
            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
          </div>
          <div class="project-links">
            ${project.links.demo ? `<a href="${project.links.demo}" target="_blank" rel="noopener" class="btn primary-btn">Project Demo</a>` : ''}
            ${project.links.website ? `<a href="${project.links.website}" target="_blank" rel="noopener" class="btn primary-btn">Website</a>` : ''}
            ${project.links.paper ? `<a href="${project.links.paper}" target="_blank" rel="noopener" class="btn primary-btn">Research Paper</a>` : ''}
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

  private renderEducation(): void {
    const container = document.getElementById('education-content');
    if (!container) return;

    // Calculate cumulative GPA from years that have values filled in
    const yearsWithGPA = COURSES_DATA.filter(y => y.uwGPA !== undefined && y.wGPA !== undefined && (y.uwGPA > 0 || y.wGPA > 0));
    const cumulativeUW = yearsWithGPA.length > 0
      ? yearsWithGPA.reduce((sum, y) => sum + (y.uwGPA || 0), 0) / yearsWithGPA.length
      : 0;
    const cumulativeW = yearsWithGPA.length > 0
      ? yearsWithGPA.reduce((sum, y) => sum + (y.wGPA || 0), 0) / yearsWithGPA.length
      : 0;

    container.innerHTML = `
      <div class="edu-tabs">
        <button class="edu-tab-btn active" data-tab="courses" id="tab-courses">Courses</button>
        <button class="edu-tab-btn" data-tab="clubs" id="tab-clubs">Clubs &amp; Activities</button>
      </div>

      <div class="edu-panel" id="edu-panel-courses">
        ${cumulativeUW > 0 || cumulativeW > 0 ? `
        <div class="cumulative-gpa">
          <div class="gpa-card">
            <span class="gpa-value">${cumulativeUW.toFixed(2)}</span>
            <span class="gpa-label">Cumulative Unweighted GPA</span>
          </div>
          <div class="gpa-card">
            <span class="gpa-value">${cumulativeW.toFixed(2)}</span>
            <span class="gpa-label">Cumulative Weighted GPA</span>
          </div>
        </div>` : ''}
        <div class="courses-container">
          ${COURSES_DATA.map(yearData => `
            <div class="course-year-group fade-in">
              <h3 class="course-year-title">${yearData.grade} <span class="course-year-subtitle">(${yearData.year})</span></h3>
              ${yearData.uwGPA !== undefined && yearData.wGPA !== undefined && (yearData.uwGPA > 0 || yearData.wGPA > 0) ? `
              <div class="year-gpa">
                <div class="gpa-item">
                  <span class="gpa-label">UW GPA</span>
                  <span class="gpa-value">${yearData.uwGPA.toFixed(2)}</span>
                </div>
                <div class="gpa-item">
                  <span class="gpa-label">W GPA</span>
                  <span class="gpa-value">${yearData.wGPA.toFixed(2)}</span>
                </div>
              </div>` : ''}
              <div class="courses-grid">
                ${yearData.courses.map(c => `
                  <div class="course-card">
                    <div class="course-info">
                      <div class="course-header-row">
                        <h4>${c.name}${c.summer ? ' <span class="course-summer"><i class="fas fa-sun"></i> Summer</span>' : ''}</h4>
                        <span class="course-level level-${c.level.toLowerCase()}">${c.level}</span>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="edu-panel hidden" id="edu-panel-clubs">
        <div class="clubs-grid">
          ${CLUBS_DATA.map(club => `
            <div class="club-card fade-in">
              <div class="club-header">
                <div>
                  <h3>${club.name}${club.link ? ` <a href="${club.link}" target="_blank" rel="noopener" class="club-ext-link"><i class="fas fa-external-link-alt"></i></a>` : ''}</h3>
                  <p class="club-role">${club.role}</p>
                  <p class="club-years"><i class="fas fa-calendar-alt"></i> ${club.years}</p>
                </div>
              </div>
              <ul class="club-desc-list">
                ${club.description.map(point => `<li>${point}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.course-year-group, .club-card').forEach(el => this.intersectionObserver?.observe(el));
  }

  private renderAwards(): void {
    const container = document.getElementById('awards-content');
    if (!container) return;

    container.innerHTML = `
      <div class="awards-grid">
        ${AWARDS_DATA.map(award => `
          <div class="award-card fade-in">
            <div class="award-header">
              <div class="award-title-group">
                <h3>${award.title}</h3>
                <p class="award-issuer">Issued by ${award.issuer}${award.date ? ` &middot; ${award.date}` : ''}</p>
              </div>
            </div>
            <ul class="award-desc-list">
              ${award.description.map(desc => `<li>${desc}</li>`).join('')}
            </ul>
            ${award.media ? `
            <div class="award-media-grid">
              ${award.media.map(item => `
                <div class="award-media-card" ${item.link ? `data-link="${item.link}"` : ''}>
                  ${item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy" class="award-media-img"${item.imagePosition ? ` style="object-position: ${item.imagePosition}"` : ''}>` 
        : `<div class="award-media-icon"><i class="${item.link?.endsWith('.pdf') ? 'fas fa-file-pdf' : 'fas fa-link'}"></i></div>`}
                  <span class="award-media-title">${item.title}</span>
                </div>
              `).join('')}
            </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.award-card').forEach(el => this.intersectionObserver?.observe(el));
  }

  private initializeEducationTabs(): void {
    document.addEventListener('click', (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest('.edu-tab-btn') as HTMLElement | null;
      if (!btn) return;

      document.querySelectorAll('.edu-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.getAttribute('data-tab');
      document.querySelectorAll('.edu-panel').forEach(panel => {
        const panelEl = panel as HTMLElement;
        if (panelEl.id === `edu-panel-${tab}`) {
          panelEl.classList.remove('hidden');
        } else {
          panelEl.classList.add('hidden');
        }
      });
    });
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

  private initializeImageModal(): void {
    // Create modal HTML
    const modalHTML = `
      <div id="image-modal" class="image-modal">
        <span class="modal-close">&times;</span>
        <img class="modal-content" id="modal-image" alt="Enlarged project image" style="display: none;">
        <iframe class="modal-content" id="modal-iframe" style="display: none; width: 80vw; height: 80vh; background: white; border: none; border-radius: 8px;" title="Document viewer"></iframe>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('image-modal') as HTMLElement;
    const modalImg = document.getElementById('modal-image') as HTMLImageElement;
    const modalIframe = document.getElementById('modal-iframe') as HTMLIFrameElement;
    const closeBtn = document.querySelector('.modal-close') as HTMLElement;

    // Add click event to all project images and award media cards
    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Project Images
      if (target.tagName === 'IMG' && target.closest('.project-img')) {
        const img = target as HTMLImageElement;
        modal.style.display = 'flex';
        modalImg.style.display = 'block';
        modalIframe.style.display = 'none';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        document.body.style.overflow = 'hidden';
      }

      // Award Media Cards
      const awardCard = target.closest('.award-media-card');
      if (awardCard) {
        const link = awardCard.getAttribute('data-link');
        const img = awardCard.querySelector('.award-media-img') as HTMLImageElement;

        if (link && link.endsWith('.pdf')) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          modalImg.style.display = 'none';
          modalIframe.style.display = 'block';
          modalIframe.src = link;
        } else if (link) {
          window.open(link, '_blank');
        } else if (img) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          modalImg.style.display = 'block';
          modalIframe.style.display = 'none';
          modalImg.src = img.src;
          modalImg.alt = img.alt;
        }
      }
    });

    // Close modal on close button click
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      modalIframe.src = '';
      document.body.style.overflow = 'auto';
    });

    // Close modal on background click
    modal.addEventListener('click', (e: MouseEvent) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        modalIframe.src = '';
        document.body.style.overflow = 'auto';
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        modalIframe.src = '';
        document.body.style.overflow = 'auto';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});