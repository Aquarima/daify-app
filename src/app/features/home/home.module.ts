import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent, MaintenanceComponent} from './pages';
import {LayoutModule} from 'src/app/layout/layout.module';

@NgModule({
  declarations: [
    HomeComponent, MaintenanceComponent,
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
