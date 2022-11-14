import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'dfy-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() formControl: FormControl<string> = new FormControl();
  @Input() data: {key: any, value: any}[] = [];

  currentValue: any;

  constructor() { }

  ngOnInit(): void {
    this.formControl.disable();
    this.currentValue = this.formControl.value;
  }

  onItemSelect(value: string) {
    this.formControl.setValue(value);
    this.currentValue = this.data.find(item => item.value === value)?.key;
  }
}
