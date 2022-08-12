import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './pages';
import { MyListComponent } from './pages/my-list/my-list.component';

const routes: Routes = [
  { path: 'challenge/explore', component: ExploreComponent },
  { path: 'challenge/mylist', component: MyListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }
