import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const ntfsNode = document.querySelector('app-notifications');
    if (!ntfsNode) return;
    ntfsNode.addEventListener('click', (event) => {
      if (!(<HTMLElement> event.target).classList.contains('notifications-overlay-visible')) return;
      this.hideOverlay();
    });
  }

  hideOverlay() {
    const ntfsNode = document.querySelector('app-notifications');
    if (!ntfsNode) return;
    ntfsNode.classList.remove('notifications-overlay-visible');
  }
}
