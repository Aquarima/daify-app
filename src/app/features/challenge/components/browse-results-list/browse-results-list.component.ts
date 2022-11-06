import {
  Component,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Challenge, ChallengeService} from 'src/app/core';
import {EMPTY, Observable, Subscription} from "rxjs";
import {EMPTY_SUBSCRIPTION} from "rxjs/internal/Subscription";
import {HttpClient} from "@angular/common/http";
import {AlertType} from "../../../../core/models/system-alert";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {environment as env} from "../../../../../environments/environment";


@Component({
  selector: 'dfy-browse-results-list',
  templateUrl: './browse-results-list.component.html',
  styleUrls: ['./browse-results-list.component.scss']
})
export class BrowseResultsListComponent implements OnInit, OnDestroy {

  @ViewChild('winref') winRef!: ElementRef;
  @ViewChildren('found_tag') tagNodes!: QueryList<ElementRef>;

  @Input() request: Observable<{ url: string, replace: boolean }> = EMPTY;
  @Input() displayMode: string = 'grid';
  @Input() groupBy: string = 'alphabetical';

  requestSubscription: Subscription = EMPTY_SUBSCRIPTION;

  challenges: Challenge[] = [];
  totalPages: number = 0;
  pageIndex: number = 0;
  filterTag: string = '';
  lastRequest: { url: string, replace: boolean } = {url: '', replace: false};
  scrollLoaderTimeout: null | ReturnType<typeof setTimeout> = null;

  constructor(
    private alertHandlingService: AlertHandlingService,
    private http: HttpClient,
    private ngZone: NgZone,
    private challengeService: ChallengeService) {
  }

  ngOnInit(): void {
    this.requestSubscription = this.request.subscribe(request => this.ngZone.run(() => this.executeUpdate(request)));
  }

  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }

  private executeUpdate(request?: { url: string, replace: boolean }) {
    if (!request) request = this.lastRequest;
    this.http.get(this.formatURL(request.url)).subscribe({
      next: (data: any) => {
        if (this.pageIndex > data.totalPages) return;
        if (request?.replace) this.challenges = [];
        Array.prototype.push.apply(this.challenges, data.content);
        this.totalPages = data.totalPages;
      },
      error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch challenges'),
    });
    this.lastRequest = request;
  }

  private formatURL(url: string): string {
    return url.replace('{API_URL}', env.apiUrl)
      .replace('size', `size=32`)
      .replace('page', `page=${this.pageIndex++}`);
  }

  getTagColor(title: string) {
    return this.challengeService.getColorByTag(title);
  }

  onTagSelected(tag: string) {
    if (tag === this.filterTag) {
      this.filterTag = '';
      return;
    }
    this.filterTag = tag;
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.scrollLoaderTimeout) return;
    if ((window.innerHeight + window.scrollY) >= this.winRef.nativeElement.offsetHeight) {
      this.scrollLoaderTimeout = setTimeout(() => { // To prevent API spam on scroll
        this.executeUpdate();
        this.scrollLoaderTimeout = null;
      }, 1000);
    }
  }
}
