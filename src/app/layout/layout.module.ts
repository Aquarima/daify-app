import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import {SharedModule} from "../shared/shared.module";
import {SplashScreenComponent} from "./splash-screen/splash-screen.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SplashScreenComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
    ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SplashScreenComponent
  ],
})
export class LayoutModule { }
