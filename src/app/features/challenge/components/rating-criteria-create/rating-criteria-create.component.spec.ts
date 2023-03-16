import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingCriteriaCreateComponent } from './rating-criteria-create.component';

describe('RatingCriteriaCreateComponent', () => {
  let component: RatingCriteriaCreateComponent;
  let fixture: ComponentFixture<RatingCriteriaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingCriteriaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingCriteriaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
