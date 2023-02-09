import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from 'src/app/core/guards';
import {ChallengeComponent, ChallengeCreateComponent, ExploreComponent, MyListComponent} from './pages';

const routes: Routes = [
  {path: 'app/explore', component: ExploreComponent, canActivate: [AuthGuard]},
  {path: 'app/explore/:search_query', component: ExploreComponent, canActivate: [AuthGuard]},
  {path: 'app/mylist', component: MyListComponent, canActivate: [AuthGuard]},
  {path: 'app/create', component: ChallengeCreateComponent, canActivate: [AuthGuard]},
  {path: 'app/challenge/:id/:tab', component: ChallengeComponent},
  {path: 'app/challenge/:id/settings/:settingsTab', component: ChallengeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule {
}
