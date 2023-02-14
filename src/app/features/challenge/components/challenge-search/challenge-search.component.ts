import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ChallengeGroupBy, Search} from 'src/app/core/models';
import {SearchService} from 'src/app/core/services/search.service';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'dfy-challenge-search',
  templateUrl: './challenge-search.component.html',
  styleUrls: ['./challenge-search.component.scss']
})
export class ChallengeSearchComponent implements OnInit {

  @Input() searchSubject!: BehaviorSubject<Search>;

  @ViewChild('backdrop') backdropNode!: ElementRef;
  @ViewChild('search_history') searchHistoryNode!: ElementRef;
  @ViewChild('name') searchInputNode!: ElementRef;

  searchForm = new FormGroup({
    'orderBy': new FormControl(ChallengeGroupBy.ALPHABETICAL),
    'title': new FormControl(''),
  })

  history = this.searchService.fetchHistory('challenges');

  constructor(private route: ActivatedRoute, private router: Router, public searchService: SearchService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const searchQuery = params.get('query');
      this.searchForm.controls.title.setValue(searchQuery ? searchQuery : '');
      this.onSearch();
    });
    this.searchForm.controls.orderBy.statusChanges
      .subscribe(orderBy => {
        this.onSearch(false);
      });
  }

  onSearch(fetch = true) {
    this.searchSubject.next({
      options: {fetch: fetch},
      groupBy: this.searchForm.controls.orderBy.value || ChallengeGroupBy.ALPHABETICAL,
      title: `${this.searchForm.controls.title.value}`
    });
  }

  get orderByTypes(): { key: string, value: ChallengeGroupBy }[] {
    return [
      {key: 'Alphabetical', value: ChallengeGroupBy.ALPHABETICAL},
      {key: 'Duration', value: ChallengeGroupBy.DURATION},
      {key: 'Starts At', value: ChallengeGroupBy.STARTS_AT},
      {key: 'Ends At', value: ChallengeGroupBy.ENDS_AT},
    ]
  }
}
