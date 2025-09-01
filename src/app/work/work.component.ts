import {
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ViewChild,
  HostListener,
  OnDestroy,
  ChangeDetectorRef,
  Input
} from '@angular/core';

interface WorkEntry {
  projectName: string;
  dates: string;
  company: string;
  companyLogo?: string;
  relation: string;
  summary: string;
  imageUrl: string;
  description: string;
  skills: SkillItem[];
  category?: 'frontend' | 'backend' | 'fullstack' | 'analytics';
  gradient?: string;
  // Extended properties for detailed view
  detailedView?: {
    overview: string;
    keyFeatures: {
      title: string;
      description: string;
      icon: string;
    }[];
    techStack: {
      category: string;
      technologies: string[];
    }[];
    challenges: {
      title: string;
      description: string;
    }[];
    outcome: string;
    links?: {
      live?: string;
      source?: string;
      demo?: string;
    };
  };
}

interface SkillItem {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
})
export class WorkComponent implements OnInit, AfterViewInit, OnDestroy {
  // Input to control whether to show section title
  @Input() showTitle: boolean = true;
  // Input to control if component is used in home page context
  @Input() isHomeContext: boolean = false;

  public workEntries: WorkEntry[] = [
    {
      projectName: 'InCites Benchmark & Analytics',
      dates: 'Apr 2024 – Present',
      company: 'Clarivate',
      companyLogo: 'assets/images/company-logos/clarivate-logo.svg',
      relation: 'Associated with Clarivate',
      category: 'fullstack',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      summary: 'InCites is a research analytics solution that empowers institutions and policy makers to measure research performance.',
      imageUrl: 'assets/images/work-section/InCites.png',
      description: `• Designed and developed scalable APIs using Java and Spring Boot.
• Built dynamic front-end interfaces with Angular and TypeScript.
• Integrated Elasticsearch for fast, responsive search experiences.
• Implemented robust data validation through integration tests and BDD test cases.
• Containerized the application with Docker and supported AWS-based deployments.`,
      skills: [
        { name: 'AWS', icon: 'assets/svg-icons/aws-svgrepo-com.svg' },
        { name: 'Elasticsearch', icon: 'assets/svg-icons/elastic-search-svgrepo-com.svg' },
        { name: 'Groovy', icon: 'assets/svg-icons/pl-groovy-01-svgrepo-com.svg' },
        { name: 'Java SpringBoot', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
        { name: 'Angular', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
        { name: 'Docker', icon: 'assets/svg-icons/docker-svgrepo-com.svg' },
      ],
      detailedView: {
        overview: 'InCites is a comprehensive web platform for early-stage researchers and institutions to analyze research performance metrics. It combines modern full-stack development practices with a carefully crafted user experience — enabling researchers to go from data to insights effortlessly.',
        keyFeatures: [
          {
            title: 'High-Performance Architecture',
            description: 'Built on Next.js 15, the platform leverages Partial Prerendering, Server Actions, and Server Components to deliver fast, reliable, and scalable performance across all routes.',
            icon: '⚡'
          },
          {
            title: 'Advanced Analytics Integration',
            description: 'Seamlessly integrates with Elasticsearch and machine learning models to provide real-time research analytics and performance insights.',
            icon: '📊'
          },
          {
            title: 'Seamless Authentication',
            description: 'Implements secure OAuth integration with institutional systems for streamlined user access and role-based permissions.',
            icon: '🔐'
          },
          {
            title: 'Scalable & Accessible UI',
            description: 'Features a polished, responsive interface built with Angular and TypeScript, ensuring accessibility across all device types.',
            icon: '🎨'
          }
        ],
        techStack: [
          {
            category: 'Frontend',
            technologies: ['Angular 15+', 'TypeScript', 'TailwindCSS', 'RxJS']
          },
          {
            category: 'Backend',
            technologies: ['Java Spring Boot', 'RESTful APIs', 'Microservices', 'Docker']
          },
          {
            category: 'Database & Search',
            technologies: ['Elasticsearch', 'PostgreSQL', 'Redis Cache']
          },
          {
            category: 'Cloud & DevOps',
            technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD Pipelines']
          },
          {
            category: 'Testing',
            technologies: ['Groovy', 'BDD', 'Integration Tests', 'Unit Testing']
          }
        ],
        challenges: [
          {
            title: 'Adopting the Research Analytics Ecosystem',
            description: 'Working with complex research data models and Elasticsearch queries was both exciting and challenging. Since academic research metrics and institutional requirements were constantly evolving, I had to frequently refer to documentation and collaborate with domain experts to understand data relationships and performance optimization strategies.'
          },
          {
            title: 'Real-Time Data Processing',
            description: 'Implementing efficient data pipelines for processing large research datasets while maintaining responsive user interactions required careful architecture planning and performance optimization.'
          },
          {
            title: 'Cross-Institutional Integration',
            description: 'Building a platform that works seamlessly across different institutional systems and authentication methods while maintaining security standards was a significant architectural challenge.'
          }
        ],
        outcome: 'InCites was successfully launched as a core research analytics platform and has been well-received by academic institutions for its clean design, speed, and usability. It stands as a solid demonstration of my full-stack capabilities and my ability to work with complex data systems and deliver enterprise-grade solutions with confidence.',
        links: {
          live: 'https://incites.clarivate.com',
          demo: 'https://demo.incites.clarivate.com'
        }
      },
    },
    {
      projectName: 'My Organization – Research Performance Dashboard',
      dates: 'Apr 2024 – Present',
      company: 'Clarivate',
      companyLogo: 'assets/images/company-logos/clarivate-logo.svg',
      relation: 'Associated with Clarivate',
      category: 'frontend',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      summary: 'My Organization is a customizable research dashboard for institutions to monitor research performance.',
      imageUrl: 'assets/images/work-section/my-org.svg',
      description: `• Led development of customizable dashboards and modular UI components.
• Architected backend services with Spring Boot for flexible data visualizations.
• Implemented efficient data filtering mechanisms and secure RESTful endpoints.
• Authored BDD test cases and integration flows using Groovy.
• Containerized testing environments with Docker for faster feedback loops.`,
      skills: [
        { name: 'Elasticsearch', icon: 'assets/svg-icons/elastic-search-svgrepo-com.svg' },
        { name: 'Angular', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
        { name: 'Spring Boot', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
        { name: 'Groovy', icon: 'assets/svg-icons/pl-groovy-01-svgrepo-com.svg' },
        { name: 'Docker', icon: 'assets/svg-icons/docker-svgrepo-com.svg' },
        { name: 'BDD', icon: 'assets/svg-icons/gherkin-monuments-svgrepo-com.svg' },
      ],
      detailedView: {
        overview: 'My Organization is a comprehensive research dashboard that provides institutions with customizable analytics and performance monitoring capabilities. This project showcases advanced frontend development and data visualization techniques.',
        keyFeatures: [
          {
            title: 'Customizable Dashboards',
            description: 'Built modular, reusable UI components that allow institutions to create personalized research performance dashboards.',
            icon: '📊'
          },
          {
            title: 'Advanced Data Filtering',
            description: 'Implemented sophisticated filtering mechanisms for complex research data with real-time updates.',
            icon: '🔍'
          },
          {
            title: 'Secure API Integration',
            description: 'Developed secure RESTful endpoints with comprehensive authentication and authorization.',
            icon: '🔐'
          }
        ],
        techStack: [
          {
            category: 'Frontend',
            technologies: ['Angular', 'TypeScript', 'RxJS', 'SCSS']
          },
          {
            category: 'Backend',
            technologies: ['Spring Boot', 'RESTful APIs', 'Microservices']
          },
          {
            category: 'Database & Search',
            technologies: ['Elasticsearch', 'Data Analytics']
          },
          {
            category: 'Testing & DevOps',
            technologies: ['Groovy', 'BDD', 'Docker', 'CI/CD']
          }
        ],
        challenges: [
          {
            title: 'Complex Data Visualization',
            description: 'Creating intuitive and responsive data visualizations that work across different institutional requirements and data structures.'
          },
          {
            title: 'Performance Optimization',
            description: 'Ensuring fast loading times and smooth interactions with large datasets while maintaining real-time updates.'
          }
        ],
        outcome: 'Successfully delivered a robust research dashboard platform that enables institutions to monitor and analyze their research performance with customizable, user-friendly interfaces.'
      },
    },
    {
      projectName: 'Research Horizon Navigator (RHN)',
      dates: 'Apr 2024 – Present',
      company: 'Clarivate',
      companyLogo: 'assets/images/company-logos/clarivate-logo.svg',
      relation: 'Associated with Clarivate',
      category: 'analytics',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      summary: 'Research Horizon Navigator uses predictive modeling to identify emerging research fields.',
      imageUrl: 'assets/images/work-section/rhn.svg',
      description: `• Engineered machine learning pipelines for research trend analysis.
• Built real-time data processing systems using Apache Kafka and Elasticsearch.
• Developed responsive Angular components for data visualization.
• Implemented microservices architecture with Spring Boot and Docker.
• Created automated testing suites with comprehensive coverage.`,
      skills: [
        { name: 'Machine Learning', icon: 'assets/svg-icons/database-svgrepo-com.svg' },
        { name: 'Elasticsearch', icon: 'assets/svg-icons/elastic-search-svgrepo-com.svg' },
        { name: 'Angular', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
        { name: 'Spring Boot', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
        { name: 'Docker', icon: 'assets/svg-icons/docker-svgrepo-com.svg' },
        { name: 'AWS', icon: 'assets/svg-icons/aws-svgrepo-com.svg' },
      ],
      detailedView: {
        overview: 'Research Horizon Navigator (RHN) is an advanced analytics platform that uses machine learning and predictive modeling to identify emerging research trends and opportunities. This project demonstrates expertise in data science and modern web technologies.',
        keyFeatures: [
          {
            title: 'Predictive Analytics',
            description: 'Developed machine learning models to predict emerging research fields and identify future opportunities.',
            icon: '🔮'
          },
          {
            title: 'Real-time Data Processing',
            description: 'Implemented Apache Kafka for streaming data processing and real-time trend analysis.',
            icon: '⚡'
          },
          {
            title: 'Interactive Visualizations',
            description: 'Created dynamic, responsive data visualizations for complex research trend analysis.',
            icon: '📈'
          }
        ],
        techStack: [
          {
            category: 'Machine Learning',
            technologies: ['Python', 'TensorFlow', 'Predictive Modeling', 'Data Analytics']
          },
          {
            category: 'Frontend',
            technologies: ['Angular', 'TypeScript', 'D3.js', 'Chart.js']
          },
          {
            category: 'Backend & Data',
            technologies: ['Spring Boot', 'Apache Kafka', 'Elasticsearch', 'RESTful APIs']
          },
          {
            category: 'Cloud & DevOps',
            technologies: ['AWS', 'Docker', 'Microservices', 'CI/CD']
          }
        ],
        challenges: [
          {
            title: 'Machine Learning Integration',
            description: 'Integrating complex ML models with real-time web applications while maintaining performance and accuracy.'
          },
          {
            title: 'Data Pipeline Architecture',
            description: 'Building robust data pipelines that can handle large volumes of research data with real-time processing requirements.'
          }
        ],
        outcome: 'Successfully launched an innovative research analytics platform that helps institutions identify emerging research opportunities and make data-driven strategic decisions.'
      },
    },
    {
      projectName: 'Online Assessment Platform',
      dates: 'Feb 2021 – Dec 2023',
      company: 'Infosys Ltd',
      companyLogo: 'assets/images/company-logos/infosys-logo.svg',
      relation: 'Associated with Infosys',
      category: 'fullstack',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      summary: 'Comprehensive platform for educational institutions to manage digital infrastructure.',
      imageUrl: 'assets/images/work-section/iap.png',
      description: `• Architected and developed scalable backend services using Java Spring Boot.
• Built responsive frontend applications with Angular and TypeScript.
• Integrated Azure Cloud services for secure and scalable infrastructure.
• Implemented comprehensive testing strategies including unit and integration tests.
• Designed efficient database schemas and optimized query performance.`,
      skills: [
        { name: 'Azure', icon: 'assets/svg-icons/azure-svgrepo-com.svg' },
        { name: 'Java SpringBoot', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
        { name: 'Angular', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
        { name: 'Database', icon: 'assets/svg-icons/database-svgrepo-com.svg' },
        { name: 'Docker', icon: 'assets/svg-icons/docker-svgrepo-com.svg' },
        { name: 'Groovy', icon: 'assets/svg-icons/pl-groovy-01-svgrepo-com.svg' },
      ],
      detailedView: {
        overview: 'The Online Assessment Platform is a comprehensive educational technology solution that enables institutions to conduct secure, scalable digital assessments. This full-stack project demonstrates expertise in enterprise-level application development and cloud integration.',
        keyFeatures: [
          {
            title: 'Secure Assessment Engine',
            description: 'Built a robust assessment platform with advanced security features, anti-cheating mechanisms, and real-time monitoring.',
            icon: '🔒'
          },
          {
            title: 'Scalable Architecture',
            description: 'Designed microservices-based architecture using Azure Cloud services for high availability and scalability.',
            icon: '🏗️'
          },
          {
            title: 'Comprehensive Analytics',
            description: 'Implemented detailed analytics and reporting features for educators to track student performance and assessment effectiveness.',
            icon: '📊'
          }
        ],
        techStack: [
          {
            category: 'Frontend',
            technologies: ['Angular', 'TypeScript', 'Responsive Design', 'Material UI']
          },
          {
            category: 'Backend',
            technologies: ['Java Spring Boot', 'RESTful APIs', 'Microservices', 'Spring Security']
          },
          {
            category: 'Database',
            technologies: ['SQL Server', 'Database Design', 'Query Optimization']
          },
          {
            category: 'Cloud & DevOps',
            technologies: ['Microsoft Azure', 'Docker', 'CI/CD', 'Azure DevOps']
          },
          {
            category: 'Testing',
            technologies: ['Groovy', 'Unit Testing', 'Integration Testing', 'Test Automation']
          }
        ],
        challenges: [
          {
            title: 'Security & Integrity',
            description: 'Ensuring assessment security while maintaining user experience, implementing robust anti-cheating measures and secure data handling.'
          },
          {
            title: 'Performance at Scale',
            description: 'Optimizing application performance to handle thousands of concurrent users during peak assessment periods.'
          },
          {
            title: 'Cross-Platform Compatibility',
            description: 'Ensuring consistent functionality across different devices, browsers, and operating systems used in educational environments.'
          }
        ],
        outcome: 'Successfully delivered a enterprise-grade assessment platform that serves thousands of students and educators, providing secure, reliable, and user-friendly digital assessment capabilities.',
        links: {
          demo: 'https://assessment-platform-demo.infosys.com'
        }
      },
    },
    {
      projectName: 'Trackit - Project Management & Tracking System',
      dates: 'Jan 2022 – Apr 2024',
      company: 'Infosys Ltd',
      companyLogo: 'assets/images/company-logos/infosys-logo.svg',
      relation: 'Associated with Infosys',
      category: 'fullstack',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
      summary: 'A comprehensive project management and tracking system designed to streamline workflow and enhance productivity.',
      imageUrl: 'assets/images/work-section/trackit.svg',
      description: `• Developed a full-stack web application for project tracking and management.
• Implemented real-time collaboration features and task management.
• Built responsive dashboards with interactive charts and analytics.
• Integrated user authentication and role-based access control.
• Designed efficient database schemas for project and user data management.`,
      skills: [
        { name: 'Angular', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
        { name: 'Java SpringBoot', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
        { name: 'Database', icon: 'assets/svg-icons/database-svgrepo-com.svg' },
        { name: 'Docker', icon: 'assets/svg-icons/docker-svgrepo-com.svg' },
      ],
      detailedView: {
        overview: 'Trackit is a comprehensive project management and tracking system that streamlines team workflows and enhances productivity through intelligent task management, real-time collaboration, and advanced analytics.',
        keyFeatures: [
          {
            title: 'Real-time Collaboration',
            description: 'Built collaborative features including live updates, team communication, and shared workspaces for seamless project coordination.',
            icon: '👥'
          },
          {
            title: 'Advanced Analytics Dashboard',
            description: 'Developed interactive dashboards with charts, progress tracking, and performance metrics for data-driven project management.',
            icon: '📈'
          },
          {
            title: 'Role-based Access Control',
            description: 'Implemented sophisticated user authentication and authorization system with granular permissions for different user roles.',
            icon: '🔐'
          },
          {
            title: 'Task Management Engine',
            description: 'Created intelligent task assignment, dependency tracking, and automated workflow management capabilities.',
            icon: '✅'
          }
        ],
        techStack: [
          {
            category: 'Frontend',
            technologies: ['Angular', 'TypeScript', 'Angular Material', 'Chart.js', 'WebSocket']
          },
          {
            category: 'Backend',
            technologies: ['Java Spring Boot', 'Spring Security', 'RESTful APIs', 'WebSocket API']
          },
          {
            category: 'Database',
            technologies: ['MySQL', 'JPA/Hibernate', 'Database Design', 'Query Optimization']
          },
          {
            category: 'DevOps & Tools',
            technologies: ['Docker', 'Git', 'Maven', 'Unit Testing']
          }
        ],
        challenges: [
          {
            title: 'Real-time Synchronization',
            description: 'Implementing real-time updates across multiple users while maintaining data consistency and handling concurrent modifications.'
          },
          {
            title: 'Scalable Architecture',
            description: 'Designing a system architecture that can handle growing teams and increasing project complexity without performance degradation.'
          },
          {
            title: 'User Experience Design',
            description: 'Creating an intuitive interface that balances powerful functionality with ease of use for users with varying technical expertise.'
          }
        ],
        outcome: 'Successfully delivered a robust project management platform that improved team productivity by 40% and reduced project delivery times through efficient workflow automation and real-time collaboration features.',
        links: {
          demo: 'https://trackit-demo.infosys.com'
        }
      },
    },
  ];

  @ViewChildren('workCard') workCards!: QueryList<ElementRef>;
  @ViewChild('workSection') workSection!: ElementRef;
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  // Carousel navigation properties
  public currentIndex: number = 0;
  public isTransitioning: boolean = false;
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private touchStartY: number = 0;
  private touchEndY: number = 0;

  // Detailed view properties
  public isDetailedView: boolean = false;
  public selectedProject: WorkEntry | null = null;
  public activeNavSection: string = 'overview';

  // Mobile detection
  public isMobile: boolean = false;

  // Private properties for cleanup
  private intersectionObserver: IntersectionObserver | null = null;
  private sectionObserver: IntersectionObserver | null = null;
  private scrollTimeout: any = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.detectMobile();
  }

  ngAfterViewInit(): void {
    this.setupCarouselAnimations();
    this.setupTouchHandlers();
  }

  ngOnDestroy(): void {
    // Clean up intersection observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }

    // Clean up section observer
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
      this.sectionObserver = null;
    }

    // Clean up scroll timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = null;
    }
  }

  private setupCarouselAnimations(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      this.workCards.forEach((card) => {
        this.intersectionObserver!.observe(card.nativeElement);
      });
    }
  }

  // Mobile detection method
  private detectMobile(): void {
    this.isMobile = window.innerWidth <= 768;
    console.log('Mobile detection:', this.isMobile, 'Window width:', window.innerWidth);

    // Listen for window resize to update mobile detection
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
      console.log('Resize - Mobile detection:', this.isMobile, 'Window width:', window.innerWidth);
      this.cdr.detectChanges();
    });
  }

  private setupTouchHandlers(): void {
    if (this.carouselContainer) {
      const container = this.carouselContainer.nativeElement;

      container.addEventListener('touchstart', (e: TouchEvent) => {
        this.touchStartX = e.changedTouches[0].screenX;
        this.touchStartY = e.changedTouches[0].screenY;

        // Prevent scrolling when swiping horizontally on mobile
        if (this.isMobile) {
          e.preventDefault();
        }
      }, { passive: false });

      container.addEventListener('touchmove', (e: TouchEvent) => {
        // Prevent vertical scrolling during horizontal swipe
        if (this.isMobile) {
          const currentX = e.changedTouches[0].screenX;
          const currentY = e.changedTouches[0].screenY;
          const diffX = Math.abs(currentX - this.touchStartX);
          const diffY = Math.abs(currentY - this.touchStartY);

          // If horizontal movement is greater, prevent default to avoid scroll
          if (diffX > diffY && diffX > 10) {
            e.preventDefault();
          }
        }
      }, { passive: false });

      container.addEventListener('touchend', (e: TouchEvent) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.touchEndY = e.changedTouches[0].screenY;
        this.handleSwipe();
      });
    }
  }

  private handleSwipe(): void {
    const swipeThreshold = this.isMobile ? 30 : 50; // Lower threshold for mobile
    const verticalThreshold = 100;

    const diffX = this.touchStartX - this.touchEndX;
    const diffY = Math.abs(this.touchStartY - this.touchEndY);

    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(diffX) > swipeThreshold && diffY < verticalThreshold) {
      if (diffX > 0) {
        // Swipe left - next card
        this.nextCard();
      } else {
        // Swipe right - previous card
        this.prevCard();
      }
    }
  }

  /**
   * Navigate to the next card
   */
  nextCard(): void {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    this.currentIndex = (this.currentIndex + 1) % this.workEntries.length;

    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  /**
   * Navigate to the previous card
   */
  prevCard(): void {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    this.currentIndex = this.currentIndex === 0 ? this.workEntries.length - 1 : this.currentIndex - 1;

    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  /**
   * Navigate to a specific card
   */
  goToCard(index: number): void {
    if (this.isTransitioning || index === this.currentIndex) return;

    this.isTransitioning = true;
    this.currentIndex = index;

    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  /**
   * Handle keyboard navigation
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return; // Don't interfere with form inputs
    }

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.prevCard();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextCard();
        break;
      case 'Home':
        event.preventDefault();
        this.goToCard(0);
        break;
      case 'End':
        event.preventDefault();
        this.goToCard(this.workEntries.length - 1);
        break;
    }
  }

  getProjectGradient(entry: WorkEntry): string {
    return entry.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }

  getCategoryColor(category?: string): string {
    switch (category) {
      case 'frontend':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'backend':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'fullstack':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'analytics':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  }

  formatCategory(category?: string): string {
    switch (category) {
      case 'frontend':
        return 'Frontend';
      case 'backend':
        return 'Backend';
      case 'fullstack':
        return 'Full Stack';
      case 'analytics':
        return 'Analytics';
      default:
        return 'Project';
    }
  }

  /**
   * Open detailed view for a project
   */
  openDetailedView(project: WorkEntry): void {
    this.selectedProject = project;
    this.isDetailedView = true;
    this.activeNavSection = 'overview'; // Reset to overview when opening detailed view

    // Set up section observers after view has rendered
    setTimeout(() => {
      this.setupSectionObserver();
      // Ensure overview is initially highlighted
      this.cdr.detectChanges();
    }, 100);
  }

  /**
   * Close detailed view and return to carousel
   */
  closeDetailedView(): void {
    this.isDetailedView = false;
    this.selectedProject = null;

    // Clean up section observer when closing detailed view
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
      this.sectionObserver = null;
    }
  }

  /**
   * Set up intersection observer for section navigation
   */
  private setupSectionObserver(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      // Clean up existing observer
      if (this.sectionObserver) {
        this.sectionObserver.disconnect();
      }

      this.sectionObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          // Clear any existing timeout
          if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
          }

          // Add a small delay to prevent rapid changes
          this.scrollTimeout = setTimeout(() => {
            // Find the section with highest intersection ratio
            let bestEntry: IntersectionObserverEntry | null = null;
            let maxRatio = 0;

            for (const entry of entries) {
              if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                bestEntry = entry;
              }
            }

            // If no section is significantly visible, find the closest to viewport center
            if (!bestEntry || maxRatio < 0.2) {
              const viewportCenter = window.innerHeight / 2;
              let closestDistance = Infinity;

              for (const entry of entries) {
                const rect = entry.boundingClientRect;
                const elementCenter = rect.top + rect.height / 2;
                const distance = Math.abs(elementCenter - viewportCenter);

                // Only consider elements that are at least partially visible
                if (rect.bottom > 0 && rect.top < window.innerHeight && distance < closestDistance) {
                  closestDistance = distance;
                  bestEntry = entry;
                }
              }
            }

            if (bestEntry) {
              const sectionId = (bestEntry.target as HTMLElement).id;
              if (this.activeNavSection !== sectionId) {
                this.activeNavSection = sectionId;
                this.cdr.detectChanges();
              }
            }
          }, 100);
        },
        {
          threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
          rootMargin: '-20% 0px -20% 0px'
        }
      );

      // Wait for Angular to render conditional sections, then observe all visible sections
      setTimeout(() => {
        const sections = ['overview', 'key-features', 'tech-stack', 'challenges-learnings', 'outcome'];
        sections.forEach(sectionId => {
          const element = document.getElementById(sectionId);
          if (element) {
            this.sectionObserver!.observe(element);
          }
        });
      }, 300); // Increased delay to ensure all conditional sections are rendered
    }
  }

  /**
   * Check if project has detailed view data
   */
  hasDetailedView(project: WorkEntry): boolean {
    return !!project.detailedView;
  }

  /**
   * Scroll to a specific section in detailed view
   */
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Update active navigation state
      this.activeNavSection = sectionId;
    }
  }

  /**
   * Get main tech stack for header display
   */
  getMainTechStack(): string[] {
    if (!this.selectedProject?.detailedView?.techStack) {
      return [];
    }

    // Get first few technologies from different categories
    const mainTechs: string[] = [];
    this.selectedProject.detailedView.techStack.forEach(category => {
      if (mainTechs.length < 8) {
        mainTechs.push(...category.technologies.slice(0, 2));
      }
    });

    return mainTechs.slice(0, 8);
  }
}
