import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AccessType} from "../../../../core";
import {DomSanitizer} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-challenge-create',
  templateUrl: './challenge-create.component.html',
  styleUrls: ['./challenge-create.component.scss',  "/../../../../../styles.scss",]
})
export class ChallengeCreateComponent implements OnInit {

  @ViewChildren("text_input") textInputs!: QueryList<ElementRef>;

  challengeForm = new FormGroup({
    title: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24),
        Validators.pattern('^[a-zA-Z0-9 \'\]*$')
      ]),
    description: new FormControl('',
      [
        Validators.maxLength(128),
        Validators.pattern('^(.|\\s)*[a-zA-Z]+(.|\\s)*$')
      ]),
    tag: new FormControl(''),
    access: new FormControl<AccessType>(AccessType.FREE),
    start: new FormControl(null,
      [
      Validators.required
    ]),
    end: new FormControl(null,
      [
      Validators.required
    ]),
    limit: new FormControl<number>(2,
      [
        Validators.required,
        Validators.min(2),
        Validators.max(60),
        Validators.pattern('^0*?[1-9]\\d*$')
    ]),
    spectators: new FormControl<boolean>(false)
  })

  selectedCoverFile: File | undefined;
  selectedIconFile: File | undefined;

  tags: string[] = [];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initTextInputsListeners();
  }

  private initTextInputsListeners() {
    this.textInputs.forEach(input => {
      const inputElement = input.nativeElement;
      const parentNode = inputElement.parentNode;
      inputElement.addEventListener('focus', () => { parentNode.classList.add('user-input-active') });
      inputElement.addEventListener('focus', () => { parentNode.classList.add('user-input-active') });
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
    const tag = this.challengeForm.value.tag;
    if (!tag || this.tags.length > 3 || this.tags.includes(tag)) return;
    this.tags.push(tag);
  }

  onSubmit() {

  }

  getDefaultStart() {
    const date = new Date();
    date.setSeconds(0, 0);
    return date;
  }

  getDefaultEnd() {
    return new Date(this.getDefaultStart().getTime() + 24*60*60*1000);
  }

  getSelectedPreviewCover() {
    if (!this.selectedCoverFile) return;
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedCoverFile));
  }

  getSelectedPreviewIcon() {
    if (!this.selectedIconFile) return;
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedIconFile));
  }

  getAccessTypes() {
    return Object.keys(AccessType).filter((item) => {
      return isNaN(Number(item));
    });
  }
}
