import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge, Search } from 'src/app/core/models/challenge';

@Component({
  selector: 'app-challenge-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  @Output() searchEvent: EventEmitter<Search> = new EventEmitter();
  @Input() challenges$: Observable<Challenge[]> | undefined;
  displayMode: any = 'grid';

  constructor() { }

  ngOnInit(): void { }

  onDisplayModeSelected(mode: any) {
    this.displayMode = mode;
  }

  onSearch(search: Search) {
    console.log('dddddffsdfsddd');
    this.searchEvent.emit(search);
  }
}
