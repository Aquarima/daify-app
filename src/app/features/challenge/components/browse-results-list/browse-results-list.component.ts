import {
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
import {Challenge, ChallengeService, Search} from 'src/app/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AlertHandlingService} from "../../../../core/services/system/alert-handling.service";
import {AlertType} from "../../../../core/models/system-alert";

@Component({
  selector: 'dfy-browse-results-list',
  templateUrl: './browse-results-list.component.html',
  styleUrls: ['./browse-results-list.component.scss']
})
export class BrowseResultsListComponent implements OnInit {

  @ViewChild('winref') winRef!: ElementRef;
  @ViewChildren('found_tag') tagNodes!: QueryList<ElementRef>;

  @Input() searchSubject!: BehaviorSubject<Search>;

  search: Search = {} as Search;
  challenges: Challenge[] = [];
  filterTag: string = '';
  scrollLoaderTimeout: null | ReturnType<typeof setTimeout> = null;

  constructor(
    private alertHandlingService: AlertHandlingService,
    private http: HttpClient,
    private ngZone: NgZone,
    private challengeService: ChallengeService) {
  }

  ngOnInit(): void {
    this.searchSubject.subscribe(search => {
      if (search.options.fetch) {
        if (search.title) {
          this.fetchChallengesByTitle(search.title);
          return;
        }
        this.fetchChallenges();
      }
      this.search = search;
    });
  }

  fetchChallenges() {
    this.challengeService.getChallenges()
      .subscribe({
        next: (data: any) => Array.prototype.push.apply(this.challenges, data.content),
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
      });
  }

  fetchChallengesByTitle(title: string) {
    this.challengeService.getChallengesByTitle(title)
      .subscribe({
        next: (data: any) => this.challenges = data.content,
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
      })
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
