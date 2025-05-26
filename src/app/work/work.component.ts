// src/app/work/work.component.ts
import {
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ViewChild
} from '@angular/core';

interface WorkEntry {
  projectName: string;
  dates: string;
  company: string;
  relation: string;
  summary: string;
  imageUrl: string;
  description: string; // multi‐line text including “•” bullets
  skills: SkillItem[];
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
export class WorkComponent implements OnInit, AfterViewInit {
  /** All entries */
  public workEntries: WorkEntry[] = [
    {
      projectName: 'InCites Benchmark & Analytics',
      dates: 'Apr 2024 – Present',
      company: 'Clarivate',
      relation: 'Associated with Clarivate',
      summary: `
InCites is a research analytics solution that empowers institutions and policy makers to measure research performance, benchmark against peers, and drive strategic decision-making using trusted Web of Science data.`,
      imageUrl: 'assets/images/work-section/InCites.png',
      description: `
• Designed and developed scalable APIs using Java and Spring Boot.
• Built dynamic front-end interfaces with Angular and TypeScript to visualize key benchmarking metrics.
• Integrated Elasticsearch for fast, responsive search experiences.
• Implemented robust data validation through integration tests and BDD test cases (Gherkin).
• Containerized the application with Docker and supported AWS-based deployments.

InCites is a powerful research analytics platform that helps institutions evaluate their research performance. It pulls data from the Web of Science Core Collection and allows users to benchmark productivity, impact, and collaboration across institutions, countries, fields, or individuals.
      `,
      skills: [
        { name: 'AWS', icon: 'assets/svg-icons/aws-svgrepo-com.svg' },
        { name: 'Elasticsearch', icon: 'assets/svg-icons/elastic-search-svgrepo-com.svg' },
        { name: 'Groovy', icon: 'assets/svg-icons/pl-groovy-01-svgrepo-com.svg' },
        { name: 'Java SpringBoot', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
        { name: 'Angular', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
        { name: 'Docker', icon: 'assets/svg-icons/docker-svgrepo-com.svg' },
      ],
    },
    {
      projectName: 'My Organization – Research Performance Dashboard',
      dates: 'Apr 2024 – Present',
      company: 'Clarivate',
      relation: 'Associated with Clarivate',
      summary: `
My Organization is a customizable research dashboard for institutions to monitor and evaluate their internal research performance.`,
      imageUrl: 'assets/images/work-section/my-org.png',
      description: `
• Led development of customizable dashboards and modular UI components (Angular, TypeScript).
• Architected backend services with Spring Boot for flexible data visualizations tailored to each institution.
• Implemented efficient data filtering mechanisms and secure RESTful endpoints.
• Authored BDD test cases and integration flows using Groovy.
• Containerized testing environments with Docker for faster feedback loops.

This project enables institutions to build tailored views across departments, authors, and collaborations using trusted Web of Science data.
      `,
      skills: [
        { name: 'Elasticsearch', icon: 'assets/svg-icons/elastic-search-svgrepo-com.svg' },
        { name: 'Angular', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
        { name: 'Spring Boot', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
        { name: 'Groovy', icon: 'assets/svg-icons/pl-groovy-01-svgrepo-com.svg' },
        { name: 'Docker', icon: 'assets/svg-icons/docker-svgrepo-com.svg' },
        { name: 'BDD', icon: 'assets/svg-icons/gherkin-monuments-svgrepo-com.svg' },
      ],
    },
    {
      projectName: 'Research Horizon Navigator (RHN)',
      dates: 'Apr 2024 – Present',
      company: 'Clarivate',
      relation: 'Associated with Clarivate',
      summary: `
Research Horizon Navigator is a forward-looking analytics tool that helps institutions identify emerging research areas, growth opportunities, and collaboration partners.`,
      imageUrl: 'assets/images/work-section/rhn.png',
      description: `
• Built backend services to process and analyze research trend data (Java, Spring Boot, Groovy).
• Implemented interactive front-end visualizations (Angular) to surface emerging research areas and keyword clusters.
• Integrated Elasticsearch to power real-time search and filter features.
• Set up BDD environments using Docker to validate Elasticsearch index structures and search relevance.
• Collaborated with cross-functional teams to ensure scalable design patterns and performance tuning.

RHN provides a future-oriented view of where research is heading, beyond traditional benchmarking.
      `,
      skills: [
        { name: 'Java', icon: 'assets/svg-icons/java-svgrepo-com.svg' },
        { name: 'Spring Boot', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
        { name: 'Groovy', icon: 'assets/svg-icons/pl-groovy-01-svgrepo-com.svg' },
        { name: 'Angular', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
        { name: 'Elasticsearch', icon: 'assets/svg-icons/elastic-search-svgrepo-com.svg' },
        { name: 'Docker', icon: 'assets/svg-icons/docker-svgrepo-com.svg' },
      ],
    },
    {
      projectName: 'TrackIt',
      dates: 'Oct 2022 – Apr 2024',
      company: 'Infosys',
      relation: 'Associated with Infosys',
      summary: `
TrackIt is a user-friendly platform designed to streamline tracking and management of trainees’ and educators’ records.`,
      imageUrl: 'assets/images/work-section/iap.png',
      description: `
• Resolved critical system issues and improved platform stability.
• Designed and implemented new features, ensuring timely releases.
• Engineered microservices and RESTful APIs to support seamless data flow and system integration.
• Developed a responsive, intuitive UI with Angular to enhance user experience.
• Collaborated on Azure-based deployments and optimized database queries (MongoDB, SQL).

TrackIt ensures that critical information remains up-to-date and easily accessible through a seamless interface.
      `,
      skills: [
        { name: 'Full-Stack Dev', icon: 'assets/svg-icons/java-svgrepo-com.svg' },
        { name: 'RESTful WebServices', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
        { name: 'MongoDB', icon: 'assets/svg-icons/database-svgrepo-com.svg' },
        { name: 'SQL', icon: 'assets/svg-icons/database-svgrepo-com.svg' },
        { name: 'Microsoft Azure', icon: 'assets/svg-icons/azure-svgrepo-com.svg' },
      ],
    },
    {
      projectName: 'Assessment Platform: Evaluation and Real-Time Invigilation',
      dates: 'Jun 2021 – Oct 2022',
      company: 'Infosys',
      relation: 'Associated with Infosys',
      summary: `
An end-to-end assessment platform that drastically reduces manual effort by automating invigilation, grading, and result updates.`,
      imageUrl: 'assets/images/work-section/iap.png',
      description: `
• Architected front-end (Angular) and back-end (Java, Spring Boot) components.
• Developed RESTful APIs and integrated microservices for seamless module communication.
• Implemented automated code analysis to evaluate submissions against test cases.
• Integrated audio/video for real-time invigilation to ensure exam integrity.
• Containerized the application using Docker for smooth deployments and consistency.

This platform provides efficient, secure, and scalable assessment workflows, delivering timely feedback to candidates and instructors.
      `,
      skills: [
        { name: 'Docker', icon: 'assets/svg-icons/docker-svgrepo-com.svg' },
        { name: 'API Dev', icon: 'assets/svg-icons/java-svgrepo-com.svg' },
        { name: 'Java', icon: 'assets/svg-icons/java-svgrepo-com.svg' },
        { name: 'Angular', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
        { name: 'Spring Boot', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
      ],
    },
    {
      projectName: '',
      dates: '',
      company: 'Infosys',
      relation: 'Associated with Infosys',
      summary: ``,
      imageUrl: '',
      description: ``,
      skills: [
        { name: 'Java', icon: 'assets/svg-icons/java-svgrepo-com.svg' },
        { name: 'Spring Boot', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
        { name: 'Angular', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
        { name: 'Docker', icon: 'assets/svg-icons/docker-svgrepo-com.svg' },
      ],
    },
  ];

  /** Index of the active (in‐view) card */
  public currentIndex: number = 0;

  /** Left‐column container */
  @ViewChild('leftCol', { static: true }) leftCol!: ElementRef;

  /** References to each card in the left column */
  @ViewChildren('cardRef', { read: ElementRef })
  public cardRefs!: QueryList<ElementRef>;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Attach scroll listener directly to the left‐column
    const leftElement = this.leftCol.nativeElement as HTMLElement;
    leftElement.addEventListener('scroll', () => this.updateActiveIndex());
    // Also run once on init to highlight the first card
    setTimeout(() => this.updateActiveIndex(), 50);
  }

  /**
   * Determine which card’s top edge is closest to the threshold (20px below
   * the top of the left‐column viewport). If a card’s top <= threshold < bottom,
   * that card wins. If none, clamp to first/last index.
   */
  private updateActiveIndex(): void {
    if (!this.cardRefs || this.cardRefs.length === 0) {
      return;
    }

    // Get container’s bounding rect
    const containerRect = (this.leftCol.nativeElement as HTMLElement).getBoundingClientRect();
    // We’ll use 20px below the container’s top edge as our “trigger line”
    const thresholdY = containerRect.top + 20;

    let chosenIndex = -1;

    this.cardRefs.forEach((ref, idx) => {
      const cardRect = (ref.nativeElement as HTMLElement).getBoundingClientRect();
      if (cardRect.top <= thresholdY && cardRect.bottom > thresholdY) {
        chosenIndex = idx;
      }
    });

    if (chosenIndex === -1) {
      // If no card straddles the threshold line, either we’re above all cards (choose index=0)
      // or below all cards (choose last index)
      const firstRect = (this.cardRefs.first.nativeElement as HTMLElement).getBoundingClientRect();
      const lastRect = (this.cardRefs.last.nativeElement as HTMLElement).getBoundingClientRect();

      if (firstRect.top > thresholdY) {
        chosenIndex = 0;
      } else if (lastRect.bottom <= thresholdY) {
        chosenIndex = this.cardRefs.length - 1;
      }
    }

    if (chosenIndex !== -1 && chosenIndex !== this.currentIndex) {
      this.currentIndex = chosenIndex;
    }
  }

  /**
   * Called when the user scrolls (mouse wheel or touchpad) over the right column.
   * We forward the scroll to the left‐column with smooth behavior. Once the left‐column
   * hits its top or bottom, the event bubbles so the page content can scroll.
   */
  public onRightColumnWheel(event: WheelEvent): void {
    const leftElement = this.leftCol.nativeElement as HTMLElement;

    // Determine if left column can scroll further up or down
    const canScrollUp = leftElement.scrollTop > 0;
    const canScrollDown =
      leftElement.scrollTop + leftElement.clientHeight < leftElement.scrollHeight;

    // If left column can scroll in the direction of event.deltaY, consume it
    if (
      (event.deltaY < 0 && canScrollUp) ||   // scrolling up && not at top
      (event.deltaY > 0 && canScrollDown)    // scrolling down && not at bottom
    ) {
      event.preventDefault();
      leftElement.scrollBy({
        top: event.deltaY,
        behavior: 'smooth'
      });
    }
    // Otherwise, do nothing so the event bubbles to scroll the rest of the page
  }
}
