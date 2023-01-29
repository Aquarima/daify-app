import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Challenge} from "../../../../core";
import {AlertType} from "../../../../core/models/system-alert";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";

@Component({
  selector: 'app-challenge-share',
  templateUrl: './challenge-share.component.html',
  styleUrls: ['./challenge-share.component.scss']
})
export class ChallengeShareComponent implements OnInit {

  @Input() challenge!: Challenge;

  @Output() closeEvent: EventEmitter<void> = new EventEmitter();

  invite: string = '';
  displayInviteAsEmbed: boolean = true;

  constructor(private alertHandlingService: AlertHandlingService) { }

  ngOnInit(): void {
    this.invite = 'localhost:4200/app/invite/' + this.challenge.invite;
  }

  onToggleInviteFormat() {
    this.displayInviteAsEmbed = !this.displayInviteAsEmbed;
    this.invite = this.displayInviteAsEmbed ? `localhost:4200/app/invite/${this.challenge.invite}` : this.challenge.invite;
  }

  onCopyInvite() {
    navigator.clipboard.writeText(this.invite).then(r => this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', ``));
  }

  onClose() {
    this.closeEvent.emit();
  }
}
