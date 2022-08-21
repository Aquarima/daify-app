import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ExploreComponent } from './pages';
import { MyListComponent } from './pages/my-list/my-list.component';

const routes: Routes = [
  { path: 'challenge/explore', component: ExploreComponent },
  { path: 'challenge/mylist', component: MyListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }
