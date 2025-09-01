import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  isMobile = false;

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
    // Close mobile menu on resize to desktop
    if (!this.isMobile) {
      this.isMobileMenuOpen = false;
    }
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // 768px is md breakpoint
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  downloadResume() {
    // You can replace this URL with your actual resume file path
    const resumeUrl = 'assets/documents/Sudhir_Tiwari_Resume.pdf';
    const fileName = 'Sudhir_Tiwari_Resume.pdf';

    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = fileName;
    link.target = '_blank';

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Optional: Show a success message or analytics tracking
    console.log('Resume download initiated');
  }
}
