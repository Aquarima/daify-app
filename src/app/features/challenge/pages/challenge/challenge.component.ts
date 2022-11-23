import {Component, OnInit} from '@angular/core';
import {Challenge, ChallengeService} from "../../../../core";
import {ActivatedRoute} from "@angular/router";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {AlertType} from "../../../../core/models/system-alert";

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  challenge: Challenge = {} as Challenge;
  section: number = 0;

  constructor(private route: ActivatedRoute, private alertHandlingService: AlertHandlingService, private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.challengeService.getChallengesById(params['id']).subscribe({
        next: data => this.challenge = data,
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch challenge'),
      })
    })
  }

  onOverview() {
    this.section = 0;
  }

  onChats() {
    this.section = 1;
  }

  onGroups() {
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
