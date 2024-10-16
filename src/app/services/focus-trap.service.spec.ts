import { TestBed } from '@angular/core/testing';

import { FocusTrapService } from './focus-trap.service';

describe('FocusTrapService', () => {
  let service: FocusTrapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FocusTrapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
