import {Component, ElementRef, Input, NgZone, OnInit, QueryList, ViewChildren} from '@angular/core';
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
export class SectionChatsComponent implements OnInit {

  @ViewChildren('text_input') textInputs!: QueryList<ElementRef>;

  @Input() section!: Observable<number>;
  @Input() challenge!: Challenge;
  @Input() selfMember!: Member;

  userInputForm = new FormGroup({
    message: new FormControl(''),
  })

  channelCache: Channel[] = [];
  messageCache: Map<Channel, Array<Message>> = new Map();

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
    this.initTextInputsListeners();
  }

  private initTextInputsListeners() {
    this.textInputs.forEach(input => {
      const inputElement = input.nativeElement;
      const parentNode = inputElement.parentNode;
      inputElement.addEventListener('focus', () => {
        parentNode.classList.add('user-input-active')
      });
      inputElement.addEventListener('focus', () => {
        parentNode.classList.add('user-input-active')
      });
      inputElement.addEventListener('focusout', () => {
        if (inputElement.value === '') parentNode.classList.remove('user-input-active');
      });
    });
  }

  loadChat(channel: Channel) {
    if (this.messageCache.has(channel)) {
      this.messages = this.messageCache.get(channel) || [];
      return;
    }
    this.messageService.getMessagesByChannel(channel.id)
      .subscribe({
        next: (msg: any) => this.messageCache.set(channel, this.messages = msg.content),
        error: (err: any) => this.alertHandlingService.throwAlert(AlertType.ERROR, err),
      })
  }

  onChannelSelected(channel: Channel) {
    this.channel = channel;
    this.loadChat(channel);
  }

  onSendMessage() {

  }

  isSelfMember(member: Member): boolean {
    return member.profile.id == this.authService.user.profile.id;
  }
}
