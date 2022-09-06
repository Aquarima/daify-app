import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallengeRoutingModule } from './challenge-routing.module';
import { ExploreComponent } from './pages/explore/explore.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyListComponent } from './pages/my-list/my-list.component';
import { OverviewComponent } from './components/overview/overview.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ExploreComponent,
    CardComponent,
    SearchComponent,
    MyListComponent,
    OverviewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ChallengeRoutingModule,
    CoreModule,
    LayoutModule,
    SharedModule,
  ]
})
export class ChallengeModule { }
