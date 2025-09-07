import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit, OnDestroy {
  showPhoto = false;
  private animationInterval: any;

  ngOnInit() {
    // Start the animation cycle - interchange every 3 seconds
    this.animationInterval = setInterval(() => {
      this.showPhoto = !this.showPhoto;
    }, 3000);
  }

  ngOnDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }
}
