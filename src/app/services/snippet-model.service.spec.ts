import { TestBed, inject } from '@angular/core/testing';

import { SnippetModelService } from './snippet-model.service';

describe('SnippetModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnippetModelService]
    });
  });

  it('should ...', inject([SnippetModelService], (service: SnippetModelService) => {
    expect(service).toBeTruthy();
  }));
});
