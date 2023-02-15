import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject, OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {AuthService, Challenge, Friend, Profile} from "../../../../core";
import {FriendService} from "../../../../core/services/user/friend.service";
import {DOCUMENT} from "@angular/common";
import {AlertHandlingService} from "../../../../core/services/system/alert-handling.service";
import {AlertType} from "../../../../core/models/system-alert";

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss']
})
export class InviteFriendsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('text_input') searchInput!: ElementRef;

  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  challenge: Challenge = {} as Challenge;
  invite: string = 'localhost:4200/app/challenge/invite/' + this.challenge.invite;
  displayInviteAsEmbed: boolean = true;
  inviteJoinType: JoinType = JoinType.MEMBER;
  friends: Profile[] = [];
  invites: Map<Profile, JoinType> = new Map<Profile, JoinType>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: AuthService,
    private friendService: FriendService,
    private alertHandlingService: AlertHandlingService) {
  }

  ngOnInit(): void {
    const userId = this.authService.user.id;
    this.friendService.getFriendsByUserId(userId)
      .subscribe({
        next: (data: any) => {
          this.friends = this.defaultSorting(data.content.map((friend: Friend) => friend.profile));
        },
      })
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'no-scroll');
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(this.document.body, 'no-scroll');
  }

  onToggleInviteFormat() {
    this.displayInviteAsEmbed = !this.displayInviteAsEmbed;
    this.invite = (this.displayInviteAsEmbed ? 'localhost:4200/app/challenge/invite/' : '') + this.challenge.invite;
  }

  onCopyInvite() {
    navigator.clipboard.writeText(this.invite).then(r => this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', ``));
  }

  onInviteJoinType(joinType: JoinType) {
    this.inviteJoinType = joinType;
  }

  onSearch(search: string) {
    if (search.length > 0) {
      this.friends.sort((x, y) => x.username.startsWith(search) ? -1 : y.username.startsWith(search) ? 1 : 0);
      return;
    }
    this.defaultSorting(this.friends);
  }

  private defaultSorting(friends: Profile[]): Profile[] {
    return friends.sort((x, y) => x.username < y.username ? -1 : x.username > y.username ? 1 : 0);
  }

  onSendInvite(profile: Profile) {
    if (!this.invites.has(profile)) this.invites.set(profile, JoinType.MEMBER);
  }

  onCancelInvite(profile: Profile) {
    this.invites.delete(profile);
  }

  onProfileJoinType(profile: Profile, access: JoinType) {
    this.invites.set(profile, access);
  }

  onCancel() {
    this.closeEvent.emit();
  }

  onSend() {
    // TODO: Request to send invitations
    this.closeEvent.emit();
  }

  isInviteSent(profile: Profile): boolean {
    return this.invites.has(profile);
  }

  isChallengeOwner(): boolean {
    return this.challenge.author?.id === this.authService.user.id;
  }

  getJoinTypes(): JoinType[] {
    return Object.values(JoinType);
  }

  @HostListener('document:keyup.escape')
  onClose() {
    this.closeEvent.emit();
  }
}

enum JoinType {
  MEMBER = 'Member', SPECTATOR = 'Spectator'
}
