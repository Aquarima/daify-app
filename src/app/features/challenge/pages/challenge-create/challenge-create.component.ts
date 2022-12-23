import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AccessType, AuthService, Challenge, ChallengeConfig, ChallengeService} from "../../../../core";
import {DomSanitizer} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InviteFriendsComponent} from "../../components";
import {Router} from "@angular/router";

@Component({
  selector: 'app-challenge-create',
  templateUrl: './challenge-create.component.html',
  styleUrls: ['./challenge-create.component.scss', "/../../../../../styles.scss",]
})
export class ChallengeCreateComponent implements OnInit {

  challengeForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(24), Validators.pattern('^[a-zA-Z0-9 \'\]*$')]),
    description: new FormControl<string>('', [Validators.maxLength(128), Validators.pattern('^(.|\\s)*[a-zA-Z]+(.|\\s)*$')]),
    theme: new FormControl<string>('', [Validators.minLength(3), Validators.max(24)]),
    accessType: new FormControl<AccessType>(AccessType.FREE, [Validators.required]),
    startAt: new FormControl(null, [Validators.required]),
    endAt: new FormControl(undefined, [Validators.required]),
    capacity: new FormControl<number>(2, [Validators.required, Validators.min(2), Validators.max(60), Validators.pattern('^0*?[1-9]\\d*$')]),
    groupSize: new FormControl<number>(1, [Validators.required, Validators.min(2), Validators.max(8), Validators.pattern('^0*?[1-9]\\d*$')]),
    spectatorsAllowed: new FormControl<boolean>(false)
  })

  selectedCoverFile: File | undefined;
  selectedIconFile: File | undefined;

  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private sanitizer: DomSanitizer,
    private challengeService: ChallengeService,
    private authService: AuthService) {
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
    //if (this.challengeForm.invalid) return;
    const challenge = this.buildChallenge();
    this.challengeService.createChallenge(challenge).subscribe();
    this.showInviteFriendsPopup(challenge);
  }

  private showInviteFriendsPopup(challenge: Challenge) {
    const componentRef = this.viewContainerRef.createComponent(InviteFriendsComponent);
    componentRef.instance.closeEvent.subscribe(() => {
      componentRef.destroy();
      this.router.navigate([`/app/challenge/dashboard/`], {
        queryParams: {
          id: challenge.id
        },
      })
    });
    componentRef.instance.challenge = challenge;
    componentRef.changeDetectorRef.detectChanges();
  }

  private buildChallenge() {
    const form = this.challengeForm.value;
    const challenge = {} as Challenge;
    const config = {} as ChallengeConfig;
    challenge.author = this.authService.user.profile;
    challenge.title = `${form.title}`;
    challenge.description = `${form.title}`;
    challenge.theme = `${form.theme}`;
    challenge.config = config;
    config.accessType = form.accessType || AccessType.FREE;
    config.startAt = form.startAt || this.defaultStart;
    config.startAt = form.endAt || this.defaultEnd;
    config.spectatorsAllowed = form.spectatorsAllowed || false;
    return challenge;
  }

  private toAccessType(value: string): string {
    return value.replace(' ', '_').toUpperCase();
  }

  get defaultStart() {
    const date = new Date();
    date.setSeconds(0, 0);
    return date;
  }

  get defaultEnd() {
    return new Date(this.defaultStart.getTime() + 24 * 60 * 60 * 1000);
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
