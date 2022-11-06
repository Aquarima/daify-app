import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChallengeFilterPipe, ChallengeTagsCollectorPipe, OrderByChallengePipe} from './pipes';
import {AlertBoxComponent, InboxComponent} from "./components";

@NgModule({
    declarations: [
        OrderByChallengePipe,
        ChallengeTagsCollectorPipe,
        ChallengeFilterPipe,
        InboxComponent,
        AlertBoxComponent
    ],
    imports: [
        CommonModule
    ], exports: [
        ChallengeTagsCollectorPipe,
        ChallengeFilterPipe,
        OrderByChallengePipe,
        InboxComponent,
        AlertBoxComponent
    ]
})
export class SharedModule {
}
