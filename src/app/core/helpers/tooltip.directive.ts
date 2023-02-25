import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit {

  @Input('tooltip') tooltipText: string = '';
  @Input('tooltipEnabled') tooltipEnabled: boolean = true;

  private tooltipElement: HTMLElement | undefined;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.classList.add('tooltip-owner');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.createTooltip();
    if (!this.tooltipElement) return;
    this.tooltipElement.style.opacity = '1';
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (!this.tooltipElement) return;
    this.tooltipElement.style.opacity = '0';
  }

  private createTooltip() {
    if (!this.tooltipElement && this.tooltipEnabled) {
      this.tooltipElement = document.createElement('div');
      this.tooltipElement.classList.add('tooltip');
      this.tooltipElement.textContent = this.tooltipText;
      this.elementRef.nativeElement.appendChild(this.tooltipElement);
    }
  }
}
