import { Component } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ContactDialogService } from '../services/contact-dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private contactDialogService: ContactDialogService,
    private snackBar: MatSnackBar
  ) {}

  public email: string = "sudhirtiwari1998@gmail.com";

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
}
