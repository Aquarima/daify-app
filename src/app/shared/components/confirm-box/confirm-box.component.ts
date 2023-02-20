import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'dfy-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {

  @Input() title: string = '';
  @Input() message: string = '';

  @Output() cancelEvent: EventEmitter<void> = new EventEmitter();
  @Output() confirmEvent: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onCancel() {
    this.cancelEvent.emit();
  }

  onConfirm() {
    this.confirmEvent.emit();
  }
}
