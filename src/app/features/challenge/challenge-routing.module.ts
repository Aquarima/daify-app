import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards';
import { ExploreComponent, MyListComponent } from './pages';

const routes: Routes = [
  { path: 'challenge/explore', component: ExploreComponent, canActivate: [AuthGuard] },
  { path: 'challenge/mylist', component: MyListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }
