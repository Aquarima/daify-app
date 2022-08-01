import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangsComponent } from './components/langs/langs.component';
import { NotificationsComponent } from './components/notifications/notifications.component';



@NgModule({
  declarations: [
    LangsComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
