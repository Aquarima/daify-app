import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Challenge } from 'src/app/core';


const colors: string[] = [
  "#9ed44c", "#d44c4c", "#d44c90", "#804cd4",  "#4cd473", "#4cb2d4", "#d44c93", 
  "#c24cd4", "#9ed44c", "#d44c4c", "#d4c04c", "#5ed44c", "#be4cd4", "#4cb2d4", 
  "#b9d44c", "#d49b4c", "#d49b4c", "#4cd485", "#d2d44c", "#d44cb2", "#4cd489", 
  "#bdd44c", "#d48b4c", "#4cb9d4", "#d4b44c", "#d44c70",
];

@Component({
  selector: 'dfy-browse-results-list',
  templateUrl: './browse-results-list.component.html',
  styleUrls: ['./browse-results-list.component.scss']
})
export class BrowseResultsListComponent implements OnInit {

  @ViewChildren("found_tag") tagNodes!: QueryList<ElementRef>;

  @Output() showMoreEvent: EventEmitter<number> = new EventEmitter();

  @Input() challenges: Challenge[] = [];
  @Input() displayMode: string = 'list';
  @Input() groupBy: string = 'alphabetical';
  @Input() totalPages: number = 0;

  pageIndex: number = 1;

  filterTag: string | undefined;

  constructor() { }
  
  ngOnInit(): void { }

  getTagColor(title: string): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    const letter = title.charAt(0);
    return colors[alphabet.indexOf(letter.toLowerCase())];
  }
  
  onTagSelected(tag: string) {
    if (tag === this.filterTag) {
      this.filterTag = undefined;
      return;
    }
    this.filterTag = tag;
  }

  onShowMore() {
    const nextIdx = this.pageIndex++;
    if (nextIdx >= this.totalPages) return;
    this.showMoreEvent.emit(nextIdx);
  }
}
