import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AccessType, AlertHandlingService, AuthService, Challenge, ChallengeService,} from "../../../../core";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {AlertType} from "../../../../core/models/system-alert";
import {challengeForm} from "../../../../core/helpers";

@Component({
  selector: 'app-challenge-create',
  templateUrl: './challenge-create.component.html',
  styleUrls: ['./challenge-create.component.scss', "/../../../../../styles.scss",]
})
export class ChallengeCreateComponent implements OnInit {

  challengeForm = challengeForm;
  selectedCoverFile: File | undefined;
  selectedIconFile: File | undefined;

  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private challengeService: ChallengeService,
    private alertHandlingService: AlertHandlingService) {
  }

  ngOnInit(): void {
  }

  onPreviewCoverSelected(event: any) {
    this.selectedCoverFile = event.target.files[0];
  }

  onPreviewIconSelected(event: any) {
    this.selectedIconFile = event.target.files[0];
  }

  onSubmit() {
    const challenge: Challenge = this.buildChallenge();
    this.challengeService.createChallenge(challenge)
      .subscribe({
        next: (challenge: Challenge) => {
          if (this.selectedIconFile) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(this.selectedIconFile);
            reader.onload = () => {
              if (reader.result && this.selectedIconFile) {
                this.challengeService.uploadChallengeIcon(new Blob([reader.result], {type: this.selectedIconFile.type}), challenge)
                  .subscribe({
                    next: (data: any) => challenge.cover = `${data.url}`,
                    error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.status, err.error.error)
                  });
              }
            }
          }
          if (this.selectedCoverFile) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(this.selectedCoverFile);
            reader.onload = () => {
              if (reader.result && this.selectedCoverFile) {
                this.challengeService.uploadChallengeCover(new Blob([reader.result], {type: this.selectedCoverFile.type}), challenge)
                  .subscribe({
                    next: (data: any) => challenge.cover = `${data.url}`,
                    error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.status, err.error.error)
                  });
              }
            }
          }
          this.router.navigate([`/app/challenge/${challenge.id}/overview`]);
        },
        error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.status, err.error.error)
      });
  }

  private buildChallenge(): Challenge {
    const values = challengeForm.value;
    return {
      title: values.title!,
      description: values.description,
      theme: values.theme!,
      config: {
        accessType: values.accessType!,
        startsAt: values.startsAt!,
        endsAt: values.endsAt!,
        capacity: values.capacity!,
        groupSize: values.groupSize!,
        depositsMin: values.depositsMin!,
        depositsMax: values.depositsMax!,
        leaderboardBeforeStart: false,
        spectatorsAllowed: false,
        votesStartsTime: values.votesStartsTime!,
        votesEndsTime: values.votesEndsTime!
      }
    } as Challenge;
  }

  getPreviewCover() {
    if (!this.selectedCoverFile) return;
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedCoverFile));
  }

  getPreviewIcon() {
    if (!this.selectedIconFile) return;
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedIconFile));
  }

  getAccessTypes(): { key: string, value: AccessType }[] {
    return [
      {key: 'Free', value: AccessType.FREE},
      {key: 'On Request', value: AccessType.ON_REQUEST},
      {key: 'Friends Only', value: AccessType.FRIENDS_ONLY},
      {key: 'Code', value: AccessType.CODE},
    ]
  }
}
