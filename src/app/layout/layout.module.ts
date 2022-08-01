import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LangsComponent, NotificationsComponent } from '../shared/components';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LangsComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent, 
    FooterComponent,
  ],
})
export class LayoutModule { }
