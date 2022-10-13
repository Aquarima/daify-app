import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards';
import {ChallengeCreateComponent, ExploreComponent, MyListComponent} from './pages';

const routes: Routes = [
  { path: 'app/challenge/explore', component: ExploreComponent, canActivate: [AuthGuard] },
  { path: 'app/challenge/mylist', component: MyListComponent, canActivate: [AuthGuard] },
  { path: 'app/challenge/create', component: ChallengeCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }
