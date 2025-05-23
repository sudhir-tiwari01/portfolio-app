// src/app/app.module.ts

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HomeComponent } from "./home/home.component";
import { MoreComponent } from "./more/more.component";
import { ContactDialogComponent } from "./contact-dialog/contact-dialog.component";

import { MatSnackBarModule } from "@angular/material/snack-bar";

// FullCalendar module (no registerPlugins call here)
import { FullCalendarModule } from "@fullcalendar/angular";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoreComponent,
    ContactDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FullCalendarModule,   // just import, don’t call registerPlugins
    FormsModule,          // for [(ngModel)]
    MatSnackBarModule,    // for snack bars
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
