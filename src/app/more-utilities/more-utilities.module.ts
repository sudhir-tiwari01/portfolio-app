import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MoreUtilitiesDropdownComponent } from './more-utilities-dropdown/more-utilities-dropdown.component';
import { GuestbookComponent } from './guestbook/guestbook.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { LinksComponent } from './links/links.component';
import { UsesComponent } from './uses/uses.component';
import { AttributionComponent } from './attribution/attribution.component';

const routes = [
  { path: 'guestbook', component: GuestbookComponent },
  { path: 'appreciation', component: BucketListComponent },
  { path: 'links', component: LinksComponent },
  { path: 'uses', component: UsesComponent },
  { path: 'attribution', component: AttributionComponent }
];

@NgModule({
  declarations: [
    MoreUtilitiesDropdownComponent,
    GuestbookComponent,
    BucketListComponent,
    LinksComponent,
    UsesComponent,
    AttributionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MoreUtilitiesDropdownComponent
  ]
})
export class MoreUtilitiesModule { }
