import { Component, OnInit } from '@angular/core';

const colors = {"a": "red", "b": "blue", "e": "green"};

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
