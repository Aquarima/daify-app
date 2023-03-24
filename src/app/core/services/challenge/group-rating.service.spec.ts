import { TestBed } from '@angular/core/testing';

import { GroupRatingService } from './group-rating.service';

describe('GroupRatingService', () => {
  let service: GroupRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
