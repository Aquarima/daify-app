import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-langs',
  templateUrl: './langs.component.html',
  styleUrls: ['./langs.component.scss']
})
export class LangsComponent implements OnInit {

  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef, private cookies: CookieService) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.closest('body').style.overflow = 'hidden';
  }

  updateCurrentLang(lang: string) {
    this.cookies.put('lang', lang);
    window.location.reload();
  }

  @HostListener('document:keyup.escape')
  onClose() {
    this.elementRef.nativeElement.closest('body').style.overflow = 'auto';
    this.closeEvent.emit();
  }
}
