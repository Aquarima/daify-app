import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByChallengePipe } from './pipes/order-by-challenge.pipe';
import { ChallengeTagsCollectorPipe } from './pipes/challenge-tags-collector.pipe';
import { ChallengeFilterPipe } from './pipes/challenge-filter.pipe';



@NgModule({
  declarations: [
    OrderByChallengePipe,
    ChallengeTagsCollectorPipe,
    ChallengeFilterPipe,
  ],
  imports: [
    CommonModule
  ], exports: [
    ChallengeTagsCollectorPipe,
    ChallengeFilterPipe,
    OrderByChallengePipe
  ]
})
export class SharedModule { }
