import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChallengeFilterPipe, ChallengeThemesCollectorPipe, OrderByChallengePipe} from './pipes';
import {AlertBoxComponent, InboxComponent} from "./components";

@NgModule({
    declarations: [
        OrderByChallengePipe,
        ChallengeThemesCollectorPipe,
        ChallengeFilterPipe,
        InboxComponent,
        AlertBoxComponent
    ],
    imports: [
        CommonModule
    ], exports: [
        ChallengeThemesCollectorPipe,
        ChallengeFilterPipe,
        OrderByChallengePipe,
        InboxComponent,
        AlertBoxComponent
    ]
})
export class SharedModule {
}
