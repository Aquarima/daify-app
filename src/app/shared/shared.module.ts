import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChallengeFilterPipe, ChallengeThemesCollectorPipe, MembersFilterPipe, OrderByChallengePipe} from './pipes';
import {
  AlertBoxComponent,
  ConfirmBoxComponent,
  CustomCheckboxComponent,
  CustomSelectComponent,
  CustomSliderComponent,
  InboxComponent,
  ValidationMessageComponent
} from "./components";
import {ReactiveFormsModule} from "@angular/forms";
import {NotificationPipe} from './pipes/notification.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    OrderByChallengePipe,
    ChallengeThemesCollectorPipe,
    ChallengeFilterPipe,
    InboxComponent,
    AlertBoxComponent,
    CustomSelectComponent,
    CustomCheckboxComponent,
    CustomSliderComponent,
    NotificationPipe,
    ValidationMessageComponent,
    ConfirmBoxComponent,
    MembersFilterPipe,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ], exports: [
    ChallengeThemesCollectorPipe,
    ChallengeFilterPipe,
    OrderByChallengePipe,
    InboxComponent,
    AlertBoxComponent,
    CustomSelectComponent,
    CustomCheckboxComponent,
    CustomSliderComponent,
    ValidationMessageComponent,
    MembersFilterPipe,
    PaginationComponent
  ]
})
export class SharedModule {
}
