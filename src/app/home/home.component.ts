import { Component } from '@angular/core';
import {ContactDialogComponent} from "../contact-dialog/contact-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  public email: string = "sudhirtiwari1998@gmail.com";
  public showModal: boolean = false;

  copyEmail() {
    navigator.clipboard.writeText(this.email).then(() => {
      this.snackBar.open("Email copied to clipboard!", "", {
        duration: 2000,
      });
    });
  }

  openContactDialog(): void {
    this.dialog.open(ContactDialogComponent, {
      width: "500px",
      panelClass: "custom-dialog-container",
      // data: { any data you want to pass into the dialog }
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
