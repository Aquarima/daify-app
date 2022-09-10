import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ChallengeModule } from './challenge/challenge.module';
import { AuthModule } from './auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  exports: [ 
    HomeModule,
    AuthModule,
    ChallengeModule,
    UserModule,
  ],
})
export class FeaturesModule { }