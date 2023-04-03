import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Group, Member} from "../../../../core";
import {groupForm} from "../../../../core/helpers";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit, AfterViewInit {

  @Input() selfMember!: Member;

  @Output() closeEvent: EventEmitter<void> = new EventEmitter();
  @Output() groupCreateEvent: EventEmitter<Group> = new EventEmitter();

  groupForm = groupForm;
  errorMessage: string | undefined;
  groups: Group[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(this.document.body, 'no-scroll');
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'no-scroll');
  }

  isNameAlreadyInUse(): boolean {
    if (!this.groupForm.value) return true;
    return !!this.groups.find(g => g.name.toLowerCase() === this.groupForm.value.name);
  }

  onJoinTypeSelected() {
    this.groupForm.controls['join_type_option_free'].setValue(!this.groupForm.value.join_type_option_free);
    this.groupForm.controls['join_type_option_ask'].setValue(!this.groupForm.value.join_type_option_ask);
  }

  onNameEdited() {
    if (this.isNameAlreadyInUse() && this.groupForm.value.name) {
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
      leader: this.selfMember,
      name: this.groupForm.value.name || '',
      createdAt: new Date()
    });
  }
}
