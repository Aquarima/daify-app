import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {AlertType} from "../../../core/models/system-alert";

@Component({
  selector: 'dfy-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {

  @Input() options: {type: AlertType, message: string} = {type: AlertType.NONE, message: ''};

  constructor(private ref: ElementRef) { }

  ngOnInit(): void {

  }

  isNone() {
    return this.options.type === AlertType.NONE;
  }

  isInfo(): boolean {
    return this.options.type === AlertType.INFO;
  }

  isWarn(): boolean {
    return this.options.type === AlertType.WARN;
  }

  isError(): boolean {
    return this.options.type === AlertType.ERROR;
  }

  isSuccess(): boolean {
    return this.options.type === AlertType.SUCCESS;
  }
}
