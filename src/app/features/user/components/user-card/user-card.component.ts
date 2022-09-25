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

  getBanner(): string | undefined {
    const banner = this.profile?.bannerUrl;
    return banner === null ? '/assets/challenge_cover_placeholder.svg' : banner;
  }
}
