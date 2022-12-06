import {AfterViewInit, Component, EventEmitter, HostListener, Inject, OnInit, Output, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'app-create-group',
    templateUrl: './create-group.component.html',
    styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit, AfterViewInit {

    @Output() closeEvent: EventEmitter<void> = new EventEmitter();

    constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) { }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.renderer.removeClass(this.document.body, 'no-scroll');
    }

    ngAfterViewInit(): void {
        this.renderer.addClass(this.document.body, 'no-scroll');
    }

    @HostListener('document:keyup.escape')
    onClose() {
        this.closeEvent.emit();
    }
}
