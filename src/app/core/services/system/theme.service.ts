import {EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {Theme} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnInit {

  @Output() change: EventEmitter<Theme> = new EventEmitter<Theme>();

  private theme: Theme = Theme.LIGHT;

  constructor() {
  }

  ngOnInit() {
    this.theme = JSON.parse(localStorage.getItem('selectedTheme') || Theme.LIGHT);
    this.change.subscribe(theme => {
      localStorage.setItem('selectedTheme', theme);
      this.theme = theme;
    });
  }

  updateTheme(theme: Theme) {
    this.change.emit(theme);
  }

  get currentTheme() {
    return this.theme;
  }
}
