import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {ProfileComponent} from './pages';
import {ChallengeModule} from '../challenge/challenge.module';
import {UserCardComponent, UserListComponent} from './components';
import {LayoutModule} from "../../layout/layout.module";
import { UserReportComponent } from './components/user-report/user-report.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../../core/core.module";
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UserCardComponent,
    UserListComponent,
    UserReportComponent,
    UserSettingsComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        LayoutModule,
        ChallengeModule,
        SharedModule,
        ReactiveFormsModule,
        CoreModule
    ]
})
export class UserModule {
}
