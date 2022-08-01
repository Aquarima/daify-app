import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-langs',
  templateUrl: './langs.component.html',
  styleUrls: ['./langs.component.scss']
})
export class LangsComponent implements OnInit {

  constructor(private cookies: CookieService) { }

  ngOnInit(): void { }

  hideOverlay() {
    const langsNode = document.querySelector('app-langs');
    if (!langsNode) return;
    langsNode.classList.remove('langs-overlay-visible');
  }

  enableScrollBar() {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'auto';
    }
  }

  defineAppLang(lang: string) {
    this.cookies.put('lang', lang);
    window.location.reload();
  }
}
