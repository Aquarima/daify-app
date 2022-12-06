import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallengeRoutingModule } from './challenge-routing.module';
import { ExploreComponent, ChallengeCreateComponent, MyListComponent } from './pages';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ChallengeCardComponent, ChallengeSearchComponent, BrowseResultsListComponent, InviteFriendsComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChallengeComponent } from './pages/challenge/challenge.component';
import { SectionChatsComponent } from './components/section-chats/section-chats.component';
import { SectionSettingsComponent } from './components/section-settings/section-settings.component';
import { SectionLeaderboardComponent } from './components/section-leaderboard/section-leaderboard.component';
import { SectionOverviewComponent } from './components/section-overview/section-overview.component';
import { SectionGroupsComponent } from './components/section-groups/section-groups.component';

@NgModule({
  declarations: [
    ExploreComponent,
    ChallengeCardComponent,
    ChallengeSearchComponent,
    MyListComponent,
    BrowseResultsListComponent,
    ChallengeCreateComponent,
    InviteFriendsComponent,
    ChallengeComponent,
    SectionChatsComponent,
    SectionSettingsComponent,
    SectionLeaderboardComponent,
    SectionOverviewComponent,
    SectionGroupsComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ChallengeRoutingModule,
        CoreModule,
        LayoutModule,
        SharedModule,
    ],
  exports: [
    BrowseResultsListComponent,
    ChallengeCardComponent
  ]
})
export class ChallengeModule { }
