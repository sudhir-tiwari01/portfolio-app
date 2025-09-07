import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { MoreComponent } from './more/more.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { AboutComponent } from './about/about.component';
import { ContactService } from './services/contact.service';
import { ContactDialogService } from './services/contact-dialog.service';
import { ExperienceComponent } from './experience/experience.component';
import { WorkComponent } from './work/work.component';
import { SectionEndingComponent } from './section-ending/section-ending.component';
import { ContentShowcaseComponent } from './content-showcase/content-showcase.component';
import { ExploreSectionComponent } from './explore-section/explore-section.component';
import { MoreUtilitiesModule } from './more-utilities/more-utilities.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoreComponent,
    ContactDialogComponent,
    NavbarComponent,
    LoaderComponent,
    AboutComponent,
    ExperienceComponent,
    WorkComponent,
    SectionEndingComponent,
    ContentShowcaseComponent,
    ExploreSectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MoreUtilitiesModule
  ],
  providers: [ContactService, ContactDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }