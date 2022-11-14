import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChallengeFilterPipe, ChallengeThemesCollectorPipe, OrderByChallengePipe} from './pipes';
import {AlertBoxComponent, InboxComponent} from "./components";
import {SelectComponent} from './components/select/select.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    OrderByChallengePipe,
    ChallengeThemesCollectorPipe,
    ChallengeFilterPipe,
    InboxComponent,
    AlertBoxComponent,
    SelectComponent
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
    SelectComponent
  ]
})
export class SharedModule {
}
