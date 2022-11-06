import {Component, OnInit,} from '@angular/core';
import {Search} from 'src/app/core/models/challenge';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'dfy-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  groupBy: string = 'alphabetical';
  displayMode: string = 'grid';
  request: BehaviorSubject<any> = new BehaviorSubject({url: '', replace: false});

  ngOnInit(): void {
  }

  onSearch(search: Search) {
    if (!search.title) {
      this.request.next({url: '{API_URL}/challenge/all?size&page', replace: false});
      return;
    }
    this.request.next({url: '{API_URL}/challenge/all/${search.title}?size&page', replace: true});
  }

  onGroupBySelected(option: any) {
    this.groupBy = option;
  }

  onDisplayModeSelected(mode: any) {
    this.displayMode = mode;
  }
}
