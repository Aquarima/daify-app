import { TestBed } from '@angular/core/testing';

import { RatingCriteriaService } from './rating-criteria.service';

describe('RatingCriteriaService', () => {
  let service: RatingCriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingCriteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
