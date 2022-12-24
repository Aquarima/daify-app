import {AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild,} from '@angular/core';
import {AuthService, Challenge} from "../../../../core";
import {ChannelService} from "../../../../core/services/channel.service";
import {MessageService} from "../../../../core/services/message.service";
import {AlertType} from "../../../../core/models/system-alert";
import {Channel} from "../../../../core/models/challenge/channel.model";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {Message} from "../../../../core/models/challenge/message.model";
import {Member} from "../../../../core/models/challenge/member.model";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'dfy-challenge-chats',
  templateUrl: './section-chats.component.html',
  styleUrls: ['./section-chats.component.scss']
})
export class SectionChatsComponent implements OnInit, AfterViewInit {

  @ViewChild('messages_node') messagesNode!: ElementRef;

  @Input() section!: Observable<number>;
  @Input() challenge!: Challenge;
  @Input() selfMember!: Member;

  userInputForm = new FormGroup({
    message: new FormControl(''),
  })

  channelCache: Channel[] = [];
  messageCache: Map<Channel, Message[]> = new Map();
  channel: Channel | undefined;
  messages: Message[] = [];

  constructor(
    private ngZone: NgZone,
    private alertHandlingService: AlertHandlingService,
    private authService: AuthService,
    private channelService: ChannelService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.channelService.getChannelsByChallenge(this.challenge.id)
      .subscribe({
        next: (channels: any) => {
          this.channelCache = channels.content;
          if (!this.channel && this.channelCache.length > 0) {
            this.onChannelSelected(this.channelCache[0]);
          }
        },
        error: (err: any) => this.alertHandlingService.throwAlert(AlertType.ERROR, err),
      })
  }

  ngAfterViewInit(): void {

  }

  private scrollToNewestMessage() {
    this.messagesNode.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  loadChat(channel: Channel) {
    if (this.messageCache.has(channel)) {
      this.messages = this.messageCache.get(channel) || [];
      return;
    }
    this.messageService.getMessagesByChannel(channel.id)
      .subscribe({
        next: (msg: any) => {
          this.messageCache.set(channel, this.messages = msg.content);
          //this.scrollToNewestMessage();
        },
        error: (err: any) => this.alertHandlingService.throwAlert(AlertType.ERROR, err),
      })
  }

  onChannelSelected(channel: Channel) {
    this.channel = channel;
    this.loadChat(channel);
    //this.scrollToNewestMessage();
  }

  addMessageToChat(channel: Channel, message: Message, isFailed?: boolean) {
    const chat: Message[] | undefined = this.messageCache.get(channel);
    if (!chat) return;
    if (isFailed) message.isFailed = true;
    chat.unshift(message);
  }

  onSendMessage() {
    if (!this.channel) return;
    const messageToSend: Message = {
      id: 0,
      sender: this.selfMember,
      content: `${this.userInputForm.value.message}`,
      sentAt: new Date()
    };
    this.messageService.sendMessage(this.channel.id, messageToSend).subscribe({
      next: (message: Message) => this.addMessageToChat(this.channel || {} as Channel, message),
      error: () => this.addMessageToChat(this.channel || {} as Channel, messageToSend, true)
    })
  }

  isSelfMember(member: Member): boolean {
    return member.profile.id == this.authService.user.profile.id;
  }

  isChannelMaintainer(member: Member): boolean {
    return member.id === this.channel?.maintainer.id;
  }
}
