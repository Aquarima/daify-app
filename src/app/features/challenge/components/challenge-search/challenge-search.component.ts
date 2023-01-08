import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Search} from 'src/app/core/models';
import {SearchService} from 'src/app/core/services/search.service';
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'dfy-challenge-search',
  templateUrl: './challenge-search.component.html',
  styleUrls: ['./challenge-search.component.scss']
})
export class ChallengeSearchComponent implements OnInit {

  @Input() searchSubject!: BehaviorSubject<Search>;

  @Output() orderByEvent: EventEmitter<any> = new EventEmitter();
  @Output() displayModeEvent: EventEmitter<any> = new EventEmitter();

  @ViewChild('backdrop') backdropNode!: ElementRef;
  @ViewChild('search_history') searchHistoryNode!: ElementRef;
  @ViewChild('name') searchInputNode!: ElementRef;

  searchForm = new FormGroup({
    'title': new FormControl(''),
    'sortType': new FormControl(''),
  })

  displayMode: any = 'grid';
  history = this.searchService.fetchHistory('challenges');

  constructor(private route: ActivatedRoute, private router: Router, public searchService: SearchService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const searchQuery = params.get('search_query');
      if (!searchQuery) return;
      this.searchForm.value.title = searchQuery;
      this.searchSubject.next({title: `${params.get('search_query')}`});
    });
  }

  onSearch() {
    const search: Search = {title: `${this.searchForm.value.title}`};
    if (search.title) this.router.navigate(['/app/explore/', search.title]);
    this.searchSubject.next(search);
  }
}
