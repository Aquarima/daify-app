import { TestBed } from '@angular/core/testing';

import { BanishmentService } from './banishment.service';

describe('BanishmentService', () => {
  let service: BanishmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanishmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
