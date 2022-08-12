import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from '../shared/components';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
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
