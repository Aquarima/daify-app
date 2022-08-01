import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  cLang = '';
  
  constructor(private cookies: CookieService) { }

  ngOnInit(): void {
    const lang = this.cookies.get('lang');
    this.cLang = (lang) ? lang : 'EN';
    const header = document.querySelector('app-header');
    document.addEventListener('scroll', (ev) => {
      if (header !== null) {
        if (window.scrollY === 0) {
          header.classList.remove('viewstyle-opaque');
          return;
        }
        header.classList.add('viewstyle-opaque');
      }
    });
  }

  onLangsClicked() {
    const langsNode = document.querySelector('app-langs');
    if (!langsNode) return;
    langsNode.classList.add('langs-overlay-visible');
    this.enableScrollBar(false);
    this.onEscKeyDown('langs-overlay-visible', langsNode);
  }

  onNotifsClicked() {
    const ntfsNode = document.querySelector('app-notifications');
    if (!ntfsNode) return;
    ntfsNode.classList.add('notifications-overlay-visible');
    this.onEscKeyDown('notifications-overlay-visible', ntfsNode);
  }

  enableScrollBar(bool: boolean) {
    const body = document.querySelector('body');
    if (body) {
      (bool) ? body.style.overflow = 'auto' : body.style.overflow = 'hidden';
    }
  }

  onEscKeyDown(what: string, to: Element) {
    window.onkeydown = (ev: KeyboardEvent): any => {
      if (ev.key === 'Escape' && to) {
        to.classList.remove(what);
        this.enableScrollBar(true);
      }
    }
  }
}