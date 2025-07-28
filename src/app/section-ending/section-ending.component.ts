// src/app/section-ending/section-ending.component.ts

import { Component } from '@angular/core';
import { ContactDialogService } from '../services/contact-dialog.service';

@Component({
  selector: 'app-section-ending',
  templateUrl: './section-ending.component.html',
  styleUrls: ['./section-ending.component.css'],
})
export class SectionEndingComponent {

  constructor(private contactDialogService: ContactDialogService) {}

  openContactDialog(): void {
    this.contactDialogService.openContactDialog();
  }
}
