import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'dfy-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss']
})
export class CustomCheckboxComponent implements OnInit {

  @Input() control!: AbstractControl<boolean>;

  constructor() { }

  ngOnInit(): void {
  }

  onToggle() {
    const checked: boolean = this.control.value;
    this.control.setValue(!checked);
  }
}
