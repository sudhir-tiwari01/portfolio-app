import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Technology {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-content-showcase',
  templateUrl: './content-showcase.component.html',
  styleUrls: ['./content-showcase.component.css']
})
export class ContentShowcaseComponent implements OnInit {

  // Email copy state
  emailCopied: boolean = false;

  constructor(private router: Router) { }

  // Work mode selection
  selectedWorkMode: 'remote' | 'hybrid' = 'remote';

  // Timezone availability
  allTimezones = [
    { code: 'uk', name: 'UK', flag: '🇬🇧', time: 'GMT' },
    { code: 'india', name: 'India', flag: '🇮🇳', time: 'IST' },
    { code: 'usa', name: 'USA', flag: '🇺🇸', time: 'EST' }
  ];

  // Get available timezones based on work mode
  get availableTimezones() {
    if (this.selectedWorkMode === 'hybrid') {
      return this.allTimezones.filter(tz => tz.code === 'india');
    }
    return this.allTimezones; // Show all for remote
  }

  // All technologies extracted from your work projects
  technologies: Technology[] = [
    { name: 'Angular', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
    { name: 'TypeScript', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
    { name: 'Java', icon: 'assets/svg-icons/java-svgrepo-com.svg' },
    { name: 'Spring Boot', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
    { name: 'AWS', icon: 'assets/svg-icons/aws-svgrepo-com.svg' },
    { name: 'Docker', icon: 'assets/svg-icons/docker-svgrepo-com.svg' },
    { name: 'Elasticsearch', icon: 'assets/svg-icons/elastic-search-svgrepo-com.svg' },
    { name: 'Groovy', icon: 'assets/svg-icons/pl-groovy-01-svgrepo-com.svg' },
    { name: 'MongoDB', icon: 'assets/svg-icons/database-svgrepo-com.svg' },
    { name: 'SQL', icon: 'assets/svg-icons/database-svgrepo-com.svg' },
    { name: 'Azure', icon: 'assets/svg-icons/azure-svgrepo-com.svg' },
    { name: 'GitHub', icon: 'assets/svg-icons/icons8-github.svg' },
    { name: 'Node.js', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
    { name: 'JavaScript', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
    { name: 'HTML5', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
    { name: 'CSS3', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
    { name: 'Tailwind CSS', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
    { name: 'RESTful APIs', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
    { name: 'Microservices', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
    { name: 'BDD Testing', icon: 'assets/svg-icons/gherkin-monuments-svgrepo-com.svg' }
  ];

  // Split technologies into 3 rows for the floating animation
  techRow1: Technology[] = [];
  techRow2: Technology[] = [];
  techRow3: Technology[] = [];

  ngOnInit(): void {
    this.splitTechnologiesIntoRows();
  }

  private splitTechnologiesIntoRows(): void {
    // Distribute technologies evenly across 3 rows
    for (let i = 0; i < this.technologies.length; i++) {
      if (i % 3 === 0) {
        this.techRow1.push(this.technologies[i]);
      } else if (i % 3 === 1) {
        this.techRow2.push(this.technologies[i]);
      } else {
        this.techRow3.push(this.technologies[i]);
      }
    }
  }

  bookCall(): void {
    // Navigate to the calendar page
    this.router.navigate(['/more']);
  }

  copyEmail(): void {
    const email = 'sudhirtiwari1998@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      // Show success message
      this.emailCopied = true;

      // Reset after 2 seconds with animation
      setTimeout(() => {
        this.emailCopied = false;
      }, 2000);

      console.log('Email copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy email: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      // Show success message even for fallback
      this.emailCopied = true;
      setTimeout(() => {
        this.emailCopied = false;
      }, 2000);
    });
  }

  selectWorkMode(mode: 'remote' | 'hybrid'): void {
    this.selectedWorkMode = mode;
  }

  isTimezoneAvailable(code: string): boolean {
    return this.availableTimezones.some(tz => tz.code === code);
  }
}
