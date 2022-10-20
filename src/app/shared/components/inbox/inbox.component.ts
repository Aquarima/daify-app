import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

    @Output() closeEvent: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    onMarkAllAsRead() {

    }

    onFollowed() {

    }

    onAll() {

    }

    @HostListener('document:keyup.escape')
    onClose() {
        this.closeEvent.emit();
    }
}
