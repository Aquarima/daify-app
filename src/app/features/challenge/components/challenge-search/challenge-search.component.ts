import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChallengeOrderBy, Search} from 'src/app/core/models';
import {SearchService} from 'src/app/core/services/search.service';
import {BehaviorSubject} from "rxjs";
import {searchForm} from "../../../../core/helpers";

@Component({
  selector: 'dfy-challenge-search',
  templateUrl: './challenge-search.component.html',
  styleUrls: ['./challenge-search.component.scss']
})
export class ChallengeSearchComponent implements OnInit {

  @Input() searchSubject!: BehaviorSubject<Search>;

  @Output() searchEvent: EventEmitter<Search> = new EventEmitter();

  @ViewChild('backdrop') backdropNode!: ElementRef;
  @ViewChild('search_history') searchHistoryNode!: ElementRef;
  @ViewChild('name') searchInputNode!: ElementRef;

  searchForm = searchForm;
  history = this.searchService.fetchHistory('challenges');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const searchQuery = params.get('query');
      this.searchForm.controls.title.setValue(searchQuery ? searchQuery : '');
      this.onSearch();
    });
    this.searchForm.controls.orderBy.statusChanges
      .subscribe(orderBy => this.onSearch(false));
  }

  onSearch(fetch = true) {
    this.searchEvent.emit({
      options: {fetch: fetch},
      orderBy: this.searchForm.controls.orderBy.value || ChallengeOrderBy.ALPHABETICAL,
      title: `${this.searchForm.controls.title.value}`
    });
  }

  getOrderByTypes(): { key: string, value: ChallengeOrderBy }[] {
    return Object.values(ChallengeOrderBy).map(value => ({key: value, value: value}));
  }
}
