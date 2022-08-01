import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ChallengeModule } from './challenge/challenge.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [ 
    HomeModule,
    ChallengeModule,
  ]
})
export class FeaturesModule { }