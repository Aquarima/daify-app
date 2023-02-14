import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/models/user/profile.model';

@Component({
  selector: 'dfy-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() profile!: Profile;

  constructor() { }

  ngOnInit(): void { }

  hasSocial(name: string): boolean {
    return this.profile?.socials[name] !== undefined;
  }

  getSocial(name: string): string {
    return this.profile?.socials[name] || '';
  }

  get banner(): string {
    return this.profile?.bannerUrl || '/assets/user_banner_placeholder.svg';
  }

  get avatar(): string {
    return this.profile?.avatarUrl || '/assets/avatar_placeholder.svg';
  }
}
