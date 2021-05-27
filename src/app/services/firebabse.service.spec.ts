import { TestBed } from '@angular/core/testing';

import { FirebbaseService } from './firebabse.service';

describe('FirebabseService', () => {
  let service: FirebbaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebbaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
