import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ContactDialogService } from '../services/contact-dialog.service';
import { TestimonialService, Testimonial } from '../services/testimonial.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Testimonials
  testimonials: Testimonial[] = [];
  isHovered = false;

  constructor(
    private contactDialogService: ContactDialogService,
    private snackBar: MatSnackBar,
    private testimonialService: TestimonialService
  ) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  public email: string = "sudhirtiwari1998@gmail.com";

  // About me section state
  isImageHovered = false;

  // About me hover handlers
  onImageHover() {
    this.isImageHovered = true;
  }

  onImageLeave() {
    this.isImageHovered = false;
  }

  // Navigate to about section
  navigateToAbout() {
    // You can use Angular Router here, or for now we'll use simple navigation
    window.location.href = '/about';
  }

  // Technologies array - using the same skills from content showcase
  technologies = [
    { name: 'Angular', icon: 'assets/svg-icons/angular-svgrepo-com.svg' },
    { name: 'TypeScript', icon: 'assets/svg-icons/typescript-svgrepo-com.svg' },
    { name: 'Java', icon: 'assets/svg-icons/java-svgrepo-com.svg' },
    { name: 'Spring Boot', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
    { name: 'AWS', icon: 'assets/svg-icons/aws-svgrepo-com.svg' },
    { name: 'Azure', icon: 'assets/svg-icons/azure-svgrepo-com.svg' },
    { name: 'Docker', icon: 'assets/svg-icons/docker-svgrepo-com.svg' },
    { name: 'Microservices', icon: 'assets/svg-icons/spring-boot-svgrepo-com.svg' },
    { name: 'Go Language', icon: 'assets/svg-icons/go-logo-svgrepo-com.svg' },
    { name: 'Groovy', icon: 'assets/svg-icons/pl-groovy-01-svgrepo-com.svg' },
    { name: 'PostgreSQL', icon: 'assets/svg-icons/postgresql-svgrepo-com.svg' },
    { name: 'MongoDB', icon: 'assets/svg-icons/database-svgrepo-com.svg' },
    { name: 'Elasticsearch', icon: 'assets/svg-icons/elastic-search-svgrepo-com.svg' },
    { name: 'Git', icon: 'assets/svg-icons/git-svgrepo-com.svg' },
    { name: 'GitHub', icon: 'assets/svg-icons/icons8-github.svg' },
    { name: 'Jenkins', icon: 'assets/svg-icons/jenkins-svgrepo-com.svg' },
    { name: 'Terraform', icon: 'assets/svg-icons/terraform-svgrepo-com.svg' },
    { name: 'Maven', icon: 'assets/svg-icons/maven-svgrepo-com.svg' },
    { name: 'Gradle', icon: 'assets/svg-icons/gradle-svgrepo-com.svg' }
  ];

  copyEmail() {
    navigator.clipboard.writeText(this.email).then(() => {
      this.snackBar.open("Email copied to clipboard!", "", {
        duration: 2000,
      });
    });
  }

  openContactDialog(): void {
    this.contactDialogService.openContactDialog();
  }

  // Testimonials methods
  private loadTestimonials(): void {
    this.testimonialService.getApprovedTestimonials().subscribe(testimonials => {
      this.testimonials = testimonials.length > 0 ? testimonials : this.getSampleTestimonials();
    });
  }

  private getSampleTestimonials(): Testimonial[] {
    return [
      {
        id: '1',
        userName: 'Sanjana Kini',
        position: 'Senior System Engineer',
        company: 'Infosys',
        message: 'Working with you has been a privilege; your full-stack expertise blends thoughtful architecture with meticulous implementation. You translate ambiguous requirements into scalable, maintainable systems.',
        timestamp: new Date()
      },
      {
        id: '2',
        userName: 'Manthan CR',
        position: 'Senior Software Engineer',
        company: 'IBM',
        message: 'Working with you has been a masterclass in reliable engineering and thoughtful design. As a full-stack developer, you pair deep technical skill with clear communication.',
        timestamp: new Date()
      }
    ];
  }

  getTestimonialInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getTestimonialCardClass(index: number): string {
    const classes = ['testimonial-green', 'testimonial-pink', 'testimonial-blue', 'testimonial-orange'];
    return classes[index % classes.length];
  }
}
