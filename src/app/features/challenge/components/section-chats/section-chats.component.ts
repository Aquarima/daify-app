import {Component, ElementRef, Input, NgZone, OnInit, ViewChild, ViewContainerRef,} from '@angular/core';
import {AuthService, Challenge} from "../../../../core";
import {ChannelService} from "../../../../core/services/channel.service";
import {MessageService} from "../../../../core/services/message.service";
import {AlertType} from "../../../../core/models/system-alert";
import {Channel} from "../../../../core/models/challenge/channel.model";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {Message} from "../../../../core/models/challenge/message.model";
import {Member} from "../../../../core/models/challenge/member.model";
import {Observable, timer} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import {MemberReportComponent} from "../member-report/member-report.component";

@Component({
  selector: 'dfy-challenge-chats',
  templateUrl: './section-chats.component.html',
  styleUrls: ['./section-chats.component.scss']
})
export class SectionChatsComponent implements OnInit {

  @ViewChild('messages_node') messagesNode!: ElementRef;

  @Input() section!: Observable<string>;
  @Input() challenge!: Challenge;
  @Input() selfMember: Member | undefined;

  MESSAGE_TIMEOUT: number = 5;

  userInputForm = new FormGroup({
    message: new FormControl(''),
  })

  channelCache: Channel[] = [];
  messageCache: Map<Channel, Message[]> = new Map();
  channel: Channel | undefined;
  messages: Message[] = [];
  canSendMessage: boolean = true;
  displayTimeoutMessage: boolean = false;

  constructor(
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private viewContainerRef: ViewContainerRef,
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
        error: (err: any) => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ''),
      })
  }

  onChannelSelected(channel: Channel) {
    this.channel = channel;
    this.loadChat(channel);
    //this.scrollToNewestMessage();
  }

  onSendMessage() {
    if (!this.canSendMessage) {
      this.displayTimeoutMessage = true;
      return;
    }
    if (!this.channel || !this.selfMember) return;
    const messageToSend: Message = {
      id: 0,
      sender: this.selfMember,
      content: `${this.userInputForm.value.message}`,
      sentAt: new Date()
    };
    this.userInputForm.reset({message: undefined});
    this.messageService.sendMessage(this.channel.id, messageToSend).subscribe({
      next: (message: Message) => {
        this.addMessageToChat(this.channel || {} as Channel, message);
        this.startMessageTimeout();
      },
      error: () => this.addMessageToChat(this.channel || {} as Channel, messageToSend, true)
    })
  }

  onDeleteMessage(message: Message) {
    this.messageService.deleteMessage(message)
      .subscribe({
        next: () => this.messages.splice(this.messages.indexOf(message), 1),
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', '')
      })
  }

  onReportMessage(message: Message) {
    const componentRef = this.viewContainerRef.createComponent(MemberReportComponent);
    componentRef.instance.closeEvent.subscribe(_ => componentRef.destroy());
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
        error: (err: any) => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ''),
      })
  }

  addMessageToChat(channel: Channel, message: Message, isFailed?: boolean) {
    const chat: Message[] | undefined = this.messageCache.get(channel);
    if (!chat) return;
    if (isFailed) message.isFailed = true;
    chat.unshift(message);
  }

  startMessageTimeout() {
    this.canSendMessage = false;
    timer(this.MESSAGE_TIMEOUT * 1000).subscribe(() => {
      this.canSendMessage = true;
      this.displayTimeoutMessage = false;
    });
  }

  isSelfMember(member: Member): boolean {
    return member.profile.id == this.authService.user.profile.id;
  }

  isSelfMemberAuthor(): boolean {
    return this.selfMember?.id === this.challenge.author.id;
  }

  isChannelMaintainer(member: Member): boolean {
    return member.id === this.channel?.maintainer.id;
  }
}
