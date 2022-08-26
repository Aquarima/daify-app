import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceGuard } from 'src/app/core/guards';
import { HomeComponent, MaintenanceComponent } from './pages';

const routes: Routes = [
  {path: '', component: HomeComponent}, 
  /*loadChildren: () => import('./home.module').then(m => m.HomeModule), canLoad: [MaintenanceGuard] }*/
  {path: 'info', component: MaintenanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
