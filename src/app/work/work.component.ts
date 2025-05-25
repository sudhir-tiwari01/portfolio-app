import { Component, OnInit } from '@angular/core';

interface WorkEntry {
  projectName: string;
  dates: string;
  company: string;
  relation: string;
  summary: string;
  imageUrl: string;
  description: string;
  skills: SkillItem[];   // now an array of objects, not plain strings
}

interface SkillItem {
  name: string;          // e.g. "Docker"
  icon: string;          // e.g. "assets/svg-icons/docker.svg"
}

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
})
export class WorkComponent implements OnInit {
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
Roles & Responsibilities:
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
Roles & Responsibilities:
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
Roles & Responsibilities:
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
      imageUrl: 'assets/images/work-folder/dummy-project.png',
      description: `
Roles & Responsibilities:
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
      imageUrl: 'assets/images/work-folder/dummy-project.png',
      description: `
Roles & Responsibilities:
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
  ];

  constructor() {}

  ngOnInit(): void {}
}
