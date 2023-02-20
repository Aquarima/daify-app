import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Banishment, defaultBanishment} from "../../../../core/models/challenge/banishment.model";
import {Challenge, defaultChallenge} from "../../../../core";

@Component({
  selector: 'app-banishment-view',
  templateUrl: './banishment-view.component.html',
  styleUrls: ['./banishment-view.component.scss']
})
export class BanishmentViewComponent implements OnInit {

  @Input() banishment: Banishment = defaultBanishment();
  @Input() challenge: Challenge = defaultChallenge();

  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onCancel() {
    this.cancelEvent.emit();
  }
}
