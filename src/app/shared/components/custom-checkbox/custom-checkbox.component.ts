import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'dfy-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss']
})
export class CustomCheckboxComponent implements OnInit {

  @Input() control!: FormControl<boolean | null>;
  @Input() disabled: boolean = false;
  @Input() label: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onToggle() {
    if (!this.disabled) {
      const checked = this.control.value;
      this.control.setValue(!checked);
    }
  }
}
