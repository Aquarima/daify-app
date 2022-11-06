import {Component, ElementRef, OnInit, QueryList, ViewChildren, ViewContainerRef} from '@angular/core';
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

  @ViewChildren("text_input") textInputs!: QueryList<ElementRef>;

  challengeForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(24), Validators.pattern('^[a-zA-Z0-9 \'\]*$')]),
    description: new FormControl<string>('', [Validators.maxLength(128), Validators.pattern('^(.|\\s)*[a-zA-Z]+(.|\\s)*$')]),
    tag: new FormControl<string>(''),
    accessType: new FormControl<AccessType>(AccessType.FREE, [Validators.required]),
    startAt: new FormControl(null, [Validators.required]),
    endAt: new FormControl(undefined, [Validators.required]),
    limit: new FormControl<number>(2, [Validators.required, Validators.min(2), Validators.max(60), Validators.pattern('^0*?[1-9]\\d*$')]),
    spectatorsAllowed: new FormControl<boolean>(false)
  })

  selectedCoverFile: File | undefined;
  selectedIconFile: File | undefined;
  tags: string[] = [];

  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private sanitizer: DomSanitizer,
    private challengeService: ChallengeService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
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

  onPreviewCoverSelected(event: any) {
    this.selectedCoverFile = event.target.files[0];
  }

  onPreviewIconSelected(event: any) {
    this.selectedIconFile = event.target.files[0];
  }

  onTagAdd() {
    if (this.tags.length > 3) return;
    const tag = this.challengeForm.value.tag;
    if (!tag || this.tags.length > 3 || this.tags.includes(tag)) return;
    this.tags.push(tag);
  }

  onTagRemove(tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }

  getTagColor(tag: string): string {
    return this.challengeService.getColorByTag(tag);
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

  onSubmit() {
    const form = this.challengeForm.value;
    const challenge = {} as Challenge;
    const config = {} as ChallengeConfig;
    challenge.author = this.authService.user.profile;
    challenge.title = `${form.title}`;
    challenge.description = `${form.title}`;
    challenge.tags = this.tags;
    challenge.config = config;
    config.accessType = form.accessType || AccessType.FREE;
    config.startAt = form.startAt || this.defaultStart;
    config.startAt = form.endAt || this.defaultEnd;
    config.spectatorsAllowed = form.spectatorsAllowed || false;
    this.showInviteFriendsPopup(challenge);
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

  get accessTypes(): AccessType[] {
    return Object.values(AccessType);
  }
}
