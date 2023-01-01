import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards';
import {ChallengeCreateComponent, ExploreComponent, MyListComponent} from './pages';
import {ChallengeComponent} from "./pages/challenge/challenge.component";

const routes: Routes = [
  { path: 'app/explore', component: ExploreComponent, canActivate: [AuthGuard] },
  { path: 'app/mylist', component: MyListComponent, canActivate: [AuthGuard] },
  { path: 'app/create', component: ChallengeCreateComponent, canActivate: [AuthGuard] },
  { path: 'app/challenge/:id', component: ChallengeComponent },
  { path: 'app/challenge/:id/:tab', component: ChallengeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }
