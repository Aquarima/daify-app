import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";
import {Group} from "../../../../core/models/challenge/group.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit, AfterViewInit {

  @Output() closeEvent: EventEmitter<void> = new EventEmitter();
  @Output() groupCreateEvent: EventEmitter<Group> = new EventEmitter();

  groupForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    join_type_option_free: new FormControl<boolean>(true),
    join_type_option_ask: new FormControl<boolean>(false)
  })

  errorMessage: string | undefined;
  groups: Group[] = [];
  selectedIconFile: File | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'no-scroll');
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(this.document.body, 'no-scroll');
  }

  isNameAlreadyInUse(): boolean {
    return !!this.groups.find(g => g.name.toLowerCase() === this.groupForm.value.name.toLowerCase());
  }

  onGroupIconSelected(event: any) {
    this.selectedIconFile = event.target.files[0];
  }

  onJoinTypeSelected() {
    this.groupForm.controls['join_type_option_free'].setValue(!this.groupForm.value.join_type_option_free);
    this.groupForm.controls['join_type_option_ask'].setValue(!this.groupForm.value.join_type_option_ask);
  }

  onNameEdited() {
    if (this.isNameAlreadyInUse()) {
      this.errorMessage = `Name '${this.groupForm.value.name.toLowerCase()}' is already used by another group`;
      return;
    }
    this.errorMessage = undefined;
  }

  @HostListener('document:keyup.escape')
  onCancel() {
    this.closeEvent.emit();
  }

  onCreate() {
    if (this.isNameAlreadyInUse()) return;
    this.groupCreateEvent.emit({
      id: 0,
      name: this.groupForm.value.name,
      createdAt: new Date()
    })
  }

  get groupIcon() {
    if (!this.selectedIconFile) return;
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedIconFile));
  }
}
