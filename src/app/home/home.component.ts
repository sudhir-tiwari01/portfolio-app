import { Component } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ContactDialogService } from '../services/contact-dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private contactDialogService: ContactDialogService,
    private snackBar: MatSnackBar
  ) {}

  public email: string = "sudhirtiwari1998@gmail.com";

  copyEmail() {
    navigator.clipboard.writeText(this.email).then(() => {
      this.snackBar.open("Email copied to clipboard!", "", {
        duration: 2000,
      });
    });
  }

  openContactDialog(): void {
    this.contactDialogService.openContactDialog();
  }
}
