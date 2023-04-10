import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {RouterModule} from '@angular/router';
import {LayoutModule} from './layout/layout.module';
import {FeaturesModule} from './features/features.module';
import {CookieModule} from 'ngx-cookie';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    CookieModule.withOptions(),
    ReactiveFormsModule,
    CoreModule,
    FeaturesModule,
    LayoutModule,
    SharedModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
