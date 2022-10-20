import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChallengeFilterPipe, ChallengeTagsCollectorPipe, OrderByChallengePipe} from './pipes';
import {InboxComponent} from "./components";

@NgModule({
    declarations: [
        OrderByChallengePipe,
        ChallengeTagsCollectorPipe,
        ChallengeFilterPipe,
        InboxComponent
    ],
    imports: [
        CommonModule
    ], exports: [
        ChallengeTagsCollectorPipe,
        ChallengeFilterPipe,
        OrderByChallengePipe,
        InboxComponent
    ]
})
export class SharedModule {
}
