import { TestBed } from '@angular/core/testing';

import { ContentREAService } from './content-rea.service';

describe('ContentREAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentREAService = TestBed.get(ContentREAService);
    expect(service).toBeTruthy();
  });
});