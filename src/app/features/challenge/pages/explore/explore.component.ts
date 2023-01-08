import {Component, OnInit,} from '@angular/core';
import {Search} from 'src/app/core/models/challenge';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'dfy-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  searchSubject: BehaviorSubject<Search> = new BehaviorSubject({} as Search);
  groupBy: string = 'alphabetical';
  displayMode: string = 'grid';
  request: BehaviorSubject<any> = new BehaviorSubject({url: '', replace: false});

  ngOnInit(): void {
  }

  onGroupBySelected(option: any) {
    this.groupBy = option;
  }

  onDisplayModeSelected(mode: any) {
    this.displayMode = mode;
  }
}
