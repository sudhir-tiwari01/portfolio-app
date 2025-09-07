import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { TestimonialService, Testimonial } from '../../services/testimonial.service';

interface CompanySuggestion {
  name: string;
  domain: string;
  logo?: string;
}

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})
export class BucketListComponent implements OnInit {
  appreciationForm: FormGroup;
  appreciations: Testimonial[] = [];
  isSubmitting = false;
  showSuccessMessage = false;

  // Company autocomplete properties
  companySuggestions: CompanySuggestion[] = [];
  showCompanySuggestions = false;
  isLoadingCompanies = false;
  searchedCompany = '';
  selectedSuggestionIndex = -1;
  private companySearchSubject = new Subject<string>();

  private readonly CLEARBIT_API = 'https://autocomplete.clearbit.com/v1/companies/suggest';

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private testimonialService: TestimonialService
  ) {
    this.appreciationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      position: ['', [Validators.required, Validators.minLength(2)]],
      company: ['', [Validators.required, Validators.minLength(2)]],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit(): void {
    this.loadAppreciations();
    this.setupCompanyAutocomplete();
  }

  private setupCompanyAutocomplete(): void {
    this.companySearchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (query.length < 2) {
          return of([]);
        }
        this.isLoadingCompanies = true;
        return this.searchCompanies(query);
      })
    ).subscribe(suggestions => {
      this.companySuggestions = suggestions;
      this.isLoadingCompanies = false;
    });
  }

  private searchCompanies(query: string) {
    return this.http.get<CompanySuggestion[]>(`${this.CLEARBIT_API}?query=${encodeURIComponent(query)}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching companies:', error);
          return of([]);
        })
      );
  }

  onCompanyInput(event: any): void {
    const value = event.target.value;
    this.searchedCompany = value;
    this.selectedSuggestionIndex = -1;
    
    if (value.length >= 2) {
      this.showCompanySuggestions = true;
      this.companySearchSubject.next(value);
    } else {
      this.showCompanySuggestions = false;
      this.companySuggestions = [];
    }
  }

  onCompanyBlur(): void {
    // Delay hiding suggestions to allow for selection
    setTimeout(() => {
      this.showCompanySuggestions = false;
    }, 200);
  }

  onCompanyKeydown(event: KeyboardEvent): void {
    if (!this.showCompanySuggestions || this.companySuggestions.length === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedSuggestionIndex = Math.min(
          this.selectedSuggestionIndex + 1,
          this.companySuggestions.length - 1
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedSuggestionIndex = Math.max(this.selectedSuggestionIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedSuggestionIndex >= 0) {
          this.selectCompany(this.companySuggestions[this.selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        this.showCompanySuggestions = false;
        this.selectedSuggestionIndex = -1;
        break;
    }
  }

  selectCompany(company: CompanySuggestion): void {
    this.appreciationForm.patchValue({
      company: company.name
    });
    this.showCompanySuggestions = false;
    this.companySuggestions = [];
  }

  getCompanyInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  }

  onSubmit(): void {
    if (this.appreciationForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formValue = this.appreciationForm.value;
      
      try {
        this.testimonialService.addTestimonial({
          userName: formValue.userName,
          position: formValue.position,
          company: formValue.company,
          message: formValue.message
        });

        this.appreciationForm.reset();
        this.isSubmitting = false;
        this.showSuccessMessage = true;

        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);

        // Scroll to the new appreciation
        setTimeout(() => {
          const newElement = document.querySelector('.appreciation-card:first-child');
          if (newElement) {
            newElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      } catch (error) {
        console.error('Error saving testimonial:', error);
        this.isSubmitting = false;
        // You could show an error message here
      }
    }
  }

  private loadAppreciations(): void {
    this.testimonialService.testimonials$.subscribe(testimonials => {
      this.appreciations = testimonials;
    });
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private scrollToAppreciations(): void {
    const element = document.querySelector('.appreciations-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  getUserInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getCardClass(index: number): string {
    const classes = ['card-green', 'card-pink', 'card-blue', 'card-orange'];
    return classes[index % classes.length];
  }

  getCardTitle(index: number): string {
    const titles = [
      'A master of frontend development with a keen design sensibility',
      'A frontend developer who transforms visions into reality',
      'An exceptional full-stack developer with great attention to detail',
      'A skilled developer who brings creativity to every project'
    ];
    return titles[index % titles.length];
  }
}
