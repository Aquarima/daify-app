import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from 'src/app/core';

@Component({
  selector: 'dfy-browse-results-list',
  templateUrl: './browse-results-list.component.html',
  styleUrls: ['./browse-results-list.component.scss']
})
export class BrowseResultsListComponent implements OnInit {

  @Input() challenges: Challenge[] = [];
  @Input() displayMode: string = 'grid';
  @Input() groupBy: string = 'alphabetical';

  constructor() { }

  ngOnInit(): void { }
}
