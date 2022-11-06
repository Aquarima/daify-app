import {Component, ComponentRef, HostListener, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {AuthService, SystemAlert} from './core';
import {ProfileService} from './core/services/profile.service';
import {AlertHandlingService} from "./core/services/alert-handling.service";
import {AlertBoxComponent} from "./shared";
import {Subscription} from "rxjs";
import {EMPTY_SUBSCRIPTION} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private alertSubscription: Subscription = EMPTY_SUBSCRIPTION;

  private isAlertDisplayed: boolean = false;

  constructor(
    private alertHandlingService: AlertHandlingService,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService,
    private profileService: ProfileService) {
  }

  ngOnInit(): void {
    /*this.authService.logoutEvent$.subscribe(state => {
      if (state) this.setOnline(false);
    })
    this.setOnline(true);*/
    this.alertSubscription = this.alertHandlingService.alert
      .subscribe((alert) => {
        if (this.isAlertDisplayed) return;
        const cRef = this.createAlertComponent(alert);
        setTimeout(() => {
          cRef.destroy();
          this.isAlertDisplayed = false;
        }, 16000);
        this.isAlertDisplayed = true;
      })
  }

  private createAlertComponent(alert: SystemAlert) {
    const componentRef = this.viewContainerRef.createComponent(AlertBoxComponent);
    componentRef.instance.closeEvent.subscribe(() => componentRef.destroy());
    componentRef.instance.alert = alert;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    //this.setOnline(false);
  }

  private setOnline(online: boolean) {
    const profile = this.authService.user?.profile;
    if (!profile || profile.online) return;
    profile.online = online;
    profile.lastTimeOnline = new Date();
    this.profileService.updateProfile(profile).subscribe();
  }
}
