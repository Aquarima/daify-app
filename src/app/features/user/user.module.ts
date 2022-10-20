import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './pages';
import { ChallengeModule } from '../challenge/challenge.module';
import { UserListComponent, UserCardComponent } from './components';
import { LayoutModule } from "../../layout/layout.module";

@NgModule({
  declarations: [
    ProfileComponent,
    UserCardComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    LayoutModule,
    ChallengeModule
  ]
})
export class UserModule { }
