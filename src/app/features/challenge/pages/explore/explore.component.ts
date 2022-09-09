import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge, Search } from 'src/app/core/models/challenge';
import { ChallengeService } from 'src/app/core/services/challenge.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  challenges$: Observable<Challenge[]> | undefined;
  groupBy: string = 'alphabetical';
  displayMode: string = 'grid';

  constructor(public viewContainerRef: ViewContainerRef, private challengeService: ChallengeService) { }

  ngOnInit(): void { }

  onItemSelected() {
    /*const componentRef = this.viewContainerRef.createComponent(OverviewComponent);
    componentRef.instance.closeEvent.subscribe(() => {
      this.viewContainerRef.clear();
    });*/
  }

  onSearch(search: Search) {
    if (!search.name) {
      this.challenges$ = this.challengeService.getChallenges();
      return;
    }
    this.challenges$ = this.challengeService.getChallengesByName(search.name);
  }

  onGroupBySelected(option: any) {
    this.groupBy = option;
  }

  onDisplayModeSelected(mode: any) {
    this.displayMode = mode;
  }
}
