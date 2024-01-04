import { TestBed } from '@angular/core/testing';

import { MockDepensesService } from './mock-depenses.service';

describe('MockDepensesService', () => {
  let service: MockDepensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockDepensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
