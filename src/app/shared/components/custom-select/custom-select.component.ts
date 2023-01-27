import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'dfy-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit {

  @ViewChild('sections') sectionsNode!: ElementRef;

  @Input() control: FormControl<any> = new FormControl();
  @Input() label: string = 'Control';
  @Input() data: {key: any, value: any}[] = [];

  optionsVisible: boolean = false;
  selection: string = '';

  constructor() { }

  ngOnInit() {
    this.control.registerOnChange((val: any) => {
      if (this.data.length === 0) return;
      const dataRef = this.data.find(item => item.value === val);
      this.selection = dataRef ? dataRef.key : this.data[0].key;
    })
    this.selection = this.control.value;
  }

  onItemSelected(item: { key: any; value: any }) {
    this.control.setValue(item.value);
    this.selection = item.key;
    this.setOptionsVisible(false);
  }

  isNotSelected(key: string) {
    return this.selection !== key;
  }

  setOptionsVisible(visible: boolean) {
    this.optionsVisible = visible;
  }
}
