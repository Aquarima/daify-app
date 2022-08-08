import { Component, ElementRef, HostListener, OnInit, ViewContainerRef } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { LangsComponent, NotificationsComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  currentLang = '';
  
  constructor(private elementRef: ElementRef, private viewContainerRef: ViewContainerRef, private cookies: CookieService) { }

  ngOnInit(): void {
    const lang = this.cookies.get('lang');
    this.currentLang = (lang) ? lang : 'EN';
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {
    if($event) {
      if (window.pageYOffset > 0) {
        this.elementRef.nativeElement.classList.add('viewstyle-opaque');
        return;
      }
      this.elementRef.nativeElement.classList.remove('viewstyle-opaque');
    }
  }

  onDisplayLangs() {
    const componentRef = this.viewContainerRef.createComponent(LangsComponent);
    componentRef.instance.closeEvent.subscribe(() => {
      this.viewContainerRef.clear();
    });
  }

  onDisplayNotifications() {
    const componentRef = this.viewContainerRef.createComponent(NotificationsComponent);
    componentRef.instance.closeEvent.subscribe(() => {
      this.viewContainerRef.clear();
    });
  }
}