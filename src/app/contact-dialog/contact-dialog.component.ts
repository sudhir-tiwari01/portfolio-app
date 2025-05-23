import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Register our three SVG icons so <mat-icon svgIcon="linkedin"> works
    this.iconRegistry.addSvgIcon(
      "linkedin",
      this.sanitizer.bypassSecurityTrustResourceUrl("assets/svg-icons/icons8-linkedin.svg")
    );
    this.iconRegistry.addSvgIcon(
      "github",
      this.sanitizer.bypassSecurityTrustResourceUrl("assets/svg-icons/icons8-github.svg")
    );
    this.iconRegistry.addSvgIcon(
      "twitter",
      this.sanitizer.bypassSecurityTrustResourceUrl("assets/svg-icons/icons8-twitter-bird.svg")
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }

  protected readonly window = window;
}
