import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent, UserSettingsComponent} from './pages';

const routes: Routes = [
  {path: 'app/user/profile/:username', component: ProfileComponent},
  {path: 'app/user/settings', component: UserSettingsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
