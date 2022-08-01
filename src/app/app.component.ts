import { Component, OnInit } from '@angular/core';
import { Challenge } from './core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  challenges: Challenge[] = [];

  constructor() { }

  ngOnInit(): void { }
}
