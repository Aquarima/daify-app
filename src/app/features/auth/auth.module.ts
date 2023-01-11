import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        CoreModule
    ],
  exports: [
    LoginComponent,
    SignupComponent
  ]
})
export class AuthModule { }
