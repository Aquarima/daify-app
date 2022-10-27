import {
  Component,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {Challenge, ChallengeService} from 'src/app/core';
import {EMPTY, Observable, Subscription} from "rxjs";
import {EMPTY_SUBSCRIPTION} from "rxjs/internal/Subscription";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'dfy-browse-results-list',
  templateUrl: './browse-results-list.component.html',
  styleUrls: ['./browse-results-list.component.scss']
})
export class BrowseResultsListComponent implements OnInit, OnDestroy {

  @ViewChildren("found_tag") tagNodes!: QueryList<ElementRef>;

  @Input() request: Observable<{url: string, replace: boolean}> = EMPTY;
  @Input() displayMode: string = 'grid';
  @Input() groupBy: string = 'alphabetical';

  requestSubscription: Subscription = EMPTY_SUBSCRIPTION;

  loaded: boolean = true;
  challenges: Challenge[] = [];
  totalPages: number = 0;
  pageIndex: number = 0;
  filterTag: string | undefined;

  lastRequest: {url: string, replace: boolean} = {url: '', replace: false};

  constructor(private http: HttpClient, private ngZone: NgZone, private challengeService: ChallengeService) {
  }

  ngOnInit(): void {
    this.requestSubscription = this.request.subscribe(request => this.ngZone.run(() => this.executeUpdate(request)));
  }

  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }

  private executeUpdate(request?: {url: string, replace: boolean}) {
    if (!request) request = this.lastRequest;
    this.http.get(this.formatURL(request.url)).subscribe({
      next: (data: any) => {
        if (data.totalPages <= this.pageIndex) return;
        if (request?.replace) this.challenges = [];
        Array.prototype.push.apply(this.challenges, data.content);
        this.totalPages = data.totalPages;
      },
      error: () => alert('Something went wrong...'),
    });
    this.lastRequest = request;
  }

  private formatURL(url: string): string {
    return url.replace('size', `size=32`)
      .replace('page', `page=${this.pageIndex++}`);
  }

  getColorByTag(title: string) {
    return this.challengeService.getColorByTag(title);
  }

  onTagSelected(tag: string) {
    if (tag === this.filterTag) {
      this.filterTag = undefined;
      return;
    }
    this.filterTag = tag;
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.executeUpdate();
    }
  }
}
