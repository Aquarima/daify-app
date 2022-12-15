import {Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
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

    channels: Channel[] = [];
    currentChannel: Channel | undefined;
    cachedMessages: Map<Channel, Array<Message>> = new Map();
    messages: Array<Message> = [];

    constructor(
        private alertHandlingService: AlertHandlingService,
        private authService: AuthService,
        private channelService: ChannelService,
        private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.channelService.getChannelsByChallenge(this.challenge.id).subscribe({
            next: (data: any) => {
                this.channels = data.content;
                if (!this.currentChannel && this.channels.length > 0) {
                    this.setCurrentChannel(this.channels[0]);
                }
            },
            error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch channels'),
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

    onSendMessage() {
        if (!this.currentChannel) return;
        const rawMessage: string = `${this.userInputForm.controls.message.value}`;
        const message: Message = {id: 0, sender: {} as Member, content: rawMessage, sent_at: new Date()};
        this.messageService.sendMessage(this.currentChannel.id, message)
            .subscribe({
                next: (message: any) => this.messages.push(message),
                error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not send message'),
            })
        this.userInputForm.controls.message.setValue('');
    }

    setCurrentChannel(channel: Channel) {
        this.currentChannel = channel;
        if (!this.cachedMessages.has(channel)) {
            this.messageService.getMessagesByChannel(channel.id).subscribe({
                next: (data: any) => this.cachedMessages.set(channel, data.content),
                error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch messages'),
            })
        }
        this.messages = this.cachedMessages.get(channel) || [];
    }

    isSelfMember(member: Member): boolean {
        return member.profile.id == this.authService.user.profile.id;
    }
}
