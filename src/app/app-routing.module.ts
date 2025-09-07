import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MoreComponent} from "./more/more.component";
import {AboutComponent} from "./about/about.component";
import {WorkComponent} from "./work/work.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'more', component: MoreComponent},
  {path :'about', component: AboutComponent},
  {path : 'work', component: WorkComponent},
  {
    path: '',
    loadChildren: () => import('./more-utilities/more-utilities.module').then(m => m.MoreUtilitiesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
