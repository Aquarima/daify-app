import { TestBed } from '@angular/core/testing';

import { GroupRankingService } from './group-ranking.service';

describe('GroupRankingService', () => {
  let service: GroupRankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupRankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
