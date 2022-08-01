import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'challenge-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const advSearchNode = document.querySelector('.advanced-search');
    if (!advSearchNode) return;
    document.querySelector('#search')?.addEventListener('focus', () => {
      advSearchNode.classList.remove('hidden');
    });
    document.addEventListener('click', (e) => {
      const classList = (<HTMLElement> e.target).classList;
      if (classList.contains('search')) return;
      if (classList.contains('advanced-search')) return;
      advSearchNode.classList.add('hidden');
    });
  }
}
