import { TestBed } from '@angular/core/testing';

import { AlertHandlingService } from './alert-handling.service';

describe('ErrorHandlingService', () => {
  let service: AlertHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
