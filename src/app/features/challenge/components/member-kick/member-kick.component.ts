import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Member} from "../../../../core/models/challenge/member.model";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-member-kick',
  templateUrl: './member-kick.component.html',
  styleUrls: ['./member-kick.component.scss']
})
export class MemberKickComponent implements OnInit {

  @Input() member!: Member;

  @Output() closeEvent: EventEmitter<any> = new EventEmitter();
  @Output() kickEvent: EventEmitter<string> = new EventEmitter();

  reason: FormControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  onCancel() {
    this.closeEvent.emit();
  }

  onKick() {
    this.closeEvent.emit();
    this.kickEvent.emit(this.reason.value);
  }

  get nickname(): string {
    return this.member.nickname ? this.member.nickname : this.member.profile.username;
  }
}
