import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Member} from "../../../../core";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-member-banish',
  templateUrl: './member-banish.component.html',
  styleUrls: ['./member-banish.component.scss']
})
export class MemberBanishComponent implements OnInit {

  @Input() member!: Member;

  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();

  banishForm = new FormGroup({
    reason: new FormControl<string>(''),
    blacklist: new FormControl<boolean>(true)
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.cancelEvent.emit();
  }

  onBanish() {
    this.confirmEvent.emit(this.banishForm.value);
  }

  get nickname(): string {
    return this.member.nickname ? this.member.nickname : this.member.profile.username;
  }
}
