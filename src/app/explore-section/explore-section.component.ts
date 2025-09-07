import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-section',
  templateUrl: './explore-section.component.html',
  styleUrls: ['./explore-section.component.css']
})
export class ExploreSectionComponent {

  constructor(private router: Router) {}

  navigateToUses() {
    this.router.navigate(['/uses']);
  }

  navigateToGuestbook() {
    this.router.navigate(['/guestbook']);
  }

  navigateToLinks() {
    this.router.navigate(['/links']);
  }

  navigateToAppreciation() {
    this.router.navigate(['/appreciation']);
  }

  navigateToAttribution() {
    this.router.navigate(['/attribution']);
  }
}
