import {AfterViewInit, Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'dfy-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
      @Inject(DOCUMENT) private document: Document,
      private renderer: Renderer2,
      private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.renderer.addClass(this.document.body, 'no-scroll');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'no-scroll');
  }
}
