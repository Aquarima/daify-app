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

  constructor(private route: ActivatedRoute, private alertHandlingService: AlertHandlingService, private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.challengeService.getChallengesById(params['id']).subscribe({
        next: data => this.challenge = data,
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch challenge'),
      })
    })
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
