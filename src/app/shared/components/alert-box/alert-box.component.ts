import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {SystemAlert} from "../../../core";
import {AlertType} from "../../../core/models/system-alert";

@Component({
  selector: 'dfy-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit, AfterViewInit {

  @Output('closeEvent') closeEvent: EventEmitter<void> = new EventEmitter();

  alert: SystemAlert = {type: AlertType.NONE, title: '', message: ''};

  constructor(private ref: ElementRef) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    //this.ref.nativeElement.classList.add(`alert-${this.alert.type}`)
  }

  onClose() {
    this.closeEvent.emit();
  }

  isInfo() {
    return this.alert.type === AlertType.INFO;
  }

  isSuccess() {
    return this.alert.type === AlertType.SUCCESS;
  }

  isWarn() {
    return this.alert.type === AlertType.WARN;
  }

  isError() {
    return this.alert.type === AlertType.ERROR;
  }
}
