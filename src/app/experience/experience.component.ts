// src/app/experience/experience.component.ts
import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit
} from '@angular/core';

interface ExperienceEntry {
  company: string;
  dates: string;
  location: string;
  role: string;
  description: string;
  skills: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('experienceSection', { static: true }) expSection!: ElementRef;

  /** Scroll percentage (0–100) representing how far we've scrolled through the section */
  public scrollPercent: number = 0;

  /** Your experience entries */
  public entries: ExperienceEntry[] = [
    {
      company: 'Clarivate',
      dates: 'Apr 2024 – Present · 1 yr 2 mos',
      location: 'Karnataka, India · Hybrid',
      role: 'Software Engineer',
      description: `
        Contributed to the development and enhancement of the Incites Benchmarking
        and Analytics product, leveraging expertise in ElasticSearch, AWS, Groovy,
        and Java SpringBoot for backend, along with Angular for frontend development.

        Created comprehensive documentation to support seamless implementation and
        ensure clarity for stakeholders, improving overall workflow efficiency.

        Diagnosed and resolved critical application issues, enhancing system reliability
        and user satisfaction.

        Implemented user-focused improvements, optimizing application performance and
        refining the user experience for greater engagement and productivity.
      `,
      skills: ['ElasticSearch', 'AWS', 'Groovy', 'Java SpringBoot', 'Angular', 'Documentation']
    },
    {
      company: 'Infosys',
      dates: 'Oct 2022 – Apr 2024 · 1 yr 7 mos',
      location: 'Mysore, Karnataka, India · On-site',
      role: 'Senior System Engineer',
      description: `
        Directed the development of innovative web applications using Java Spring
        and Angular frameworks, achieving a 40% increase in user engagement while
        ensuring flawless compatibility across multiple browsers.

        Collaborated with cross-functional teams to align frontend and backend systems
        seamlessly, enhancing performance and optimizing workflows across the Java
        technology stack.

        Adopted Agile methodologies to streamline project delivery, accelerating feature
        release timelines by 30% and demonstrating adaptability to dynamic project demands.
      `,
      skills: ['Java Spring', 'Angular', 'Agile', 'Cross-Team Collaboration']
    },
    {
      company: 'Infosys',
      dates: 'Feb 2021 – Sep 2022 · 1 yr 8 mos',
      location: 'Mysore, Karnataka, India · On-site',
      role: 'System Engineer',
      description: `
        Orchestrated the design and enhancement of a cutting-edge assessment platform,
        automating processes that reduced manual effort by 90%, significantly elevating
        user satisfaction, and optimizing the overall user experience by 50%.

        Seamlessly collaborated across cross-functional teams, driving the cohesive
        integration of front-end and back-end components to achieve a 25% boost in system
        performance and operational efficiency.

        Mentored and upskilled team members, fostering technical growth and enabling a
        remarkable 40% improvement in proficiency with emerging technologies, which
        contributed to the team’s agile adaptability.
      `,
      skills: ['Platform Design', 'Automation', 'Collaboration', 'Mentorship']
    }
  ];

  private onScrollOrResizeBound!: () => void;

  constructor() {
    // Bind our scroll handler so we can add/remove it easily
    this.onScrollOrResizeBound = this.onWindowScroll.bind(this);
  }

  ngOnInit(): void {
    // Nothing to do here; wait until view is initialized
  }

  ngAfterViewInit(): void {
    // Attach listeners as soon as the view is ready, then calculate initial scrollPercent
    window.addEventListener('scroll', this.onScrollOrResizeBound, { passive: true });
    window.addEventListener('resize', this.onScrollOrResizeBound, { passive: true });
    this.calculateScrollPercent();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScrollOrResizeBound);
    window.removeEventListener('resize', this.onScrollOrResizeBound);
  }

  private onWindowScroll(): void {
    this.calculateScrollPercent();
  }

  private calculateScrollPercent(): void {
    const rect = this.expSection.nativeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // When the section is entirely below the viewport — no scroll progress yet
    if (rect.top >= viewportHeight) {
      this.scrollPercent = 0;
      return;
    }

    // When the section is entirely above the viewport — fully scrolled
    if (rect.bottom <= 0) {
      this.scrollPercent = 100;
      return;
    }

    // Adjusted logic to start from 0% when section starts entering from bottom of viewport
    const totalScrollable = rect.height + viewportHeight; // total distance to scroll
    const distanceScrolled = viewportHeight - rect.top;   // how far we've entered

    let percent = (distanceScrolled / totalScrollable) * 100;
    percent = Math.min(100, Math.max(0, percent));
    this.scrollPercent = percent;
  }

}
