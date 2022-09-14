import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Challenge } from 'src/app/core';


const colors: string[] = [
  "#9ed44c", "#d44c4c", "#d44c90", "#804cd4",  "#4cd473", "#4cb2d4", "#d44c93", "#c24cd4", "#9ed44c", "#d44c4c", "#d4c04c", "#5ed44c", "#be4cd4",
  "#4cb2d4", "#b9d44c", "#d49b4c", "#d49b4c", "#4cd485", "#d2d44c", "#d44cb2", "#4cd489", "#bdd44c", "#d48b4c", "#4cb9d4", "#d4b44c", "#d44c70",
];

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

@Component({
  selector: 'dfy-browse-results-list',
  templateUrl: './browse-results-list.component.html',
  styleUrls: ['./browse-results-list.component.scss']
})
export class BrowseResultsListComponent implements OnInit, AfterViewInit {

  @ViewChildren("found_tag") tagNodes!: QueryList<ElementRef>;

  @Input() challenges: Challenge[] = [];
  @Input() displayMode: string = 'list';
  @Input() groupBy: string = 'alphabetical';

  filterTag: string | undefined;

  constructor() { }

  ngOnInit(): void { }
  
  ngAfterViewInit(): void { }

  onTagSelected(tag: string) {
    this.tagNodes.forEach(node => {
      const el = node.nativeElement;
      const charIndex = alphabet.indexOf(el.textContent.charAt(1).toLowerCase());
      el.style.backgroundColor = colors[charIndex - 1];
    });
    if (tag === this.filterTag) {
      this.filterTag = undefined;
      return;
    }
    this.filterTag = tag;
  }
}
