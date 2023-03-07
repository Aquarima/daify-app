import {Component, ElementRef, Input, NgZone, OnInit, ViewChild, ViewContainerRef,} from '@angular/core';
import {
  AlertHandlingService,
  AuthService,
  Challenge,
  Channel,
  ChannelService,
  defaultProfile,
  Member,
  Message,
  MessageService,
  PopupService
} from "../../../../core";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import {tap, timer} from "rxjs";

@Component({
  selector: 'dfy-challenge-chats',
  templateUrl: './section-chats.component.html',
  styleUrls: ['./section-chats.component.scss']
})
export class SectionChatsComponent implements OnInit {

  @ViewChild('messageList', {static: false}) messagesNode!: ElementRef;

  @Input() challenge!: Challenge;
  @Input() selfMember: Member | undefined;

  MESSAGE_TIMEOUT: number = 5;

  messageForm = new FormGroup({
    message: new FormControl(''),
  });

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
    private popupService: PopupService,
    private authService: AuthService,
    private channelService: ChannelService,
    private messageService: MessageService) {
    this.popupService.setViewContainerRef(viewContainerRef);
  }

  ngOnInit() {
    this.channelService.getChannelsByChallenge(this.challenge)
      .subscribe({
        next: (channels: any) => {
          this.channelCache = channels.content;
          if (!this.channel && this.channelCache.length > 0) {
            this.onChannelSelected(this.channelCache[0]);
          }
        }
      });
  }

  onChannelSelected(channel: Channel) {
    this.channel = channel;
    this.fetchChannelMessages(channel);
    this.scrollToNewestMessage();
  }

  onReportMessage(message: Message) {
  }

  onDeleteMessage(message: Message) {
    this.popupService.createConfirmModal(
      'Delete this message?',
      'Are you sure that you want to delete this action cannot be undone.',
      () => {
        this.messageService.deleteMessage(message)
          .subscribe(() => this.messages = this.messages.filter((m) => m.id !== message.id));
      });
  }

  onSendMessage() {
    const inputValue = this.messageForm.controls.message.value;
    if (inputValue && this.selfMember && this.channel) {
      const messageToSend: Message = {content: inputValue} as Message;
      this.messageService.sendMessage(this.channel, messageToSend)
        .subscribe({
          next: (message: Message) => {
            this.messages.push(message);
            //setTimeout(() => this.scrollToNewestMessage(), 50);
          },
          error: () => {
            messageToSend.isFailed = true;
            if (this.selfMember) messageToSend.sender = this.selfMember;
            this.messages.push(messageToSend);
          }
        });
    }
    this.startMessageTimeout();
    this.clearMessageInput();
  }

  private fetchChannelMessages(channel: Channel) {
    if (this.messageCache.has(channel)) {
      this.messages = this.messageCache.get(channel) || [];
      return;
    }
    this.messageService.getMessagesByChannel(channel.id)
      .pipe(tap(messages => {
        this.messages = messages.content;
        this.messageCache.set(channel, messages);
      })).subscribe();
  }

  private clearMessageInput() {
    this.messageForm.controls.message.setValue(null);
  }

  private startMessageTimeout() {
    this.canSendMessage = false;
    timer(this.MESSAGE_TIMEOUT * 1000).subscribe(() => {
      this.canSendMessage = true;
      this.displayTimeoutMessage = false;
    });
  }

  private scrollToNewestMessage() {
    const scrollOptions: ScrollIntoViewOptions = {behavior: "smooth", block: "end", inline: "nearest"};
    if (this.messagesNode) {
      this.messagesNode.nativeElement.scrollIntoView(scrollOptions);
      return;
    }
    setTimeout(() => this.messagesNode.nativeElement.scrollIntoView(scrollOptions), 100);
  }

  isSelfMessage(message: Message): boolean {
    if (!message.sender) return false;
    return message.sender.profile && message.sender.profile.id == this.authService.user.profile.id;
  }

  isMessageSentByMaintainer(message: Message): boolean {
    if (!message.sender) return false;
    return message.sender.id === this.channel?.maintainer.id;
  }

  isSenderOnline(message: Message): boolean {
    const sender: Member = message.sender;
    return sender && sender.profile ? sender.profile.online : false;
  }

  getSenderAvatar(message: Message): string {
    const sender: Member = message.sender;
    let avatarUrl = defaultProfile().avatarUrl;
    if (sender && sender.profile) avatarUrl = sender.profile.avatarUrl;
    return avatarUrl;
  }

  getSenderUsername(message: Message) {
    const sender: Member = message.sender;
    let username = defaultProfile().username;
    if (sender && sender.profile) username = sender.profile.username;
    return username;
  }

  getSenderNickname(message: Message) {
    const sender: Member = message.sender;
    let username = defaultProfile().username;
    if (sender && sender.profile) username = sender.nickname ? sender.nickname : sender.profile.username;
    return username;
  }
}
