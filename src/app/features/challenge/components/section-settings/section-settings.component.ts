import {Component, Input, OnInit} from '@angular/core';
import {Challenge} from "../../../../core";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'dfy-challenge-settings',
  templateUrl: './section-settings.component.html',
  styleUrls: ['./section-settings.component.scss']
})
export class SectionSettingsComponent implements OnInit {

  @Input() challenge!: Challenge;

  currentSection: number = 0;

  configForm: FormGroup = new FormGroup({
    spectators_allowed: new FormControl<boolean>(false)
  })

  constructor() { }

  ngOnInit(): void {
  }

  control(name: string) {
    return this.configForm.controls['spectators_allowed'];
  }

  onOverview() {
    this.showSection(0);
  }

  onMembers() {
    this.showSection(1);
  }

  onDeposits() {
    this.showSection(2);
  }

  onSpectators() {
    this.showSection(3);
  }

  showSection(index: number) {
    this.currentSection = index;
  }

  isOnSection(index: number) {
    return this.currentSection === index;
  }
}
