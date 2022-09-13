import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByChallengePipe } from './pipes/order-by-challenge.pipe';
import { ChallengeTagsCollectorPipe } from './pipes/challenge-tags-collector.pipe';



@NgModule({
  declarations: [
    OrderByChallengePipe,
    ChallengeTagsCollectorPipe,
  ],
  imports: [
    CommonModule
  ], exports: [
    OrderByChallengePipe,
    ChallengeTagsCollectorPipe
  ]
})
export class SharedModule { }
