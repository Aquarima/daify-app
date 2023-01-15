import {AfterViewInit, Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[customFocus]'
})
export class CustomInputFocusDirective implements AfterViewInit {

  @Input('customFocus') class = "user-input-active"

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    const value = this.el.nativeElement.value.trim();
    if (value.length === 0) return;
    this.el.nativeElement.parentNode.classList.add(this.class);
  }

  @HostListener('focus')
  addClass() {
    this.el.nativeElement.parentNode.classList.add(this.class);
  }

  @HostListener('blur')
  removeClass() {
    const value = this.el.nativeElement.value.trim();
    if (value.length !== 0 || this.el.nativeElement.type.contains('date')) return;
    this.el.nativeElement.parentNode.classList.remove(this.class);
  }
}
