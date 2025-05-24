// src/app/about/about.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';

import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';

interface CarouselItem {
  imageUrl: string;
  caption: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    // Fade‐in/fade‐out the entire carousel wrapper on enter/leave
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('600ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit, OnDestroy {
  // Exactly three images + captions
  public carouselItems: CarouselItem[] = [
    {
      imageUrl: 'assets/images/about-folder/Profile Pic.jpg',
      caption: 'I Code – Building sleek, efficient web apps.',
    },
    {
      imageUrl: 'assets/images/about-folder/i-lift.jpg',
      caption: 'I Workout – Staying fit, one rep at a time.',
    },
    {
      imageUrl:
        'assets/images/about-folder/beautiful-sky-full-stars-trona-ca.jpg',
      caption: 'I Travel – Exploring the world, one adventure at a time.',
    },
  ];

  /** Index of the card that’s currently centered */
  public currentIndex: number = 0;

  private rotateIntervalId!: any;

  ngOnInit(): void {
    // Rotate every 4 seconds
    this.rotateIntervalId = setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.carouselItems.length;
    }, 4000);
  }

  ngOnDestroy(): void {
    if (this.rotateIntervalId) {
      clearInterval(this.rotateIntervalId);
    }
  }

  /**
   * Returns one of:
   *  - "prev"    (for the card just before currentIndex)
   *  - "current" (for the card at currentIndex)
   *  - "next"    (for the card just after currentIndex)
   *  - "hidden"  (for any other card—none in your 3‐item data, but future-proof)
   */
  getPositionClass(i: number): 'prev' | 'current' | 'next' | 'hidden' {
    const len = this.carouselItems.length;
    const prevIndex = (this.currentIndex - 1 + len) % len;
    const nextIndex = (this.currentIndex + 1) % len;

    if (i === this.currentIndex) return 'current';
    if (i === prevIndex) return 'prev';
    if (i === nextIndex) return 'next';
    return 'hidden';
  }
}
