import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Member} from "../../../../core/models/challenge/member.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-member-banish',
  templateUrl: './member-banish.component.html',
  styleUrls: ['./member-banish.component.scss']
})
export class MemberBanishComponent implements OnInit {

  @Input() member!: Member;

  @Output() closeEvent: EventEmitter<any> = new EventEmitter();
  @Output() banishEvent: EventEmitter<any> = new EventEmitter();

  banishForm = new FormGroup({
    reason: new FormControl<string>(''),
    permanent: new FormControl<boolean>(true)
  });

  constructor() { }

  ngOnInit(): void {
  }

  onCancel() {
    this.closeEvent.emit();
  }

  onBanish() {

  }

  get nickname(): string {
    return this.member.nickname ? this.member.nickname : this.member.profile.username;
  }
}
