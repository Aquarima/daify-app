import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AccessType} from "../../../../core";
import {DomSanitizer} from "@angular/platform-browser";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-challenge-create',
  templateUrl: './challenge-create.component.html',
  styleUrls: ['./challenge-create.component.scss',  "/../../../../../styles.scss",]
})
export class ChallengeCreateComponent implements OnInit {

  @ViewChildren("text_input") textInputs!: QueryList<ElementRef>;

  challengeForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    tag: new FormControl(''),
    access: new FormControl<AccessType>(AccessType.FREE),
    start: new FormControl<Date>(this.getDefaultStart()),
    end: new FormControl<Date>(this.getDefaultEnd()),
    limit: new FormControl<number>(2),
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
    if (!tag) return;
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
