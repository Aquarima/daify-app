import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent, MaintenanceComponent} from './pages';
import {LayoutModule} from 'src/app/layout/layout.module';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';

@NgModule({
  declarations: [
    HomeComponent, MaintenanceComponent, SplashScreenComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
  ],
  exports: [
    HomeComponent,
    SplashScreenComponent,
  ]
})
export class HomeModule {
}
