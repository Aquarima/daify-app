import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeService } from './services/challenge.service';

@NgModule({
  declarations: [],
  providers: [
    ChallengeService,
  ],
  imports: [
    CommonModule,
  ]
})
export class CoreModule { }
