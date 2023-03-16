import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {RatingCriteria} from "../../../../core";

@Component({
  selector: 'app-rating-criteria-create',
  templateUrl: './rating-criteria-create.component.html',
  styleUrls: ['./rating-criteria-create.component.scss']
})
export class RatingCriteriaCreateComponent implements OnInit {

  @Output() closeEvent: EventEmitter<void> = new EventEmitter();
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('document:keyup.escape')
  onCancel() {
    this.closeEvent.emit();
  }

  onCreate() {
  }
}
