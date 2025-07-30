import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Technology {
  name: string;
  icon: string;
}

interface FloatingCard {
  title: string;
  subtitle: string;
  animationDelay: number;
}

interface CollaborativePartner {
  name: string;
  image: string;
  role?: string;
}

interface DustParticle {
  x: number;
  y: number;
  size: number;
}

@Component({
  selector: 'app-content-showcase',
  templateUrl: './content-showcase.component.html',
  styleUrls: ['./content-showcase.component.css']
})
export class ContentShowcaseComponent implements OnInit {

  // Email copy state
  emailCopied: boolean = false;

  // Collaborative partners (dummy data - easily manageable)
  collaborativePartners: CollaborativePartner[] = [
    {
      name: 'John Smith',
      image: 'assets/images/about-folder/Profile Pic.jpg', // Using same image as placeholder
      role: 'Product Manager'
    },
    {
      name: 'Sarah Johnson',
      image: 'assets/images/about-folder/Profile Pic.jpg', // Using same image as placeholder
      role: 'UI/UX Designer'
    },
    {
      name: 'Mike Chen',
      image: 'assets/images/about-folder/Profile Pic.jpg', // Using same image as placeholder
      role: 'Backend Developer'
    },
    {
      name: 'Emily Davis',
      image: 'assets/images/about-folder/Profile Pic.jpg', // Using same image as placeholder
      role: 'DevOps Engineer'
    },
    {
      name: 'Alex Rodriguez',
      image: 'assets/images/about-folder/Profile Pic.jpg', // Using same image as placeholder
      role: 'Frontend Developer'
    }
  ];

  // Dynamic floating cards for SaaS showcase
  floatingCards: FloatingCard[] = [
    {
      title: 'Authentication',
      subtitle: 'Secure user access',
      animationDelay: 0
    },
    {
      title: 'API Gateway',
      subtitle: 'Request routing & management',
      animationDelay: 0
    },
    {
      title: 'Payment System',
      subtitle: 'Subscription billing',
      animationDelay: 0
    },
    {
      title: 'Analytics',
      subtitle: 'Real-time insights',
      animationDelay: 0
    },
    {
      title: 'Design System',
      subtitle: 'UI consistency',
      animationDelay: 0
    },
    {
      title: 'Deployment',
      subtitle: 'CI/CD pipeline',
      animationDelay: 0
    }
  ];

  // Dust particles for technologies card background
  dustParticles: DustParticle[] = [];

  // Dust particles for project work card background
  projectDustParticles: DustParticle[] = [];

  constructor(private router: Router) {
    this.generateDustParticles();
    this.generateProjectDustParticles();
  }

  // Work mode and country selection
  selectedWorkMode: 'remote' | 'hybrid' = 'remote';
  selectedCountry: string = 'india'; // Default to India

  // Timezone availability
  allTimezones = [
    { code: 'uk', name: 'United Kingdom', flag: '🇬🇧', time: 'GMT' },
    { code: 'india', name: 'India', flag: '🇮🇳', time: 'IST' },
    { code: 'usa', name: 'United States', flag: '🇺🇸', time: 'EST' }
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
    this.calculateAnimationDelays();
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

  private calculateAnimationDelays(): void {
    // Automatically calculate animation delays for floating cards
    // Each card appears 3 seconds after the previous one
    this.floatingCards.forEach((card, index) => {
      card.animationDelay = -(index * 3);
    });
  }

  // Helper method to get initials from name
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2); // Limit to 2 characters
  }

  // Helper method to add new collaborative partners
  addCollaborativePartner(name: string, image: string, role?: string): void {
    const newPartner: CollaborativePartner = {
      name,
      image,
      role
    };
    this.collaborativePartners.push(newPartner);
  }

  // Helper method to remove a collaborative partner
  removeCollaborativePartner(name: string): void {
    this.collaborativePartners = this.collaborativePartners.filter(partner => partner.name !== name);
  }

  // Helper method to update partner image
  updatePartnerImage(name: string, newImage: string): void {
    const partner = this.collaborativePartners.find(p => p.name === name);
    if (partner) {
      partner.image = newImage;
    }
  }

  // Example method to demonstrate adding partners dynamically
  addExamplePartners(): void {
    this.addCollaborativePartner('David Wilson', 'assets/images/about-folder/Profile Pic.jpg', 'Tech Lead');
    this.addCollaborativePartner('Lisa Brown', 'assets/images/about-folder/Profile Pic.jpg', 'Project Manager');
  }

  // Helper method to add new floating cards dynamically
  addFloatingCard(title: string, subtitle: string): void {
    const newCard: FloatingCard = {
      title,
      subtitle,
      animationDelay: -(this.floatingCards.length * 3)
    };
    this.floatingCards.push(newCard);
  }

  // Example method to demonstrate adding cards dynamically
  // You can call this method or directly modify the floatingCards array
  addExampleCards(): void {
    // Example: Add new cards
    this.addFloatingCard('Machine Learning', 'AI-powered features');
    this.addFloatingCard('Real-time Chat', 'Instant communication');
    this.addFloatingCard('File Storage', 'Cloud-based storage');
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

  // Toggle work mode
  toggleWorkMode(): void {
    this.selectedWorkMode = this.selectedWorkMode === 'remote' ? 'hybrid' : 'remote';
    // When switching to hybrid, default to India
    if (this.selectedWorkMode === 'hybrid') {
      this.selectedCountry = 'india';
    }
  }

  // Select country
  selectCountry(country: string): void {
    this.selectedCountry = country;
    // If hybrid mode is selected and country is not India, switch to remote
    if (this.selectedWorkMode === 'hybrid' && country !== 'india') {
      this.selectedWorkMode = 'remote';
    }
  }

  // Get current flag for location tag
  getCurrentFlag(): string {
    const timezone = this.allTimezones.find(tz => tz.code === this.selectedCountry);
    return timezone ? timezone.flag : '🌐';
  }

  // Get current location name
  getCurrentLocation(): string {
    const timezone = this.allTimezones.find(tz => tz.code === this.selectedCountry);
    return timezone ? timezone.name : 'Global';
  }

  isTimezoneAvailable(code: string): boolean {
    return this.availableTimezones.some(tz => tz.code === code);
  }

  // Generate random dust particles for background animation
  private generateDustParticles(): void {
    this.dustParticles = [];
    for (let i = 0; i < 30; i++) {
      this.dustParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1 // Size between 1-4px
      });
    }
  }

  // Generate random dust particles for project work card background
  private generateProjectDustParticles(): void {
    this.projectDustParticles = [];
    for (let i = 0; i < 25; i++) {
      this.projectDustParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.8 // Size between 0.8-3.3px
      });
    }
  }
}
