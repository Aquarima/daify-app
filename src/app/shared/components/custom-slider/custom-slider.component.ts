import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'dfy-custom-slider',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.scss']
})
export class CustomSliderComponent implements OnInit {

  @Input() min: number = 1;
  @Input() max: number = 1;
  @Input() step: number = 1;
  @Input() control!: AbstractControl<number>;

  @ViewChild('bar') barNode!: ElementRef;
  @ViewChild('cursor') cursorNode!: ElementRef;

  private isMouseDown: boolean = false;

  ngOnInit() {
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isMouseDown = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown) {
      return;
    }
    const cursor = this.cursorNode.nativeElement as HTMLElement;
    const bar = this.barNode.nativeElement as HTMLElement;
    const barStart = bar.getBoundingClientRect().left;
    const barWidth = bar.offsetWidth;
    const cursorWidth = cursor.offsetWidth;
    let cursorLeft = event.clientX - barStart - cursorWidth / 2;

    cursorLeft = this.clamp(cursorLeft, 0, barWidth - cursorWidth);
    const value = this.min + (this.max - this.min) * cursorLeft / (barWidth - cursorWidth);
    this.control.setValue(Math.round(value / this.step) * this.step);
    cursor.style.left = cursorLeft + 'px';
  }

  startMove(event: MouseEvent) {
    this.isMouseDown = true;
    this.onMouseMove(event);
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}
