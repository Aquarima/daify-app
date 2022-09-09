import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge, ChallengeService } from 'src/app/core';

@Component({
  selector: 'dfy-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  challenges$: Observable<Challenge[]> | undefined;
  section: number = 0;

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.challenges$ = this.challengeService.getChallengesByAuthor(1);
  }
}
