import { TestBed } from '@angular/core/testing';

import { AuthenticateService } from './authenticate.service';

describe('AuthenticateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticateService = TestBed.get(AuthenticateService);
    expect(service).toBeTruthy();
  });
});
