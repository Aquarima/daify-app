import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-challenge-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  @HostListener('document:keyup.escape')
  onClose() {
    this.closeEvent.emit();
  }
}
