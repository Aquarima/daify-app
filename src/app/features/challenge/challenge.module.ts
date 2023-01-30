import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChallengeRoutingModule} from './challenge-routing.module';
import {ChallengeComponent, ChallengeCreateComponent, ExploreComponent, MyListComponent} from './pages';
import {LayoutModule} from 'src/app/layout/layout.module';
import {
  BrowseResultsListComponent,
  ChallengeCardComponent,
  ChallengeSearchComponent,
  InviteFriendsComponent,
  SectionChatsComponent,
  SectionGroupsComponent,
  SectionLeaderboardComponent,
  SectionOverviewComponent,
  SectionSettingsComponent,
} from './components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from 'src/app/core/core.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {CreateGroupComponent} from './components/create-group/create-group.component';
import { MemberKickComponent } from './components/member-kick/member-kick.component';
import { ChallengeShareComponent } from './components/challenge-share/challenge-share.component';
import { MemberReportComponent } from './components/member-report/member-report.component';

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
    CreateGroupComponent,
    SectionOverviewComponent,
    SectionGroupsComponent,
    SectionChatsComponent,
    SectionLeaderboardComponent,
    SectionSettingsComponent,
    MemberKickComponent,
    ChallengeShareComponent,
    MemberReportComponent
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
export class ChallengeModule {
}
