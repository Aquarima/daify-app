import {Component, Inject, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {AuthService, SystemAlert, Theme, User} from './core';
import {ProfileService} from './core/services/user/profile.service';
import {AlertHandlingService} from "./core/services/system/alert-handling.service";
import {AlertBoxComponent} from "./shared";
import {Subscription} from "rxjs";
import {EMPTY_SUBSCRIPTION} from "rxjs/internal/Subscription";
import {Router} from "@angular/router";
import {UserService} from "./core/services/user/user.service";
import {AlertType} from "./core/models/system-alert";
import {ThemeService} from "./core/services/system/theme.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  alertSubscription: Subscription = EMPTY_SUBSCRIPTION;
  isAlertDisplayed: boolean = false;
  showSplashScreen: boolean = true;

  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private alertHandlingService: AlertHandlingService,
    private themeService: ThemeService,
    private authService: AuthService,
    private userService: UserService,
    private profileService: ProfileService,
    @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.themeService.change.subscribe((theme) => {
      if (theme === Theme.DARK) this.document.body.classList.add('theme-dark');
      else this.document.body.classList.remove('theme-dark');
    });
    this.themeService.updateTheme(Theme.DARK);
    setTimeout(() => {
      this.showSplashScreen = false;
    }, 3000);
    this.alertSubscription = this.alertHandlingService.alert
      .subscribe((alert) => {
        if (this.isAlertDisplayed) return;
        const cRef = this.createAlertComponent(alert);
        setTimeout(() => {
          cRef.destroy();
          this.isAlertDisplayed = false;
        }, 20000);
        this.isAlertDisplayed = true;
      })
    const loggedUserId = localStorage.getItem('logged_user_id');
    if (!this.authService.isSessionActive() || !loggedUserId) {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.userService.getUserById(Number.parseInt(loggedUserId))
      .subscribe({
        next: (user: User) => {
          this.authService.user$.next(user);
          //this.authService.setOnlineStatus(true);
        },
        error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Something wrong occurred!', err.error.message)
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
    this.authService.setOnlineStatus(true);
    this.alertSubscription.unsubscribe();
  }
}
