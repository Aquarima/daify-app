import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ReportType} from "../../../../core";

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent implements OnInit {

  @Output() closeEvent: EventEmitter<void> = new EventEmitter();

  reportForm = new FormGroup({
    reportType: new FormControl<ReportType>(ReportType.INSULT),
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
    return [{key: 'Insult', value: ReportType.INSULT}, {key: 'Harassment', value: ''}];
  }
}
