import {AfterViewInit, Directive, ElementRef, HostListener, Input} from '@angular/core';
import {Observable} from "rxjs";

@Directive({
  selector: '[customFocus]'
})
export class CustomInputFocusDirective implements AfterViewInit {

  @Input('customFocus') class = "user-input-active"

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    const valueObservable = new Observable(observer => {
      const intervalId = setInterval(() => {
        if (this.el.nativeElement.value) {
          observer.next(this.el.nativeElement.value);
          observer.complete();
          clearInterval(intervalId);
        }
      }, 10);
    });
    valueObservable.subscribe((value: any) => {
      if (value.trim().length === 0) return;
      this.el.nativeElement.parentNode.classList.add(this.class);
    });
  }

  @HostListener('focus')
  addClass() {
    this.el.nativeElement.parentNode.classList.add(this.class);
  }

  @HostListener('blur')
  removeClass() {
    const value = this.el.nativeElement.value.trim();
    if (value.length !== 0) return;
    this.el.nativeElement.parentNode.classList.remove(this.class);
  }
}
