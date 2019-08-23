import { TestBed, async, inject } from '@angular/core/testing';

import { IntroGuard } from './intro.guard';

describe('IntroGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntroGuard]
    });
  });

  it('should ...', inject([IntroGuard], (guard: IntroGuard) => {
    expect(guard).toBeTruthy();
  }));
});
