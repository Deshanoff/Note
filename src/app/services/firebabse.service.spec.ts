import { TestBed } from '@angular/core/testing';

import { FirebabseService } from './firebabse.service';

describe('FirebabseService', () => {
  let service: FirebabseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebabseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
