import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByChallengePipe } from './pipes/order-by-challenge.pipe';



@NgModule({
  declarations: [
    OrderByChallengePipe,
  ],
  imports: [
    CommonModule
  ], exports: [
    OrderByChallengePipe,
  ]
})
export class SharedModule { }
