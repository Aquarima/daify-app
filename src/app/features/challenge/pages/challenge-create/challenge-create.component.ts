import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {
  AccessType,
  AlertHandlingService,
  AuthService,
  Challenge,
  ChallengeConfig,
  ChallengeService,
} from "../../../../core";
import {DomSanitizer} from "@angular/platform-browser";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertType} from "../../../../core/models/system-alert";

@Component({
  selector: 'app-challenge-create',
  templateUrl: './challenge-create.component.html',
  styleUrls: ['./challenge-create.component.scss', "/../../../../../styles.scss",]
})
export class ChallengeCreateComponent implements OnInit {

  challengeInfoForm = new FormGroup({
    title: new FormControl<string | undefined>(''),
    description: new FormControl<string | undefined>(''),
    theme: new FormControl<string | undefined>(undefined),
  })

  challengeConfigForm = new FormGroup({
    accessType: new FormControl<AccessType>(AccessType.FREE),
    startsAt: new FormControl<Date>(new Date(new Date().toISOString().substring(0, new Date().toISOString().length - 1))),
    endsAt: new FormControl<Date>(new Date()),
    capacity: new FormControl<number>(2),
    groupSize: new FormControl<number>(1),
    minDeposits: new FormControl<number>(0),
    maxDeposits: new FormControl<number>(0),
    spectatorsAllowed: new FormControl<boolean>(true),
    votesStartsTime: new FormControl<Date>(new Date()),
    votesEndsTime: new FormControl<Date>(new Date()),
  })

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
    const challenge: Challenge = this.challengeInfoForm.value as Challenge;
    challenge.author = this.authService.user.profile;
    challenge.config = this.challengeConfigForm.value as ChallengeConfig;
    this.challengeService.createChallenge(challenge)
      .subscribe({
        next: (challenge: Challenge) => {
          if (this.selectedIconFile) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(this.selectedIconFile);
            reader.onload = () => {
              if (reader.result && this.selectedIconFile) {
                const blob: Blob = new Blob([reader.result], {type: this.selectedIconFile.type});
                this.challengeService.uploadChallengeIcon(blob, challenge)
                  .subscribe({
                    next: (iconId) => challenge.icon = `${iconId}`,
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
                const blob: Blob = new Blob([reader.result], {type: this.selectedCoverFile.type});
                this.challengeService.uploadChallengeCover(blob, challenge)
                  .subscribe({
                    next: (coverId) => challenge.cover = `${coverId}`,
                    error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.status, err.error.error)
                  });
              }
            }
          }
          this.router.navigate([`/app/challenge/${challenge.id}/overview`]);
        },
        error: () => alert('Error')
      });
  }

  get defaultStart() {
    const date = new Date();
    date.setSeconds(0, 0);
    return date;
  }

  get defaultEnd() {
    return new Date(this.defaultStart.getTime() + 24 * 60 * 60 * 1000);
  }

  get accessTypes(): { key: string, value: AccessType }[] {
    return [
      {key: 'Free', value: AccessType.FREE},
      {key: 'On Request', value: AccessType.ON_REQUEST},
      {key: 'Friends Only', value: AccessType.FRIENDS_ONLY},
      {key: 'Code', value: AccessType.CODE},
    ]
  }

  get previewCover() {
    if (!this.selectedCoverFile) return;
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedCoverFile));
  }

  get previewIcon() {
    if (!this.selectedIconFile) return;
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedIconFile));
  }
}
