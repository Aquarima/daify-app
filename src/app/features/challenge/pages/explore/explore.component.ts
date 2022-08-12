import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { OverviewComponent } from '../../components/overview/overview.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor(public viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void { }

  onItemSelected() {
    const componentRef = this.viewContainerRef.createComponent(OverviewComponent);
    componentRef.instance.closeEvent.subscribe(() => {
      this.viewContainerRef.clear();
    });
  }
}
