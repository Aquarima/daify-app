import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ReportType} from "../../../../core";

@Component({
    selector: 'app-member-report',
    templateUrl: './member-report.component.html',
    styleUrls: ['./member-report.component.scss']
})
export class MemberReportComponent implements OnInit {

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

    get reportTypes(): {key: string, value: number}[] {
        return [{key: 'Insult', value: ReportType.INSULT}];
    }
}
