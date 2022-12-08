import {Component, Input, OnInit} from '@angular/core';
import {AuthService, Challenge} from "../../../../core";
import {ChannelService} from "../../../../core/services/channel.service";
import {MessageService} from "../../../../core/services/message.service";
import {AlertType} from "../../../../core/models/system-alert";
import {Channel} from "../../../../core/models/challenge/channel.model";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {Message} from "../../../../core/models/challenge/message.model";
import {Member} from "../../../../core/models/challenge/member.model";

@Component({
  selector: 'dfy-challenge-chats',
  templateUrl: './section-chats.component.html',
  styleUrls: ['./section-chats.component.scss']
})
export class SectionChatsComponent implements OnInit {

  @Input() challenge!: Challenge;

  channels: Channel[] = [];
  messages: Message[] = [];
  currentChannel: Channel = {} as Channel;

  constructor(
    private alertHandlingService: AlertHandlingService,
    private authService: AuthService,
    private channelService: ChannelService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.channelService.getChannelsByChallenge(this.challenge.id).subscribe({
      next: (data: any) => this.channels = data.content,
      error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch channels'),
    })
  }

  setCurrentChannel(channel: Channel) {
    this.currentChannel = channel;
    this.messageService.getMessagesByChannel(channel.id).subscribe({
      next: (data: any) => this.messages = data.content,
      error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch messages'),
    })
  }

  isSelfMember(member: Member): boolean {
    return member.profile.id == this.authService.user.profile.id;
  }
}
