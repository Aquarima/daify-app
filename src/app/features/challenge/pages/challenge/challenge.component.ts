import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import {AuthService, Challenge, ChallengeService} from "../../../../core";
import {ActivatedRoute} from "@angular/router";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {AlertType} from "../../../../core/models/system-alert";
import {GroupService} from "../../../../core/services/group.service";
import {Group} from "../../../../core/models/challenge/group.model";
import {Channel} from "../../../../core/models/challenge/channel.model";
import {ChannelService} from "../../../../core/services/channel.service";
import {MessageService} from "../../../../core/services/message.service";
import {Message} from "../../../../core/models/challenge/message.model";
import {Member} from "../../../../core/models/challenge/member.model";
import {CreateGroupComponent} from "../../components/create-group/create-group.component";
import {InviteFriendsComponent} from "../../components";

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit, AfterViewInit {

  @ViewChildren('text_input') textInputs!: QueryList<ElementRef>;
  @ViewChild('messages_box') messagesBox!: ElementRef;
  @ViewChild('challenge_box') challengeBox!: ElementRef;

  challenge: Challenge = {} as Challenge;
  channels: Channel[] = [];
  groups: Group[] = [];
  messages: Message[] = [];
  section: number = 0;
  currentChannel: Channel = {} as Channel;

    constructor(
        private route: ActivatedRoute,
        private viewContainerRef: ViewContainerRef,
        private alertHandlingService: AlertHandlingService,
        private authService: AuthService,
        private challengeService: ChallengeService,
        private channelService: ChannelService,
        private messageService: MessageService,
        private groupService: GroupService) {
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.challengeService.getChallengesById(params['id']).subscribe({
        next: data => this.challenge = data,
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch challenge'),
      })
    })
  }

  ngAfterViewInit(): void {
    this.initTextInputsListeners();
    this.messagesBox.nativeElement.scrollIntoView();
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

  onSection(index: number) {
    this.section = index;
    this.challengeBox.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  hasAccess(access: any) {
    return this.challenge.config.accessType === access;
  }

  isOnSection(section: number) {
    return this.section === section;
  }

  get iconUrl(): string {
    return this.challenge?.iconUrl || '/assets/challenge_icon_placeholder.svg';
  }

  get bannerUrl(): string {
    return this.challenge?.coverUrl || '/assets/challenge_cover_placeholder.svg';
  }

    onNewGroup() {
        const componentRef = this.viewContainerRef.createComponent(CreateGroupComponent);
        componentRef.instance.closeEvent.subscribe(() => componentRef.destroy());
    }

    setCurrentChannel(channel: Channel) {
        this.currentChannel = channel;
        this.messageService.getMessagesByChannel(channel.id).subscribe({
            next: (data: any) => this.messages = data.content,
            error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch messages'),
        })
    }

    hasAccess(access: any) {
        return this.challenge.config.accessType === access;
    }

    isOnSection(section: number) {
        return this.section === section;
    }

    isSelfMember(member: Member): boolean {
        return member.profile.id == this.authService.user.profile.id;
    }

    getGroupIcon(group: Group) {
        return group?.iconUrl || '/assets/challenge_icon_placeholder.svg';
    }

    get iconUrl(): string {
        return this.challenge?.iconUrl || '/assets/challenge_icon_placeholder.svg';
    }

    get bannerUrl(): string {
        return this.challenge?.coverUrl || '/assets/challenge_cover_placeholder.svg';
    }

    get authorAvatarUrl(): string {
        return this.challenge.author.avatarUrl || '/assets/avatar_placeholder.svg';
    }
}
