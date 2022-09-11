import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ChallengeModule } from '../challenge/challenge.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCardComponent } from './components';


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
