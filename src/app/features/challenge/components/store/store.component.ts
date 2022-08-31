import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from 'src/app/core/models/challenge';

@Component({
  selector: 'app-challenge-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  @Input() challenges$: Observable<Challenge[]> | undefined;
  @Input() displayMode: any = 'grid';

  constructor() { }

  ngOnInit(): void { }
}
