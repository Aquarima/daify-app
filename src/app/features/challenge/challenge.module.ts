import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallengeRoutingModule } from './challenge-routing.module';
import { ExploreComponent } from './pages/explore/explore.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    ExploreComponent,
    CardComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ChallengeRoutingModule,
    LayoutModule,
  ]
})
export class ChallengeModule { }
