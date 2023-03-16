import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChallengeRoutingModule} from './challenge-routing.module';
import {ChallengeComponent, ChallengeCreateComponent, ExploreComponent, MyListComponent} from './pages';
import {LayoutModule} from 'src/app/layout/layout.module';
import {
  BrowseResultsListComponent,
  ChallengeCardComponent,
  ChallengeSearchComponent,
  ChallengeShareComponent,
  InviteFriendsComponent,
  MemberKickComponent,
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
import {MemberBanishComponent} from './components/member-banish/member-banish.component';
import {BanishmentViewComponent} from './components';
import { RatingCriteriaCreateComponent } from './components/rating-criteria-create/rating-criteria-create.component';

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
    MemberBanishComponent,
    BanishmentViewComponent,
    RatingCriteriaCreateComponent,
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
    ChallengeCardComponent,
    SectionSettingsComponent
  ]
})
export class ChallengeModule {
}
