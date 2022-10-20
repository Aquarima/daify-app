import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Search} from 'src/app/core/models';
import {SearchService} from 'src/app/core/services/search.service';

@Component({
    selector: 'dfy-challenge-search',
    templateUrl: './challenge-search.component.html',
    styleUrls: ['./challenge-search.component.scss']
})
export class ChallengeSearchComponent implements OnInit, AfterViewInit {

    @Output() searchEvent: EventEmitter<Search> = new EventEmitter();
    @Output() groupByEvent: EventEmitter<any> = new EventEmitter();
    @Output() displayModeEvent: EventEmitter<any> = new EventEmitter();

    @ViewChild('backdrop') backdropNode!: ElementRef;
    @ViewChild('search_history') searchHistoryNode!: ElementRef;
    @ViewChild('name') searchInputNode!: ElementRef;

    searchForm = new FormGroup({
        'name': new FormControl(''),
        'sortType': new FormControl(''),
    })

    displayMode: any = 'grid';
    history = this.searchService.fetchHistory('challenges');

    constructor(private route: ActivatedRoute, private router: Router, public searchService: SearchService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            let searchQuery = '';
            if (params['search_query']) searchQuery = params['search_query']
            else this.setQueryParams({'search_query': null});
            this.searchForm.controls['name'].setValue(searchQuery);
            if (searchQuery) this.searchService.saveSearch('challenges', searchQuery);
            this.searchEvent.emit(this.getSearch());
            this.history = this.searchService.fetchHistory('challenges');
        })
    }

    ngAfterViewInit() {
        this.searchInputNode.nativeElement.addEventListener('focus', () => this.displaySearchHistory());
        this.backdropNode.nativeElement.addEventListener('click', () => this.hideSearchHistory());
        const inputElement = this.searchInputNode.nativeElement;
        const parentNode = inputElement.parentNode;
        if (this.searchForm.controls['name'].value) parentNode.classList.add('active');
        inputElement.addEventListener('focus', () => {
            parentNode.classList.add('active')
        });
        inputElement.addEventListener('focusout', () => {
            if (inputElement.value === '') parentNode.classList.remove('active');
        });
    }

    private displaySearchHistory() {
        this.searchHistoryNode.nativeElement.classList.remove('search-history-disabled');
        this.backdropNode.nativeElement.classList.remove('hidden');
    }

    private hideSearchHistory() {
        this.searchHistoryNode.nativeElement.classList.add('search-history-disabled');
        this.backdropNode.nativeElement.classList.add('hidden');
    }

    onDisplayModeSelected(mode: string) {
        this.displayModeEvent.emit(this.displayMode = mode);
    }

    onSearch(name?: string) {
        this.searchHistoryNode.nativeElement.classList.add('search-history-disabled');
        this.searchInputNode.nativeElement.blur();
        const value = (name) ? name : this.getSearch().name;
        this.searchInputNode.nativeElement.parentNode.classList.add('active');
        this.setQueryParams({'search_query': (value) ? value : null});
    }

    onGroupBy(groupOption: string) {
        this.groupByEvent.emit(groupOption);
    }

    deleteSearch(name: string) {
        this.history = this.searchService.deleteSearch('challenges', `${name}`);
    }

    private getSearch(): Search {
        return {
            name: `${this.searchForm.value.name}`
        };
    }

    private setQueryParams(params: any) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: params,
            queryParamsHandling: 'merge',
        });
    }
}
