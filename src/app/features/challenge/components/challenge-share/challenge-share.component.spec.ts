import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeShareComponent } from './challenge-share.component';

describe('ChallengeShareComponent', () => {
  let component: ChallengeShareComponent;
  let fixture: ComponentFixture<ChallengeShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
