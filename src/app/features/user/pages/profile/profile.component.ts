import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, Challenge, ChallengeService, Profile } from 'src/app/core';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'dfy-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loading: boolean = false;

  profile: Profile | undefined;
  challenges: Challenge[] = [];
  section: number = 0;

  constructor(private authService: AuthService, 
    private profileService: ProfileService,
    private challengeService: ChallengeService, 
    private route: ActivatedRoute,
    private router: Router)
  { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.challengeService.getChallengesByUser(params['id']).subscribe(data => {
        this.profileService.getProfileById(params['id'])
          .subscribe(profile => {
            if (profile) this.router.navigate(['/']);
            this.profile = profile;
          });
        this.challenges = data.content;
      });
    })
  }
}
