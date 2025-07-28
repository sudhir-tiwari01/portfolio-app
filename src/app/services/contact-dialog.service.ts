// src/app/services/contact-dialog.service.ts

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ContactDialogService {

  constructor(private dialog: MatDialog) {}

  /**
   * Opens the contact dialog with consistent styling and configuration
   * @param customConfig Optional custom configuration to override defaults
   */
  openContactDialog(customConfig?: any) {
    const defaultConfig = {
      width: '500px',
      panelClass: ['custom-dialog-container', 'no-border-dialog'],
      disableClose: false,
      hasBackdrop: true,
      backdropClass: 'custom-backdrop'
    };

    const config = { ...defaultConfig, ...customConfig };

    return this.dialog.open(ContactDialogComponent, config);
  }

  /**
   * Closes all open dialogs
   */
  closeAll() {
    this.dialog.closeAll();
  }
}
