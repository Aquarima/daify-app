import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-rating-criteria-create',
  templateUrl: './rating-criteria-create.component.html',
  styleUrls: ['./rating-criteria-create.component.scss']
})
export class RatingCriteriaCreateComponent implements OnInit {

  @Output() closeEvent: EventEmitter<void> = new EventEmitter();
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();

  ratingCriteriaForm = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    weight: new FormControl<number>(1)
  });

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('document:keyup.escape')
  onCancel() {
    this.closeEvent.emit();
  }

  onCreate() {
    this.confirmEvent.emit(this.ratingCriteriaForm.value);
  }
}
