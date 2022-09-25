import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, MaintenanceComponent } from './pages';

const routes: Routes = [
  {path: '', component: HomeComponent}, 
  {path: 'app', component: HomeComponent}, 
  /*loadChildren: () => import('./home.module').then(m => m.HomeModule), canLoad: [MaintenanceGuard] }*/
  {path: 'info', component: MaintenanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
