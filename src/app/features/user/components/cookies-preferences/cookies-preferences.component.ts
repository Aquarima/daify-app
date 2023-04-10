import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {cookiesPreferencesForm} from "../../../../core/helpers";

@Component({
  selector: 'dfy-cookies-preferences',
  templateUrl: './cookies-preferences.component.html',
  styleUrls: ['./cookies-preferences.component.scss']
})
export class CookiesPreferencesComponent implements OnInit {

  @Output() closeEvent: EventEmitter<void> = new EventEmitter();
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();

  cookiesPreferencesForm = cookiesPreferencesForm;

  constructor() {
  }

  ngOnInit(): void {
  }

  @HostListener('document:keyup.escape')
  onCancel() {
    this.closeEvent.emit();
  }

  onCreate() {
    this.confirmEvent.emit();
  }
}
