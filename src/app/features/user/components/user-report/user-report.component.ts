import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent implements OnInit {

  @Output() closeEvent: EventEmitter<void> = new EventEmitter();

  reportForm = new FormGroup({
    reportType: new FormControl(),
    details: new FormControl<string>('')
  })

  constructor() {
  }

  ngOnInit(): void {
  }

  onClose() {
    this.closeEvent.emit();
  }

  onSend() {

  }

  get reportTypes(): {key: string, value: any}[] {
    return [{key: 'Insult', value: ''}];
  }
}
