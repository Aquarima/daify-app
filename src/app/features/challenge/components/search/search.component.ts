import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-challenge-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('backdrop') backdrop: ElementRef | undefined;
  @ViewChild('advancedSearch') advancedSearch: ElementRef | undefined;
  @ViewChild('search') searchInput: ElementRef | undefined;
  @ViewChild('addTagBox') addTagBox: ElementRef | undefined;
  
  history: string[] = this.getHistory();
  searchInputValue: string = '';
  tagInputValue: string = '';
  tags: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchInputValue = params['search'];
      }
    })
  }

  ngAfterViewInit(): void {
    this.searchInput?.nativeElement.addEventListener("focus", () => {
      this.advancedSearch?.nativeElement.classList.remove('hidden');
      this.backdrop?.nativeElement.classList.remove('hidden');
    });
    this.backdrop?.nativeElement.addEventListener('click', () => {
      this.advancedSearch?.nativeElement.classList.add('hidden');
      this.backdrop?.nativeElement.classList.add('hidden');
    });
  }

  getHistory(): string[] {
    let json = localStorage.getItem('history');
    return (json) ? this.history = JSON.parse(json) : this.history = [];
  }

  addHistorySearch(search: string) {
    const history: string[] = this.getHistory();
    if (history.includes(search)) return;
    if (history.length >= 4) history.pop();
    history.unshift(search);
    localStorage.setItem('history', JSON.stringify(history));
    this.history = history;
  }

  removeHistorySearch(search: string) {
    const history: string[] = this.getHistory();
    for (let i = 0; i < history.length; i++) {
      if (history[i] === search) {
        history.splice(i, 1);
        localStorage.setItem('history', JSON.stringify(history));
        this.history = history;
        return;
      }
    }
  }

  onSearch(value: string) {
    this.advancedSearch?.nativeElement.classList.add('hidden');
    if (value.trim() === '') return;
    this.searchInput?.nativeElement.blur();
    this.addHistorySearch(value);
    this.router.navigate([], { 
      relativeTo: this.route, 
      queryParams: { search: value },
      queryParamsHandling: 'merge', 
    });
  }

  onTagAdd(value: string) {
    this.tagInputValue = '';
    if (this.tags.includes(value) || value.trim().length < 2) return;
    this.tags.push(value);
    if (this.tags.length >= 3) {
      this.addTagBox?.nativeElement.classList.add('hidden');
    }
  }

  onTagRemove(tagToRemove: string) {
    for (let i = 0; i < this.tags.length; i++) {
      if (tagToRemove === this.tags[i]) {
        this.tags.splice(i, 1);
      }
    }
    this.addTagBox?.nativeElement.classList.remove('hidden');
  }
}
