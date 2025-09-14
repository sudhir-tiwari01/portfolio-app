import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
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
  private readonly API_BASE = 'http://localhost:3001/api';

  private testimonialsSubject = new BehaviorSubject<Testimonial[]>([]);
  public testimonials$ = this.testimonialsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAllTestimonials();
  }

  private loadAllTestimonials(): void {
    // Preferred: load from backend API
    this.http.get<{ success: boolean; data: Testimonial[] }>(`${this.API_BASE}/testimonials`)
      .pipe(
        catchError(() => {
          // If backend not available, fall back to JSON file
          return this.http.get<Testimonial[]>(this.JSON_FILE_PATH)
            .pipe(
              catchError(err => {
                console.warn('Could not load testimonials from JSON file:', err);
                return [] as any;
              })
            ) as any;
        })
      )
      .subscribe((res: any) => {
        const fromApi: Testimonial[] = Array.isArray(res) ? res : (res && res.data) ? res.data : [];
        const localTestimonials = this.getLocalTestimonials();
        const allTestimonials = [...fromApi, ...localTestimonials];
        this.testimonialsSubject.next(this.removeDuplicates(allTestimonials));
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
  approved: true // Immediately store as approved (no moderation)
    };

    // Try to POST to backend. If it fails, fall back to localStorage.
    this.http.post<{ success: boolean; data: Testimonial }>(`${this.API_BASE}/testimonials`, newTestimonial)
      .pipe(
        catchError(err => {
          console.warn('Backend unavailable, saving testimonial to localStorage:', err);
          // Save to localStorage fallback (store as approved)
          const localTestimonials = this.getLocalTestimonials();
          localTestimonials.unshift(newTestimonial);
          try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(localTestimonials));
            // Refresh observable
            const current = this.testimonialsSubject.getValue();
            this.testimonialsSubject.next(this.removeDuplicates([newTestimonial, ...current]));
          } catch (e) {
            console.error('Error writing to localStorage fallback:', e);
          }
          // Return empty observable to complete
          return of(null as any);
        })
      )
      .subscribe((res: any) => {
        if (res && res.success && res.data) {
          // Prepend the created testimonial from server
          const current = this.testimonialsSubject.getValue();
          this.testimonialsSubject.next(this.removeDuplicates([res.data, ...current]));
        }
      });
  }

  getApprovedTestimonials(): Observable<Testimonial[]> {
  // No moderation: return all testimonials
  return this.testimonials$;
  }

  getPendingTestimonials(): Observable<Testimonial[]> {
  // Moderation removed - there are no pending testimonials
  return of([]);
  }

  // Method to export pending testimonials for manual approval
  exportPendingTestimonials(): string {
  // Moderation removed - return empty list
  return JSON.stringify([], null, 2);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
