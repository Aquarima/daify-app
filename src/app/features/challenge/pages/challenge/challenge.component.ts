import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Challenge, ChallengeService} from "../../../../core";
import {ActivatedRoute} from "@angular/router";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {AlertType} from "../../../../core/models/system-alert";
import {GroupService} from "../../../../core/services/group.service";
import {Group} from "../../../../core/models/challenge/group.model";

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit, AfterViewInit {

  @ViewChildren('text_input') textInputs!: QueryList<ElementRef>;
  @ViewChild('messages') messages!: ElementRef;

  challenge: Challenge = {} as Challenge;
  groups: Group[] = [];
  section: number = 0;

  constructor(private route: ActivatedRoute, private alertHandlingService: AlertHandlingService, private challengeService: ChallengeService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.challengeService.getChallengesById(params['id']).subscribe({
        next: data => this.challenge = data,
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch challenge'),
      })
    })
  }

  ngAfterViewInit(): void {
    this.messages.nativeElement.scrollIntoView();
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

  onOverview() {
    this.section = 0;
  }

  onChats() {
    this.section = 1;
  }

  onGroups() {
    this.groupService.getGroupsByChallenge(this.challenge.id).subscribe({
      next: (data: any) => this.groups = data.content,
    })
    this.section = 2;
  }

  onLeaderboard() {
    this.section = 3;
  }

  onSettings() {
    this.section = 4;
  }

  hasAccess(access: any) {
    return this.challenge.config.accessType === access;
  }

  isOnSection(section: number) {
    return this.section === section;
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
