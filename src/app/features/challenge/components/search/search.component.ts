import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Search } from 'src/app/core/models';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-challenge-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @Output() searchEvent: EventEmitter<Search> = new EventEmitter();

  @ViewChild('backdrop') backdropNode: ElementRef | undefined;
  @ViewChild('search_history') searchHistoryNode: ElementRef | undefined;
  @ViewChild('name') searchInputNode: ElementRef | undefined;

  searchForm = new FormGroup({
    'name': new FormControl('')
  })

  history = this.searchService.fetchHistory();
  
  constructor(private route: ActivatedRoute, private router: Router, public searchService: SearchService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let searchQuery = '';
      if (params['search_query']) searchQuery = params['search_query'] 
      else this.setQueryParams({'search_query': null });
      this.searchForm.controls['name'].setValue(searchQuery)
      this.searchEvent.emit(this.getSearch());
      this.history = this.searchService.fetchHistory();
    })
  }

  ngAfterViewInit() {
    this.searchInputNode?.nativeElement.addEventListener('focus', () => {
      this.searchHistoryNode?.nativeElement.classList.remove('hidden');
      this.backdropNode?.nativeElement.classList.remove('hidden');
    });
    this.backdropNode?.nativeElement.addEventListener('click', () => {
      this.searchHistoryNode?.nativeElement.classList.add('hidden');
      this.backdropNode?.nativeElement.classList.add('hidden');
    });
  }

  onSearch(name?: string) {
    this.searchHistoryNode?.nativeElement.classList.add('hidden');
    this.searchInputNode?.nativeElement.blur();
    const value = (name) ? name : this.getSearch().name; 
    this.setQueryParams({'search_query': (value) ? value : null });
  }

  deleteSearch(name: string) {
    this.history = this.searchService.deleteSearch(`${name}`);
  }

  getSearch(): Search {
    return {
      name: `${this.searchForm.value.name}`
    };
  }

  setQueryParams(params: any) {
    this.router.navigate([], { 
      relativeTo: this.route, 
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
