// src/app/services/contact-dialog.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogService } from './contact-dialog.service';

describe('ContactDialogService', () => {
  let service: ContactDialogService;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);

    TestBed.configureTestingModule({
      providers: [
        ContactDialogService,
        { provide: MatDialog, useValue: spy }
      ]
    });

    service = TestBed.inject(ContactDialogService);
    mockDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open contact dialog with default config', () => {
    service.openContactDialog();

    expect(mockDialog.open).toHaveBeenCalledWith(
      jasmine.any(Function),
      jasmine.objectContaining({
        width: '500px',
        panelClass: 'custom-dialog-container'
      })
    );
  });

  it('should open contact dialog with custom config', () => {
    const customConfig = { width: '600px' };
    service.openContactDialog(customConfig);

    expect(mockDialog.open).toHaveBeenCalledWith(
      jasmine.any(Function),
      jasmine.objectContaining({
        width: '600px',
        panelClass: 'custom-dialog-container'
      })
    );
  });

  it('should close all dialogs', () => {
    service.closeAll();
    expect(mockDialog.closeAll).toHaveBeenCalled();
  });
});
