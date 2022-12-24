import {Component, Input, OnInit} from '@angular/core';
import {Challenge} from "../../../../core";

@Component({
  selector: 'dfy-challenge-settings',
  templateUrl: './section-settings.component.html',
  styleUrls: ['./section-settings.component.scss']
})
export class SectionSettingsComponent implements OnInit {

  @Input() challenge!: Challenge;

  constructor() { }

  ngOnInit(): void {
  }
}
