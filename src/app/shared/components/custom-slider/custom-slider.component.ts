import {Component, Input, OnInit} from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

  onDecrease() {

  }

  onIncrease() {

  }
}
