import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'dfy-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, AfterViewInit {

  @Input() pageSize: number = 10;
  @Input() pageCount: number = 0;

  @Output() page: EventEmitter<number> = new EventEmitter<number>();

  currentPage: number = 0;
  indexes: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    for (let i = 1; i <= this.pageCount; i++) {
      this.indexes.push(i);
    }
    setTimeout(() => this.onPage(1), 1000);
  }

  onPage(index: number) {
    if (index < 1 || index > this.pageCount || index === this.currentPage) return;
    this.currentPage = index;
    this.page.emit(index);
  }

  onPrevious() {
    const prevPage = this.currentPage - 1;
    if (prevPage >= 1) {
      this.onPage(prevPage);
    }
  }

  onNext() {
    const nextPage = this.currentPage + 1;
    if (nextPage <= this.pageCount) {
      this.onPage(nextPage);
    }
  }
}
