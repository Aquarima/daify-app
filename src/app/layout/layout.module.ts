import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import {SharedModule} from "../shared/shared.module";
import {SplashScreenComponent} from "./splash-screen/splash-screen.component";
import { AcceptCookiesComponent } from './accept-cookies/accept-cookies.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SplashScreenComponent,
    AcceptCookiesComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
    ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SplashScreenComponent,
    AcceptCookiesComponent
  ],
})
export class LayoutModule { }
