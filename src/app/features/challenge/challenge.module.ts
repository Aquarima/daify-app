import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallengeRoutingModule } from './challenge-routing.module';
import { ExploreComponent, ChallengeCreateComponent, MyListComponent } from './pages';
import { LayoutModule } from 'src/app/layout/layout.module';
import {
    ChallengeCardComponent,
    ChallengeSearchComponent,
    BrowseResultsListComponent,
    InviteFriendsComponent,
    SectionGroupsComponent, SectionChatsComponent
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChallengeComponent } from './pages';
import { CreateGroupComponent } from './components/create-group/create-group.component';

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
        SectionGroupsComponent,
        SectionChatsComponent,
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
