import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[customFocus]'
})
export class CustomInputFocusDirective {

  @Input('customFocus') class = "user-input-active"

  constructor(private el: ElementRef) {
  }

  @HostListener('focus')
  addClass() {
    this.el.nativeElement.parentNode.classList.add(this.class)
  }

  @HostListener('blur')
  removeClass() {
    const value = this.el.nativeElement.value.trim();
    if (value.length !== 0) return;
    this.el.nativeElement.parentNode.classList.remove(this.class)
  }
}
