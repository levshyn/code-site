import { TestBed, inject } from '@angular/core/testing';

import { MenuNavService } from './menu-nav.service';

describe('MenuNavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuNavService]
    });
  });

  it('should ...', inject([MenuNavService], (service: MenuNavService) => {
    expect(service).toBeTruthy();
  }));
});
