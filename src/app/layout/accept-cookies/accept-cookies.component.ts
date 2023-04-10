import {Component, EventEmitter, OnInit, Output, ViewContainerRef} from '@angular/core';
import {CookieService} from "ngx-cookie";
import {PopupService} from "../../core";

@Component({
  selector: 'dfy-accept-cookies',
  templateUrl: './accept-cookies.component.html',
  styleUrls: ['./accept-cookies.component.scss']
})
export class AcceptCookiesComponent implements OnInit {

  @Output() closeEvent: EventEmitter<void> = new EventEmitter();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cookies: CookieService,
    private popupService: PopupService,
  ) {
    popupService.setViewContainerRef(viewContainerRef);
  }

  ngOnInit(): void {
  }

  onManageCookies() {
    this.popupService.createCookiesPreferencesModal(() => {
      this.cookies.put('cookies_preferences', '');
      this.onClose();
    });
  }

  onAcceptCookies() {
    this.cookies.put('cookies_preferences', '');
    this.onClose();
  }

  onClose() {
    this.closeEvent.emit();
  }
}
