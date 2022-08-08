import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  @HostListener('document:keyup.escape')
  onClose() {
    this.closeEvent.emit();
  }
}
