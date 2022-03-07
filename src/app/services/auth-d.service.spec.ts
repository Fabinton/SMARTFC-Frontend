import { TestBed } from '@angular/core/testing';

import { AuthDService } from './auth-d.service';

describe('AuthDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthDService = TestBed.get(AuthDService);
    expect(service).toBeTruthy();
  });
});
