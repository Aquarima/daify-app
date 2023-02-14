import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, SignupComponent } from './pages';

const routes: Routes = [
  {path: 'auth', redirectTo: 'auth/login'},
  {path: 'auth/login', component: LoginComponent },
  {path: 'auth/signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
