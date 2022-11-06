import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {SystemAlert} from "../../../core";

@Component({
  selector: 'dfy-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit, AfterViewInit {

  @Output('closeEvent') closeEvent: EventEmitter<void> = new EventEmitter();

  alert: SystemAlert = {} as SystemAlert;

  constructor(private ref: ElementRef) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.ref.nativeElement.classList.add(`alert-${this.alert.type}`)
  }

  onClose() {
    this.closeEvent.emit();
  }
}

export enum AlertType {
  INFO, WARN, ERROR
}
