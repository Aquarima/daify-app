import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseResultsListComponent } from './browse-results-list.component';

describe('BrowseResultsListComponent', () => {
  let component: BrowseResultsListComponent;
  let fixture: ComponentFixture<BrowseResultsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseResultsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
