import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {AuthService, SystemAlert} from './core';
import {ProfileService} from './core/services/profile.service';
import {AlertHandlingService} from "./core/services/alert-handling.service";
import {AlertBoxComponent} from "./shared";
import {Subscription} from "rxjs";
import {EMPTY_SUBSCRIPTION} from "rxjs/internal/Subscription";
import {Router} from "@angular/router";
import {UserService} from "./core/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private alertSubscription: Subscription = EMPTY_SUBSCRIPTION;

  private isAlertDisplayed: boolean = false;

  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private alertHandlingService: AlertHandlingService,
    private authService: AuthService,
    private userService: UserService,
    private profileService: ProfileService) {
  }

  ngOnInit(): void {
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
    const loggedUserId = localStorage.getItem('logged_user_id');
    if (!this.authService.isSessionActive() || !loggedUserId) {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.userService.getUserById(Number.parseInt(loggedUserId))
      .subscribe({
        next: (user: any) => this.authService.user$.next(user),
        error: () => {}
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
}
