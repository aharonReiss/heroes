import { TestBed } from '@angular/core/testing';

import { CanTrainGuard } from './can-train.guard';

describe('CanTrainGuard', () => {
  let guard: CanTrainGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanTrainGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
