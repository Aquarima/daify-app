import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {AuthService, Challenge, ChallengeService, Search} from 'src/app/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AlertHandlingService} from "../../../../core";

@Component({
  selector: 'dfy-browse-results-list',
  templateUrl: './browse-results-list.component.html',
  styleUrls: ['./browse-results-list.component.scss']
})
export class BrowseResultsListComponent implements OnInit {

  @ViewChild('winref') winRef!: ElementRef;
  @ViewChildren('found_tag') tagNodes!: QueryList<ElementRef>;

  @Input() challenges: Challenge[] = [];
  @Input() searchSubject!: BehaviorSubject<Search>;

  search: Search = {} as Search;
  filterTag: string = '';
  scrollLoaderTimeout: null | ReturnType<typeof setTimeout> = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private http: HttpClient,
    private alertHandlingService: AlertHandlingService,
    private authService: AuthService,
    private challengeService: ChallengeService) {
  }

  ngOnInit(): void {
    this.searchSubject.subscribe(search => {
      this.search = search;
      this.cdr.detectChanges();
    });
  }

  getThemeColor(title: string) {
    return this.challengeService.getColorByTag(title);
  }

  onThemeSelected(theme: string) {
    if (theme === this.filterTag) {
      this.filterTag = '';
      return;
    }
    this.filterTag = theme;
  }

  onCardThemeSelected($event: any) {
    this.onThemeSelected($event);
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.scrollLoaderTimeout) return;
    if ((window.innerHeight + window.scrollY) >= this.winRef.nativeElement.offsetHeight) {
      this.scrollLoaderTimeout = setTimeout(() => { // To prevent API spam on scroll
        this.scrollLoaderTimeout = null;
      }, 1000);
    }
  }

  getThemeCount(theme: string): number {
    return this.challenges.filter(challenge => challenge.theme === theme).length;
  }
}
