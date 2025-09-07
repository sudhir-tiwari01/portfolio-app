import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Testimonial {
  id: string;
  userName: string;
  position: string;
  company: string;
  message: string;
  timestamp: string | Date;
  approved?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private readonly STORAGE_KEY = 'portfolio_appreciations';
  private readonly JSON_FILE_PATH = 'assets/data/testimonials.json';
  
  private testimonialsSubject = new BehaviorSubject<Testimonial[]>([]);
  public testimonials$ = this.testimonialsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAllTestimonials();
  }

  private loadAllTestimonials(): void {
    // Load from JSON file (approved testimonials)
    const jsonTestimonials$ = this.http.get<Testimonial[]>(this.JSON_FILE_PATH)
      .pipe(
        catchError(error => {
          console.warn('Could not load testimonials from JSON file:', error);
          return [];
        })
      );

    // Load from localStorage (pending/local testimonials)
    const localTestimonials = this.getLocalTestimonials();

    // Combine both sources
    combineLatest([jsonTestimonials$])
      .pipe(
        map(([jsonTestimonials]) => {
          const allTestimonials = [...jsonTestimonials, ...localTestimonials];
          return this.removeDuplicates(allTestimonials);
        })
      )
      .subscribe(testimonials => {
        this.testimonialsSubject.next(testimonials);
      });
  }

  private getLocalTestimonials(): Testimonial[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading local testimonials:', error);
      return [];
    }
  }

  private removeDuplicates(testimonials: Testimonial[]): Testimonial[] {
    const seen = new Set();
    return testimonials.filter(testimonial => {
      const key = `${testimonial.userName}-${testimonial.company}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  addTestimonial(testimonial: Omit<Testimonial, 'id' | 'timestamp'>): void {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      approved: false // Mark as pending approval
    };

    const localTestimonials = this.getLocalTestimonials();
    localTestimonials.unshift(newTestimonial);
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(localTestimonials));
      this.loadAllTestimonials(); // Refresh the observable
    } catch (error) {
      console.error('Error saving testimonial:', error);
      throw new Error('Failed to save testimonial');
    }
  }

  getApprovedTestimonials(): Observable<Testimonial[]> {
    return this.testimonials$.pipe(
      map(testimonials => testimonials.filter(t => t.approved !== false))
    );
  }

  getPendingTestimonials(): Observable<Testimonial[]> {
    return this.testimonials$.pipe(
      map(testimonials => testimonials.filter(t => t.approved === false))
    );
  }

  // Method to export pending testimonials for manual approval
  exportPendingTestimonials(): string {
    const localTestimonials = this.getLocalTestimonials()
      .filter(t => t.approved === false);
    
    return JSON.stringify(localTestimonials, null, 2);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
