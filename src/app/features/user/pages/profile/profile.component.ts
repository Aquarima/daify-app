import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, Challenge, ChallengeService, User } from 'src/app/core';

@Component({
  selector: 'dfy-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  challenges: Challenge[] = [];
  section: number = 0;

  constructor(private authService: AuthService, 
    private challengeService: ChallengeService, 
    private route: ActivatedRoute)
  { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const profileId = params['id'];
      if (profileId) {
        this.challengeService.getChallengesByAuthor(profileId).subscribe(data => {
          this.challenges = data.content;
        });
      }
    })
  }
}
