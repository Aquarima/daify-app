import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Member} from "../../../../core";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-member-kick',
  templateUrl: './member-kick.component.html',
  styleUrls: ['./member-kick.component.scss']
})
export class MemberKickComponent implements OnInit {

  @Input() member!: Member;

  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();
  @Output() confirmEvent: EventEmitter<string> = new EventEmitter();

  reason: FormControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  onCancel() {
    this.cancelEvent.emit();
  }

  onKick() {
    this.confirmEvent.emit(this.reason.value);
    this.cancelEvent.emit();
  }

  getNickname(): string {
    return this.member.nickname ? this.member.nickname : this.member.profile.username;
  }
}
