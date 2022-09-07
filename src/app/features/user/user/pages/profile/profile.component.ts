import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge, ChallengeService } from 'src/app/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  challenges$: Observable<Challenge[]> | undefined;

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.challenges$ = this.challengeService.getChallengesByAuthor(1);
  }
}
