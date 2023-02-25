import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent, MaintenanceComponent, ResourceNotFoundComponent} from './pages';
import {LayoutModule} from 'src/app/layout/layout.module';

@NgModule({
  declarations: [
    HomeComponent, MaintenanceComponent, ResourceNotFoundComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule {
}
