import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChallengeFilterPipe, ChallengeThemesCollectorPipe, OrderByChallengePipe} from './pipes';
import {AlertBoxComponent, CustomSelectComponent, InboxComponent} from "./components";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomCheckboxComponent, CustomSliderComponent} from './components';
import { NotificationPipe } from './pipes/notification.pipe';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

@NgModule({
    declarations: [
        OrderByChallengePipe,
        ChallengeThemesCollectorPipe,
        ChallengeFilterPipe,
        InboxComponent,
        AlertBoxComponent,
        CustomSelectComponent,
        CustomCheckboxComponent,
        CustomSliderComponent,
        NotificationPipe,
        ValidationMessageComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ], exports: [
        ChallengeThemesCollectorPipe,
        ChallengeFilterPipe,
        OrderByChallengePipe,
        InboxComponent,
        AlertBoxComponent,
        CustomSelectComponent,
        CustomCheckboxComponent,
        CustomSliderComponent,
        ValidationMessageComponent
    ]
})
export class SharedModule {
}
