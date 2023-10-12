import { TestBed } from '@angular/core/testing';

import { ClasesService } from './clases.service';

describe('ClasesService', () => {
  let service: ClasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
