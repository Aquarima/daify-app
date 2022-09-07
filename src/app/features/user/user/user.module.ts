import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ChallengeModule } from '../../challenge/challenge.module';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    LayoutModule,
    ChallengeModule
  ]
})
export class UserModule { }
