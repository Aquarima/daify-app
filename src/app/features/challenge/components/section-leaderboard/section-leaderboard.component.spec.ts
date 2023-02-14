import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionLeaderboardComponent } from './section-leaderboard.component';

describe('SectionLeaderboardComponent', () => {
  let component: SectionLeaderboardComponent;
  let fixture: ComponentFixture<SectionLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionLeaderboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
