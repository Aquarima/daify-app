import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallengeRoutingModule } from './challenge-routing.module';
import { ExploreComponent } from './pages/explore/explore.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ChallengeCardComponent } from './components/challenge-card/challenge-card.component';
import { ChallengeSearchComponent } from './components/challenge-search/challenge-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyListComponent } from './pages/my-list/my-list.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowseResultsListComponent } from './components/browse-results-list/browse-results-list.component';

@NgModule({
  declarations: [
    ExploreComponent,
    ChallengeCardComponent,
    ChallengeSearchComponent,
    MyListComponent,
    BrowseResultsListComponent,
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
